"""Validate canonical contracts with a closed, local schema catalog."""

import json
from pathlib import Path
from urllib.parse import urldefrag, unquote, urljoin
import re

from jsonschema import Draft7Validator, FormatChecker
from referencing import Registry, Resource
from referencing.exceptions import NoSuchResource

VERSION = "1.0.0"


def _reject_retrieval(uri):
    raise NoSuchResource(ref=uri)


def _check_refs(node, base, catalog, root=False):
    if isinstance(node, dict):
        if ("$id" in node or "$schema" in node) and not root:
            raise ValueError("Nested schema IDs are not supported")
        if "$ref" in node:
            ref = node["$ref"]
            if not isinstance(ref, str) or ref.count("#") > 1:
                raise ValueError("Invalid schema reference")
            target_uri, fragment = urldefrag(ref)
            uri = urljoin(base, target_uri)
            if re.search(r"%(?![0-9a-fA-F]{2})", fragment):
                raise ValueError("Invalid schema reference")
            fragment = unquote(fragment, errors="strict")
            if uri not in catalog:
                raise ValueError("Unknown schema reference")
            target = catalog[uri]
            if fragment and not fragment.startswith("/"):
                raise ValueError("Unsupported schema fragment")
            for part in fragment.split("/")[1:]:
                if re.search(r"~(?![01])", part):
                    raise ValueError("Invalid JSON pointer")
                part = part.replace("~1", "/").replace("~0", "~")
                try:
                    if isinstance(target, list):
                        if not re.fullmatch(r"0|[1-9][0-9]*", part):
                            raise ValueError("Invalid array index")
                        target = target[int(part)]
                    else:
                        target = target[part]
                except (KeyError, IndexError, ValueError, TypeError):
                    raise ValueError("Unknown schema fragment") from None
        for value in node.values():
            _check_refs(value, base, catalog)
    elif isinstance(node, list):
        for value in node:
            _check_refs(value, base, catalog)


class ContractValidator:
    def __init__(self, schema_dir):
        schema_dir = Path(schema_dir)
        self.version = VERSION
        self.schemas = {}
        for file in sorted(schema_dir.glob("*.schema.json")):
            if not re.fullmatch(r"[a-z][a-z0-9-]*\.schema\.json", file.name):
                raise ValueError("Invalid catalogue filename")
            self.schemas[file.name[:-12]] = json.loads(file.read_text(encoding="utf-8"))
        catalog = {}
        for name, schema in self.schemas.items():
            expected = f"https://notification.local/contracts/{self.version}/{name}.schema.json"
            if schema.get("$id") != expected or schema.get("$schema") != "http://json-schema.org/draft-07/schema#":
                raise ValueError("Unexpected schema ID")
            Draft7Validator.check_schema(schema)
            catalog[expected] = schema
        for uri, schema in catalog.items():
            _check_refs(schema, uri, catalog, root=True)
        self.registry = Registry(retrieve=_reject_retrieval).with_resources(
            (uri, Resource.from_contents(schema)) for uri, schema in catalog.items()
        )

    def errors(self, name, value):
        if name not in self.schemas:
            raise ValueError("Unknown schema")
        validator = Draft7Validator(self.schemas[name], registry=self.registry, format_checker=FormatChecker())
        return [{"schema": name, "path": list(error.absolute_path), "code": error.validator} for error in validator.iter_errors(value)]

    def validate(self, name, value):
        return not self.errors(name, value)
