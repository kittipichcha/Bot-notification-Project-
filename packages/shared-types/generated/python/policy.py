# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Dict, List, Literal, NotRequired, TypedDict, Union


class Tool(TypedDict):
    default_access: Literal['DENY']


class ScheduleLimits(TypedDict):
    min_interval_ms: int
    max_runs: int


class Trigger(TypedDict):
    personal_watches_by_default: Literal[False]
    ignore_own_messages: Literal[True]
    schedule_enabled: bool
    schedule_limits: NotRequired[ScheduleLimits]
    deduplicate_events: Literal[True]


Capability = str


class ParameterRules(TypedDict):
    type: Literal['number', 'integer', 'string', 'boolean']
    minimum: NotRequired[float]
    maximum: NotRequired[float]
    enum: NotRequired[List[Union[str, float, bool]]]
    default: NotRequired[Union[str, float, bool]]


class AllowedModel(TypedDict):
    provider: str
    model: str
    capabilities: List[Capability]
    parameter_rules: Dict[str, ParameterRules]


class Model(TypedDict):
    allowed_models: List[AllowedModel]


class RoleDefinitions(TypedDict):
    graph_mode: Literal['SIMPLE', 'MULTI_AGENT']
    capabilities: List[Capability]


class Agent(TypedDict):
    default_mode: Literal['SIMPLE', 'MULTI_AGENT']
    enabled_modes: List[Literal['SIMPLE', 'MULTI_AGENT']]
    role_definitions: Dict[str, RoleDefinitions]
    max_model_calls: int


class RetryPolicy(TypedDict):
    model_retries: int
    tool_retries: int
    backoff_ms: NotRequired[int]


class Request(TypedDict):
    execution_enabled: bool
    deadline_ms: NotRequired[int]
    retry_policy: RetryPolicy


class Approval(TypedDict):
    enabled: bool
    mutation_policy: Literal['EXACT_ACTION']
    action_expiry_ms: NotRequired[int]


class CrossBotPolicy(TypedDict):
    operation: Literal['READ']
    max_hops: Literal[1]


class BotConnection(TypedDict):
    enabled_modes: List[Literal['SAME_BOT', 'CROSS_BOT_READ']]
    cross_bot_policy: NotRequired[CrossBotPolicy]
    invitation_max_age_ms: NotRequired[int]


class Response(TypedDict):
    supported_components: List[
        Literal[
            'TEXT',
            'EMBED',
            'RESULT_CARD',
            'APPROVAL_BUTTON',
            'PRIVATE_FORM_LINK',
            'ERROR_NOTICE',
        ]
    ]


class PolicyContract(TypedDict):
    schema_version: Literal['1.0.0']
    release: Literal['P0', 'P1', 'P2']
    tool: Tool
    trigger: Trigger
    model: Model
    agent: Agent
    request: Request
    approval: Approval
    bot_connection: BotConnection
    response: Response
