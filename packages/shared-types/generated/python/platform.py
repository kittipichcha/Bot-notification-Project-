# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional, TypedDict, Union


class Capabilities(TypedDict):
    setup: bool
    invoke: bool
    connection: bool
    tool: bool
    trigger: bool
    response: bool


class SetupFlow(TypedDict):
    adapter: Optional[str]
    status: Optional[str]
    permission: Optional[str]
    bootstrap: Optional[str]


Scope = str


class OauthRequirements(TypedDict):
    required: bool
    scopes: List[Scope]


class FieldCatalogTrigger(TypedDict):
    event_slug: str
    source: Literal['gateway', 'webhook', 'composio', 'none']
    payload_schema_ref: str
    filters: Dict[str, Any]
    eligible_roles: List[Literal['ADMIN', 'MEMBER']]
    default_on_action: Optional[
        Literal['help', 'setup', 'mention', 'approval', 'removal', 'status']
    ]
    filter_schema_ref: str


class ToolResult1(TypedDict):
    status: Literal['success']
    data_ref: str
    source: str
    timestamp: str
    error_code: None
    retryable: Literal[False]


class ToolResult2(TypedDict):
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


ToolResult = Union[ToolResult1, ToolResult2]


RequiredScope = str


class RateLimit(TypedDict):
    max_calls: int
    window_ms: int


class ToolSpec(TypedDict):
    tool_id: str
    version: Literal['1.0.0']
    provider_action: str
    operation: Literal['READ', 'WRITE']
    adapter: str
    input_schema_ref: str
    result_schema_ref: str
    required_scopes: List[RequiredScope]
    rate_limit: RateLimit


class ToolRegistry(TypedDict):
    adapter: Optional[str]
    tools: List[ToolSpec]


class Platform(TypedDict):
    platform_key: str
    display_name: str
    enabled: bool
    capabilities: Capabilities
    setup_flow: SetupFlow
    invoke_adapter: Optional[str]
    connection_adapter: Optional[str]
    trigger_adapter: Optional[str]
    response_adapter: Optional[str]
    scheduler_support: bool
    supported_response_components: List[
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
    default_event_policy: List[FieldCatalogTrigger]
    release: Literal['P0', 'P1', 'P2']


class PlatformContract(TypedDict):
    schema_version: Literal['1.0.0']
    platforms: List[Platform]


FieldCatalogTool = Union[ToolSpec, ToolResult]
