# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Literal, NotRequired

from typing_extensions import TypedDict


class Tool(TypedDict, closed=True):
    default_access: Literal['DENY']


class ScheduleLimits(TypedDict, closed=True):
    min_interval_ms: int
    max_runs: int


class Trigger(TypedDict, closed=True):
    personal_watches_by_default: Literal[False]
    ignore_own_messages: Literal[True]
    schedule_enabled: bool
    schedule_limits: NotRequired[ScheduleLimits]
    deduplicate_events: Literal[True]


type Capability = str


class ParameterRules(TypedDict, closed=True):
    type: Literal['number', 'integer', 'string', 'boolean']
    minimum: NotRequired[float]
    maximum: NotRequired[float]
    enum: NotRequired[list[str | float | bool]]
    default: NotRequired[str | float | bool]


class AllowedModel(TypedDict, closed=True):
    provider: str
    model: str
    capabilities: list[Capability]
    parameter_rules: dict[str, ParameterRules]


class Model(TypedDict, closed=True):
    allowed_models: list[AllowedModel]


class RoleDefinitions(TypedDict, closed=True):
    graph_mode: Literal['SIMPLE', 'MULTI_AGENT']
    capabilities: list[Capability]


class Agent(TypedDict, closed=True):
    default_mode: Literal['SIMPLE', 'MULTI_AGENT']
    enabled_modes: list[Literal['SIMPLE', 'MULTI_AGENT']]
    role_definitions: dict[str, RoleDefinitions]
    max_model_calls: int


class RetryPolicy(TypedDict, closed=True):
    model_retries: int
    tool_retries: int
    backoff_ms: NotRequired[int]


class Request(TypedDict, closed=True):
    execution_enabled: bool
    deadline_ms: NotRequired[int]
    retry_policy: RetryPolicy


class Approval(TypedDict, closed=True):
    enabled: bool
    mutation_policy: Literal['EXACT_ACTION']
    action_expiry_ms: NotRequired[int]


class CrossBotPolicy(TypedDict, closed=True):
    operation: Literal['READ']
    max_hops: Literal[1]


class BotConnection(TypedDict, closed=True):
    enabled_modes: list[Literal['SAME_BOT', 'CROSS_BOT_READ']]
    cross_bot_policy: NotRequired[CrossBotPolicy]
    invitation_max_age_ms: NotRequired[int]


class Response(TypedDict, closed=True):
    supported_components: list[
        Literal[
            'TEXT',
            'EMBED',
            'RESULT_CARD',
            'APPROVAL_BUTTON',
            'PRIVATE_FORM_LINK',
            'ERROR_NOTICE',
        ]
    ]


class PolicyContract(TypedDict, closed=True):
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
