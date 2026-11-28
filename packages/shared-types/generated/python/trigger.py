# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Any, Literal

from typing_extensions import TypedDict


class TriggerContract(TypedDict, closed=True):
    event_slug: str
    source: Literal['gateway', 'webhook', 'composio', 'none']
    payload_schema_ref: str
    filters: dict[str, Any]
    eligible_roles: list[Literal['ADMIN', 'MEMBER']]
    default_on_action: (
        Literal['help', 'setup', 'mention', 'approval', 'removal', 'status'] | None
    )
    filter_schema_ref: str


class SystemEvent(TypedDict, closed=True):
    pass


class SystemFilter(TypedDict, closed=True):
    pass
