import importlib.util
import json
import re
from pathlib import Path
import shutil
import tempfile
import types
import unittest
from typing import get_origin, Union

from agent_worker.contracts import ContractValidator

ROOT = Path(__file__).resolve().parents[2]
SCHEMAS = ROOT / "packages/contracts"

class ContractsTest(unittest.TestCase):
    def test_shared_fixtures(self):
        validator = ContractValidator(SCHEMAS)
        fixtures = json.loads((SCHEMAS / "fixtures/manifest.json").read_text(encoding="utf-8"))
        for case in fixtures:
            with self.subTest(case=case["name"]):
                self.assertEqual(validator.validate(case["schema"], case["value"]), case["valid"])
                self.assertTrue(all(set(e) == {"schema", "path", "code"} for e in validator.errors(case["schema"], case["value"])))
        print(f"Validated {len(fixtures)} shared fixtures")
        with self.assertRaises(ValueError):
            validator.validate("unknown", {})

    def test_unknown_reference_fails_closed(self):
        with tempfile.TemporaryDirectory() as directory:
            for source in SCHEMAS.glob("*.schema.json"):
                shutil.copy(source, directory)
            target = Path(directory) / "api.schema.json"
            schema = json.loads(target.read_text(encoding="utf-8"))
            schema["$ref"] = "./api.schema.json#/definitions/LegacyHealthResponse"
            target.write_text(json.dumps(schema), encoding="utf-8")
            ContractValidator(directory)
            schema["$ref"] = "https://example.invalid/remote.schema.json"
            target.write_text(json.dumps(schema), encoding="utf-8")
            with self.assertRaises(ValueError):
                ContractValidator(directory)

    def test_generated_python_imports(self):
        validator = ContractValidator(SCHEMAS)
        for name, schema in validator.schemas.items():
            filename = name.replace('-', '_')
            spec = importlib.util.spec_from_file_location(name, ROOT / f"packages/shared-types/generated/python/{filename}.py")
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            title = schema.get("title", "")
            root_name = title if re.fullmatch(r"[A-Z][A-Za-z0-9]*", title) and not re.search(r"[0-9][a-z]", title) else "Contract" + name.encode("utf-8").hex().upper()
            self.assertTrue(hasattr(module, root_name))
            if name in {"api", "tool"}:
                root = getattr(module, root_name)
                self.assertIn(get_origin(getattr(root, "__value__", root)), (Union, types.UnionType))
            for definition in schema.get("definitions", {}):
                self.assertTrue(hasattr(module, definition), definition)
            if any(item.get("type") == "object" for item in [schema, *schema.get("definitions", {}).values()]):
                self.assertTrue(any(isinstance(item, type) and getattr(item, "__module__", None) == name and isinstance(getattr(item, "__annotations__", None), dict) for item in vars(module).values()))

if __name__ == "__main__":
    unittest.main()
