# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Any, Literal

from typing_extensions import TypedDict


class Capabilities(TypedDict, closed=True):
    setup: bool
    invoke: bool
    connection: bool
    tool: bool
    trigger: bool
    response: bool


class SetupFlow(TypedDict, closed=True):
    adapter: str | None
    status: str | None
    permission: str | None
    bootstrap: str | None


type Scope = str


class OauthRequirements(TypedDict, closed=True):
    required: bool
    scopes: list[Scope]


class FieldCatalogTrigger(TypedDict, closed=True):
    event_slug: str
    source: Literal['gateway', 'webhook', 'composio', 'none']
    payload_schema_ref: str
    filters: dict[str, Any]
    eligible_roles: list[Literal['ADMIN', 'MEMBER']]
    default_on_action: (
        Literal['help', 'setup', 'mention', 'approval', 'removal', 'status'] | None
    )
    filter_schema_ref: str


class ToolResult1(TypedDict, closed=True):
    status: Literal['success']
    data_ref: str
    source: str
    timestamp: str
    error_code: None
    retryable: Literal[False]


class ToolResult2(TypedDict, closed=True):
    status: Literal['failed']
    data_ref: None
    source: str
    timestamp: str
    error_code: Literal[
        'AUTH_REQUIRED',
        'INVALID_CREDENTIAL',
        'RATE_LIMITED',
        'UNAVAILABLE',
        'BAD_INPUT',
        'NOT_AUTHORIZED',
        'BUDGET_EXHAUSTED',
        'TIMEOUT',
        'INTERNAL_ERROR',
    ]
    retryable: bool


type ToolResult = ToolResult1 | ToolResult2


type RequiredScope = str


class RateLimit(TypedDict, closed=True):
    max_calls: int
    window_ms: int


class ToolSpec(TypedDict, closed=True):
    tool_id: str
    version: Literal['1.0.0']
    provider_action: str
    operation: Literal['READ', 'WRITE']
    adapter: str
    input_schema_ref: str
    result_schema_ref: str
    required_scopes: list[RequiredScope]
    rate_limit: RateLimit


class ToolRegistry(TypedDict, closed=True):
    adapter: str | None
    tools: list[ToolSpec]


class Platform(TypedDict, closed=True):
    platform_key: str
    display_name: str
    enabled: bool
    capabilities: Capabilities
    setup_flow: SetupFlow
    invoke_adapter: str | None
    connection_adapter: str | None
    trigger_adapter: str | None
    response_adapter: str | None
    scheduler_support: bool
    supported_response_components: list[
        Literal[
            'TEXT',
            'EMBED',
            'RESULT_CARD',
            'APPROVAL_BUTTON',
            'PRIVATE_FORM_LINK',
            'ERROR_NOTICE',
        ]
    ]
    tool_registry: ToolRegistry
    oauth_requirements: OauthRequirements
    event_source_type: Literal['gateway', 'webhook', 'composio', 'none']
    default_event_policy: list[FieldCatalogTrigger]
    release: Literal['P0', 'P1', 'P2']


class PlatformContract(TypedDict, closed=True):
    schema_version: Literal['1.0.0']
    platforms: list[Platform]


type FieldCatalogTool = ToolSpec | ToolResult
