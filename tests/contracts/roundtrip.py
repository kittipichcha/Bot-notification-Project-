import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(ROOT / "packages/shared-types/generated/python"))
from api import RequestPage, ApiContract
from response import FinalResponse
from tool import ToolContract
from policy import PolicyContract
from agent_worker.contracts import ContractValidator

response: FinalResponse = {"text": "สวัสดี 🌍", "status": "SUCCESS", "extra_response": [{"kind": "ERROR_NOTICE", "payload": {"error_code": "TIMEOUT", "text": "ค่า", "retryable": True}}], "source_refs": ["source-1"], "stale": False}
tool: ToolContract = {"status": "success", "data_ref": "opaque", "source": "discord", "timestamp": "2026-11-27T12:34:56Z", "error_code": None, "retryable": False}
policy: PolicyContract = {"schema_version": "1.0.0", "release": "P0", "tool": {"default_access": "DENY"}, "trigger": {"personal_watches_by_default": False, "ignore_own_messages": True, "schedule_enabled": False, "deduplicate_events": True}, "model": {"allowed_models": []}, "agent": {"default_mode": "SIMPLE", "enabled_modes": ["SIMPLE"], "role_definitions": {}, "max_model_calls": 4}, "request": {"execution_enabled": False, "retry_policy": {"model_retries": 1, "tool_retries": 0}}, "approval": {"enabled": False, "mutation_policy": "EXACT_ACTION"}, "bot_connection": {"enabled_modes": ["SAME_BOT"]}, "response": {"supported_components": ["TEXT"]}}
api: RequestPage = {"items": [{"request_id": "00000000-0000-4000-8000-000000000001", "status": "QUEUED", "queue_position": None, "execution_mode": "normal", "created_at": "2026-11-27T12:34:56Z", "error_code": None, "can_control": True}], "next_cursor": None}
api_root: ApiContract = api
validator = ContractValidator(ROOT / "packages/contracts")
request = json.load(sys.stdin)
if request["action"] == "inventory":
    result = {"version": validator.version, "schemas": {name: schema["$id"] for name, schema in validator.schemas.items()}}
else:
    result = {"api": api_root, "response": response, "tool": tool, "policy": policy} if request["action"] == "sample" else request["values"]
    if not all(validator.validate(name, value) for name, value in result.items()):
        raise ValueError("Invalid contract")
print(json.dumps(result, ensure_ascii=False))
