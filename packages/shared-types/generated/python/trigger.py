# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional, TypedDict


class TriggerContract(TypedDict):
    event_slug: str
    source: Literal['gateway', 'webhook', 'composio', 'none']
    payload_schema_ref: str
    filters: Dict[str, Any]
    eligible_roles: List[Literal['ADMIN', 'MEMBER']]
    default_on_action: Optional[
        Literal['help', 'setup', 'mention', 'approval', 'removal', 'status']
    ]
    filter_schema_ref: str


class SystemEvent(TypedDict):
    pass


class SystemFilter(TypedDict):
    pass
