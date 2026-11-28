# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Literal, NotRequired

from typing_extensions import TypedDict


class LegacyHealthResponse(TypedDict, closed=True):
    status: Literal['ok']
    service: Literal['api']
    readiness: Literal['scaffold']


class FieldError(TypedDict, closed=True):
    field: str
    message: str


class CanonicalError(TypedDict, closed=True):
    code: str
    message: str
    field_errors: list[FieldError]
    trace_id: str
    retryable: bool


type Mode = Literal['normal', 'langgraph']


type InternalMode = Literal['SIMPLE', 'MULTI_AGENT']


class Component(TypedDict, closed=True):
    name: str
    status: str


class HealthSummary(TypedDict, closed=True):
    status: str
    components: list[Component]


class AppData(TypedDict, closed=True):
    location: Literal['HOSTED'] | None
    status: str


class Checkpoint(TypedDict, closed=True):
    location: Literal['HOSTED'] | None
    status: str


class StorageSummary(TypedDict, closed=True):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint


class RequestCounts(TypedDict, closed=True):
    queued: int
    running: int
    waiting_approval: int


class ApprovalCounts(TypedDict, closed=True):
    pending: int


type Counts = RequestCounts | ApprovalCounts


class EmptyBody(TypedDict, closed=True):
    pass


class Api001Response(TypedDict, closed=True):
    user_ref: str
    display_name: str | None
    platform: Literal['DISCORD']
    expires_at: str


class Api005Request(TypedDict, closed=True):
    name: str
    revision: int


class Api014Response(TypedDict, closed=True):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint
    revision: int


class Api015Response(TypedDict, closed=True):
    job_id: str
    status: str
    completed_classes: list[str]
    pending_classes: list[str]
    error_code: str | None
    updated_at: str


class Api016Response(TypedDict, closed=True):
    status: Literal['UP']


class Api017ReadyResponse(TypedDict, closed=True):
    status: Literal['READY']


class Api017NotReadyResponse(TypedDict, closed=True):
    status: Literal['NOT_READY']


class Api018Response(TypedDict, closed=True):
    enabled: bool
    export_mode: Literal['OFF', 'METADATA_ONLY']
    key_configured: bool
    workspace: str | None
    project: str | None
    destination_label: str | None
    retention_notice: str | None
    revision: int


class Api019Request(TypedDict, closed=True):
    enabled: bool
    export_mode: Literal['OFF', 'METADATA_ONLY']
    workspace: NotRequired[str]
    project: NotRequired[str]
    endpoint: NotRequired[str]
    api_key: NotRequired[str]
    remove_key: NotRequired[bool]
    consent_confirmed: NotRequired[bool]
    revision: int


class Api032Request(TypedDict, closed=True):
    session_ref: str
    message: str
    client_event_ref: str


class ApprovalDecisionRequest(TypedDict, closed=True):
    decision: Literal['APPROVE', 'REJECT']


class ModeResponse(TypedDict, closed=True):
    current_mode: Mode


class ModeRequest(TypedDict, closed=True):
    mode: Mode


class GrantResponse(TypedDict, closed=True):
    grant_id: str
    status: str
    revision: int


class Api048Request(TypedDict, closed=True):
    managed_selected: bool


class Api049Request(TypedDict, closed=True):
    managed_selected: bool
    revision: int


class Api049Response(TypedDict, closed=True):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint
    revision: int


class JobResponse(TypedDict, closed=True):
    job_id: str
    status: str


class OAuthCallbackQuery1(TypedDict, closed=True):
    code: str
    state: str
    iss: NotRequired[str]


class OAuthCallbackQuery2(TypedDict, closed=True):
    error: str
    state: str
    iss: NotRequired[str]


type OAuthCallbackQuery = OAuthCallbackQuery1 | OAuthCallbackQuery2


type Platform = Literal['DISCORD', 'LINE', 'GMAIL', 'GOOGLE_CALENDAR', 'GITHUB']


type Release = Literal['P0', 'P1', 'P2']


type ModelRole = Literal[
    'SIMPLE',
    'ORCHESTRATOR',
    'REVIEWER',
    'DISCORD',
    'LINE',
    'GMAIL',
    'GOOGLE_CALENDAR',
    'GITHUB',
]


type BotStatus = Literal[
    'UNCONFIGURED',
    'PENDING_STORAGE',
    'READY',
    'STOPPED',
    'DELETING',
    'REMOVED',
    'SETUP_DISABLED',
]


type RequestStatus = Literal[
    'QUEUED',
    'RUNNING',
    'WAITING_APPROVAL',
    'PAUSE_REQUESTED',
    'PAUSED',
    'CANCEL_REQUESTED',
    'CANCELLED',
    'COMPLETED',
    'FAILED',
    'EXPIRED',
    'REJECTED',
    'RECOVERY_REQUIRED',
]


type ApprovalType = Literal[
    'TOOL_ACTION', 'TRIGGER_POLICY_CREATE', 'TRIGGER_POLICY_UPDATE'
]


type Audience = Literal['PRIVATE', 'GROUP']


type GrantStatus = Literal['ACTIVE', 'REVOKED', 'EXPIRED']


type ApprovalStatus = Literal[
    'PENDING', 'APPROVED', 'REJECTED', 'EXPIRED', 'REVOKED', 'CONSUMED'
]


type FormAction = Literal[
    'SETUP',
    'GUILD_BOOTSTRAP',
    'DM_ENROLLMENT',
    'APPROVAL',
    'ACCOUNT_CONSENT',
    'BOT_CONNECTION',
    'PEOPLE_EDIT',
    'TRIGGER_POLICY',
    'DELETION',
    'TOOL_GRANT',
    'MODEL_CONFIG',
    'STORAGE_CONFIG',
]


type ScalarParameter = str | float | bool


type JsonValue = str | float | bool | list[JsonValue] | dict[str, JsonValue] | None


type ModelParameters = dict[str, ScalarParameter]


class ReviewedJsonSchema1(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['string', 'boolean', 'number', 'integer', 'null']
    enum: NotRequired[list[str | bool | float | None]]
    const: NotRequired[str | bool | float | None]
    format: NotRequired[Literal['uuid', 'date-time', 'uri', 'email']]
    pattern: NotRequired[str]
    minLength: NotRequired[int]
    maxLength: NotRequired[int]
    minimum: NotRequired[float]
    maximum: NotRequired[float]


type RequiredItem = str


class BotSummary(TypedDict, closed=True):
    bot_id: str
    name: str
    platform: Platform
    status: BotStatus
    conversation_label: str


class CommandSync(TypedDict, closed=True):
    status: Literal['PENDING', 'SYNCED', 'FALLBACK']
    reason_code: str | None


class SafePreview(TypedDict, closed=True):
    field: str
    before: str | None
    after: str | None


class ToolActionPreview(TypedDict, closed=True):
    tool_id: str
    version: str
    operation: str
    target: str
    changes: list[SafePreview]


class TriggerPolicyPreview(TypedDict, closed=True):
    event_type: str
    filters: dict[str, ScalarParameter]
    account: str
    resource: str
    action: str
    argument_bounds: dict[str, ScalarParameter]
    destination: str
    audience: Audience
    recurrence: str | None
    timezone: str | None
    expires_at: str
    quota: int
    policy_revision: int


class SafeLogEvent(TypedDict, closed=True):
    timestamp: str
    level: str
    service: str
    event_type: str
    trace_id: str
    reason_code: str | None
    safe_metadata: dict[str, ScalarParameter | None]


class Session(TypedDict, closed=True):
    session_ref: str
    execution_mode: Mode


class Api005Response(TypedDict, closed=True):
    bot: BotSummary
    revision: int
    command_sync: CommandSync


class Platform1(TypedDict, closed=True):
    platform: Platform
    label: str
    release: Release
    enabled: bool
    setup_available: bool
    reason_code: str | None


class Api007Response(TypedDict, closed=True):
    platforms: list[Platform1]


class AccountSummary(TypedDict, closed=True):
    account_ref: str
    platform: Platform
    label: str | None
    status: Literal['PENDING', 'ACTIVE', 'REVOKED', 'UNAVAILABLE']
    visible_scopes: list[str]
    audience: Audience
    can_revoke: bool


class AccountPage(TypedDict, closed=True):
    items: list[AccountSummary]
    next_cursor: str | None


class Item2(TypedDict, closed=True):
    approval_id: str
    request_ref: str | None
    approval_type: ApprovalType
    operation_label: str
    status: ApprovalStatus
    expires_at: str
    can_decide: bool


class ApprovalPage(TypedDict, closed=True):
    items: list[Item2]
    next_cursor: str | None


class Api012Response1(TypedDict, closed=True):
    approval_id: str
    status: ApprovalStatus
    approval_type: Literal['TOOL_ACTION']
    preview: ToolActionPreview
    digest: str
    expires_at: str
    can_decide: bool


class Api012Response2(TypedDict, closed=True):
    approval_id: str
    status: ApprovalStatus
    approval_type: Literal['TRIGGER_POLICY_CREATE', 'TRIGGER_POLICY_UPDATE']
    preview: TriggerPolicyPreview
    digest: str
    expires_at: str
    can_decide: bool


type Api012Response = Api012Response1 | Api012Response2


class Item3(TypedDict, closed=True):
    request_id: str
    status: RequestStatus
    queue_position: int | None
    execution_mode: Mode
    created_at: str
    error_code: str | None
    can_control: bool


class RequestPage(TypedDict, closed=True):
    items: list[Item3]
    next_cursor: str | None


class Api020Request(TypedDict, closed=True):
    request_ref: str
    step_id: str
    tool_id: str
    tool_version: str
    arguments: dict[str, JsonValue]
    action_ref: NotRequired[str]
    idempotency_key: str
    lease_ref: str


class Api020Response(TypedDict, closed=True):
    status: Literal['SUCCEEDED', 'FAILED', 'APPROVAL_REQUIRED']
    result: NotRequired[JsonValue]
    approval_ref: NotRequired[str]
    error_code: NotRequired[str]
    retryable: bool
    trace_id: str


type OperationSetItem = str


class Api040Request(TypedDict, closed=True):
    tool_id: str
    resource_ref: str
    operation_set: list[OperationSetItem]
    audience: Audience
    expires_at: str
    revision: int


type AllowedReadOperation = str


class Api043Request(TypedDict, closed=True):
    session_ref: str
    resource_ref: str
    allowed_read_operations: list[AllowedReadOperation]
    audience: Audience
    expires_at: str


class Api043Response(TypedDict, closed=True):
    consent_id: str
    status: GrantStatus


class Api047Request(TypedDict, closed=True):
    operation: Literal['GRANT', 'REVOKE']
    grantee_ref: str
    expected_revision: int


class ValidationChecks(TypedDict, closed=True):
    valid: bool
    checks: list[str]
    warnings: list[str]


type Capability = str


class ModelCapability(TypedDict, closed=True):
    model_catalog_ref: str
    provider: str
    model_id: str
    display_name: str
    capabilities: list[Capability]


class ParameterRule(TypedDict, closed=True):
    type: Literal['number', 'integer', 'string', 'boolean']
    minimum: NotRequired[float]
    maximum: NotRequired[float]
    enum: NotRequired[list[str | float | bool]]
    default: NotRequired[str | float | bool]


type ToolConstraint = str


class Api050Response(TypedDict, closed=True):
    models: list[ModelCapability]
    supported_params: dict[str, dict[str, ParameterRule]]
    tool_constraints: dict[str, list[ToolConstraint]]


class Api051Request(TypedDict, closed=True):
    provider: str
    model_id: str
    parameters: ModelParameters
    credential: NotRequired[str]
    confirm_cost: bool


class Api052Request(TypedDict, closed=True):
    model_catalog_ref: str
    parameters: ModelParameters
    credential: NotRequired[str]
    revision: int


class Api052Response(TypedDict, closed=True):
    provider: str
    model_name: str
    role: ModelRole
    credential_configured: bool
    revision: int


type RequestedScope = str


class Api053Request(TypedDict, closed=True):
    requested_scopes: list[RequestedScope]
    form_ref: str


class Api053Response(TypedDict, closed=True):
    authorization_url: str


class Api057Request(TypedDict, closed=True):
    target_ref: str
    confirmation: Literal[True]
    revision: int


class Api058Request(TypedDict, closed=True):
    action: FormAction
    resource_ref: str
    request_ref: NotRequired[str]


class Api058Response(TypedDict, closed=True):
    ticket_ref: str
    private_delivery_ref: str
    expires_at: str


class Api060Response(TypedDict, closed=True):
    form_session_ref: str
    expires_at: str


class FormSubmission(TypedDict, extra_items='JsonValue'):
    revision: int
    confirmation: NotRequired[bool]


class Api062Response(TypedDict, closed=True):
    status: str
    revision: int
    job_ref: NotRequired[str]


class Api064Request(TypedDict, closed=True):
    ticket_ref: NotRequired[str]


class LogQuery(TypedDict, closed=True):
    level: NotRequired[str]
    service: NotRequired[str]
    event_type: NotRequired[str]
    start_at: NotRequired[str]
    end_at: NotRequired[str]
    limit: NotRequired[int]
    cursor: NotRequired[str]


class TraceQuery(TypedDict, closed=True):
    limit: NotRequired[int]
    cursor: NotRequired[str]


class Api027Response(TypedDict, closed=True):
    items: list[SafeLogEvent]
    next_cursor: str | None


class Api028Response(TypedDict, closed=True):
    request_id: str
    trace_id: str
    events: list[SafeLogEvent]
    next_cursor: str | None


class Api030Request(TypedDict, closed=True):
    request_ref: str
    lease_ref: str
    idempotency_key: str


class Api030Response(TypedDict, closed=True):
    request_id: str
    status: Literal['QUEUED', 'RUNNING']
    trace_id: str


class Api031Request(TypedDict, closed=True):
    trigger_ref: str
    scheduled_at: str
    delivery_id: str
    lease_ref: str


class Firing(TypedDict, closed=True):
    trigger_id: str
    request_id: NotRequired[str]
    status: str


class Api031Response(TypedDict, closed=True):
    status: Literal['ACCEPTED', 'NO_MATCH', 'DUPLICATE']
    firings: list[Firing]
    trace_id: str


class BotIdPath(TypedDict, closed=True):
    botId: str


class PlatformPath(TypedDict, closed=True):
    platform: Platform


class ApprovalIdPath(TypedDict, closed=True):
    approvalId: str


class JobIdPath(TypedDict, closed=True):
    jobId: str


class RequestIdPath(TypedDict, closed=True):
    requestId: str


class GrantIdPath(TypedDict, closed=True):
    grantId: str


class SessionIdPath(TypedDict, closed=True):
    sessionId: str


class BotIdAgentRolePath(TypedDict, closed=True):
    botId: str
    agentRole: ModelRole


class AccountCallbackQuery1(TypedDict, closed=True):
    code: str
    state: str


class AccountCallbackQuery2(TypedDict, closed=True):
    error: str
    state: str


type AccountCallbackQuery = AccountCallbackQuery1 | AccountCallbackQuery2


class AccountIdPath(TypedDict, closed=True):
    accountId: str


class ActionTicketPath(TypedDict, closed=True):
    action: FormAction
    ticket: str


class FormIdPath(TypedDict, closed=True):
    formId: str


class SafeScope(TypedDict, closed=True):
    platforms: list[str]
    tool_ids: list[str]
    operations: list[str]
    resource_labels: list[str]
    audience: Audience
    expires_at: str | None


class ModelSummary(TypedDict, closed=True):
    provider: str
    model_name: str
    role: ModelRole
    credential_configured: bool


class FeatureSummary(TypedDict, closed=True):
    enabled: bool
    release: Release
    count: int | None
    reason_code: str | None


class ConnectionSummary(TypedDict, closed=True):
    connection_id: str
    bot_label: str
    status: str
    scope: SafeScope
    expires_at: str | None


class RequestAcceptedResponse(TypedDict, closed=True):
    request_id: str
    status: RequestStatus
    execution_mode: Mode
    trace_id: str


class Api033Response(TypedDict, closed=True):
    request_id: str
    status: RequestStatus
    queue_position: int | None
    execution_mode: Mode
    error_code: str | None
    can_control: bool
    trace_id: str


class BotTransitionResponse(TypedDict, closed=True):
    bot_id: str
    status: BotStatus
    trace_id: str


class ApprovalDecisionResponse(TypedDict, closed=True):
    approval_id: str
    approval_type: ApprovalType
    status: ApprovalStatus
    activation_status: NotRequired[str]
    trace_id: str


class ConnectionDashboard(TypedDict, closed=True):
    enabled: bool
    incoming: list[ConnectionSummary]
    outgoing: list[ConnectionSummary]
    pending_count: int | None


class Item(TypedDict, closed=True):
    bot_id: str
    name: str
    platform: Platform
    conversation_label: str
    status: BotStatus
    can_setup: Literal[True]
    model: ModelSummary | None


class BotPage(TypedDict, closed=True):
    items: list[Item]
    next_cursor: str | None


class Api004Response(TypedDict, closed=True):
    bot: BotSummary
    revision: int
    models: list[ModelSummary]
    sessions: list[Session]
    storage: StorageSummary
    health: HealthSummary
    requests: RequestCounts
    approvals: ApprovalCounts
    triggers: FeatureSummary
    connections: ConnectionDashboard
    command_sync: CommandSync


class Agent(TypedDict, closed=True):
    role: ModelRole
    model: ModelSummary
    parameters: ModelParameters
    credential_configured: bool
    revision: int


class Api006Response(TypedDict, closed=True):
    agents: list[Agent]
    supported_modes: list[Mode]


class Item1(TypedDict, closed=True):
    grant_id: str
    tool_id: str
    scope: SafeScope
    status: GrantStatus
    expires_at: str | None
    approval_required: bool


class ToolGrantPage(TypedDict, closed=True):
    items: list[Item1]
    next_cursor: str | None


class Api041Response(TypedDict, closed=True):
    grant_id: str
    scope: SafeScope
    status: GrantStatus
    revision: int


class GeneratorWrapper(TypedDict):
    value0: NotRequired[LegacyHealthResponse]
    value1: NotRequired[FieldError]
    value2: NotRequired[CanonicalError]
    value3: NotRequired[Mode]
    value4: NotRequired[InternalMode]
    value5: NotRequired[SafeScope]
    value6: NotRequired[ModelSummary]
    value7: NotRequired[HealthSummary]
    value8: NotRequired[FeatureSummary]
    value9: NotRequired[StorageSummary]
    value10: NotRequired[ConnectionSummary]
    value11: NotRequired[RequestCounts]
    value12: NotRequired[ApprovalCounts]
    value13: NotRequired[Counts]
    value14: NotRequired[EmptyBody]
    value15: NotRequired[Api001Response]
    value16: NotRequired[Api005Request]
    value17: NotRequired[Api014Response]
    value18: NotRequired[Api015Response]
    value19: NotRequired[Api016Response]
    value20: NotRequired[Api017ReadyResponse]
    value21: NotRequired[Api017NotReadyResponse]
    value22: NotRequired[Api018Response]
    value23: NotRequired[Api019Request]
    value24: NotRequired[Api032Request]
    value25: NotRequired[RequestAcceptedResponse]
    value26: NotRequired[Api033Response]
    value27: NotRequired[BotTransitionResponse]
    value28: NotRequired[ApprovalDecisionRequest]
    value29: NotRequired[ApprovalDecisionResponse]
    value30: NotRequired[ModeResponse]
    value31: NotRequired[ModeRequest]
    value32: NotRequired[GrantResponse]
    value33: NotRequired[Api048Request]
    value34: NotRequired[Api049Request]
    value35: NotRequired[Api049Response]
    value36: NotRequired[JobResponse]
    value37: NotRequired[OAuthCallbackQuery]
    value38: NotRequired[Platform]
    value39: NotRequired[Release]
    value40: NotRequired[ModelRole]
    value41: NotRequired[BotStatus]
    value42: NotRequired[RequestStatus]
    value43: NotRequired[ApprovalType]
    value44: NotRequired[Audience]
    value45: NotRequired[GrantStatus]
    value46: NotRequired[ApprovalStatus]
    value47: NotRequired[FormAction]
    value48: NotRequired[ScalarParameter]
    value49: NotRequired[JsonValue]
    value50: NotRequired[ModelParameters]
    value51: NotRequired[ReviewedJsonSchema]
    value52: NotRequired[BotSummary]
    value53: NotRequired[CommandSync]
    value54: NotRequired[ConnectionDashboard]
    value55: NotRequired[SafePreview]
    value56: NotRequired[ToolActionPreview]
    value57: NotRequired[TriggerPolicyPreview]
    value58: NotRequired[SafeLogEvent]
    value59: NotRequired[BotPage]
    value60: NotRequired[Api004Response]
    value61: NotRequired[Api005Response]
    value62: NotRequired[Api006Response]
    value63: NotRequired[Api007Response]
    value64: NotRequired[AccountSummary]
    value65: NotRequired[AccountPage]
    value66: NotRequired[Api009Response]
    value67: NotRequired[ToolGrantPage]
    value68: NotRequired[ApprovalPage]
    value69: NotRequired[Api012Response]
    value70: NotRequired[RequestPage]
    value71: NotRequired[Api020Request]
    value72: NotRequired[Api020Response]
    value73: NotRequired[Api023Response]
    value74: NotRequired[Api040Request]
    value75: NotRequired[Api041Response]
    value76: NotRequired[Api043Request]
    value77: NotRequired[Api043Response]
    value78: NotRequired[Api047Request]
    value79: NotRequired[ValidationChecks]
    value80: NotRequired[ModelCapability]
    value81: NotRequired[ParameterRule]
    value82: NotRequired[Api050Response]
    value83: NotRequired[Api051Request]
    value84: NotRequired[Api052Request]
    value85: NotRequired[Api052Response]
    value86: NotRequired[Api053Request]
    value87: NotRequired[Api053Response]
    value88: NotRequired[Api057Request]
    value89: NotRequired[Api058Request]
    value90: NotRequired[Api058Response]
    value91: NotRequired[Api060Response]
    value92: NotRequired[Api061Response]
    value93: NotRequired[FormSubmission]
    value94: NotRequired[Api062Response]
    value95: NotRequired[Api064Request]
    value96: NotRequired[LogQuery]
    value97: NotRequired[TraceQuery]
    value98: NotRequired[Api027Response]
    value99: NotRequired[Api028Response]
    value100: NotRequired[Api030Request]
    value101: NotRequired[Api030Response]
    value102: NotRequired[Api031Request]
    value103: NotRequired[Api031Response]
    value104: NotRequired[BotIdPath]
    value105: NotRequired[PlatformPath]
    value106: NotRequired[ApprovalIdPath]
    value107: NotRequired[JobIdPath]
    value108: NotRequired[RequestIdPath]
    value109: NotRequired[GrantIdPath]
    value110: NotRequired[SessionIdPath]
    value111: NotRequired[BotIdAgentRolePath]
    value112: NotRequired[AccountCallbackQuery]
    value113: NotRequired[AccountIdPath]
    value114: NotRequired[ActionTicketPath]
    value115: NotRequired[FormIdPath]
    value116: NotRequired[ApiContract]


class ReviewedJsonSchema2(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['object']
    properties: dict[str, ReviewedJsonSchema]
    required: NotRequired[list[RequiredItem]]
    additionalProperties: Literal[False]


class ReviewedJsonSchema3(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['array']
    items: ReviewedJsonSchema
    minItems: NotRequired[int]
    maxItems: NotRequired[int]
    uniqueItems: NotRequired[bool]


class ReviewedJsonSchema4(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    anyOf: list[ReviewedJsonSchema]


class ReviewedJsonSchema5(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    oneOf: list[ReviewedJsonSchema]


type ReviewedJsonSchema = ReviewedJsonSchema1 | ReviewedJsonSchema2 | ReviewedJsonSchema3 | ReviewedJsonSchema4 | ReviewedJsonSchema5


class Tool(TypedDict, closed=True):
    tool_id: str
    version: str
    label: str
    operation: Literal['READ', 'WRITE']
    input_schema: ReviewedJsonSchema
    approval_required: bool
    sensitive: bool
    enabled: bool


class Api009Response(TypedDict, closed=True):
    platform: Platform
    tools: list[Tool]


class Trigger(TypedDict, closed=True):
    event_type: str
    label: str
    config_schema: ReviewedJsonSchema
    enabled: bool
    default_system: bool
    requires_approval: bool


class Api023Response(TypedDict, closed=True):
    platform: Platform
    triggers: list[Trigger]


class Api061Response(TypedDict, closed=True):
    action: FormAction
    fields: ReviewedJsonSchema
    expires_at: str
    revision: int


type ApiContract = LegacyHealthResponse | CanonicalError | Api017NotReadyResponse | Api001Response | EmptyBody | BotPage | Api004Response | Api005Request | Api005Response | Api006Response | Api007Response | AccountPage | Api009Response | ToolGrantPage | ApprovalPage | Api012Response | RequestPage | Api014Response | Api015Response | Api016Response | Api017ReadyResponse | Api018Response | Api019Request | Api020Request | Api020Response | Api023Response | Api027Response | Api028Response | Api030Request | Api030Response | Api031Request | Api031Response | Api032Request | RequestAcceptedResponse | Api033Response | BotTransitionResponse | ApprovalDecisionRequest | ApprovalDecisionResponse | Api040Request | GrantResponse | Api041Response | Api043Request | Api043Response | HealthSummary | ModeResponse | ModeRequest | Api047Request | Api048Request | ValidationChecks | Api049Request | Api049Response | Api050Response | Api051Request | Api052Request | Api052Response | Api053Request | Api053Response | AccountSummary | Api057Request | JobResponse | Api058Request | Api058Response | Api060Response | Api061Response | FormSubmission | Api062Response | Api064Request
