# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Dict, List, Literal, NotRequired, Optional, TypedDict, Union


class LegacyHealthResponse(TypedDict):
    status: Literal['ok']
    service: Literal['api']
    readiness: Literal['scaffold']


class FieldError(TypedDict):
    field: str
    message: str


class CanonicalError(TypedDict):
    code: str
    message: str
    field_errors: List[FieldError]
    trace_id: str
    retryable: bool


Mode = Literal['normal', 'langgraph']


InternalMode = Literal['SIMPLE', 'MULTI_AGENT']


class Component(TypedDict):
    name: str
    status: str


class HealthSummary(TypedDict):
    status: str
    components: List[Component]


class AppData(TypedDict):
    location: Optional[Literal['HOSTED']]
    status: str


class Checkpoint(TypedDict):
    location: Optional[Literal['HOSTED']]
    status: str


class StorageSummary(TypedDict):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint


class RequestCounts(TypedDict):
    queued: int
    running: int
    waiting_approval: int


class ApprovalCounts(TypedDict):
    pending: int


Counts = Union[RequestCounts, ApprovalCounts]


class EmptyBody(TypedDict):
    pass


class Api001Response(TypedDict):
    user_ref: str
    display_name: Optional[str]
    platform: Literal['DISCORD']
    expires_at: str


class Api005Request(TypedDict):
    name: str
    revision: int


class Api014Response(TypedDict):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint
    revision: int


class Api015Response(TypedDict):
    job_id: str
    status: str
    completed_classes: List[str]
    pending_classes: List[str]
    error_code: Optional[str]
    updated_at: str


class Api016Response(TypedDict):
    status: Literal['UP']


class Api017ReadyResponse(TypedDict):
    status: Literal['READY']


class Api017NotReadyResponse(TypedDict):
    status: Literal['NOT_READY']


class Api018Response(TypedDict):
    enabled: bool
    export_mode: Literal['OFF', 'METADATA_ONLY']
    key_configured: bool
    workspace: Optional[str]
    project: Optional[str]
    destination_label: Optional[str]
    retention_notice: Optional[str]
    revision: int


class Api019Request(TypedDict):
    enabled: bool
    export_mode: Literal['OFF', 'METADATA_ONLY']
    workspace: NotRequired[str]
    project: NotRequired[str]
    endpoint: NotRequired[str]
    api_key: NotRequired[str]
    remove_key: NotRequired[bool]
    consent_confirmed: NotRequired[bool]
    revision: int


class Api032Request(TypedDict):
    session_ref: str
    message: str
    client_event_ref: str


class ApprovalDecisionRequest(TypedDict):
    decision: Literal['APPROVE', 'REJECT']


class ModeResponse(TypedDict):
    current_mode: Mode


class ModeRequest(TypedDict):
    mode: Mode


class GrantResponse(TypedDict):
    grant_id: str
    status: str
    revision: int


class Api048Request(TypedDict):
    managed_selected: bool


class Api049Request(TypedDict):
    managed_selected: bool
    revision: int


class Api049Response(TypedDict):
    managed_selected: bool
    app_data: AppData
    checkpoint: Checkpoint
    revision: int


class JobResponse(TypedDict):
    job_id: str
    status: str


class OAuthCallbackQuery1(TypedDict):
    code: str
    state: str
    iss: NotRequired[str]


class OAuthCallbackQuery2(TypedDict):
    error: str
    state: str
    iss: NotRequired[str]


OAuthCallbackQuery = Union[OAuthCallbackQuery1, OAuthCallbackQuery2]


Platform = Literal['DISCORD', 'LINE', 'GMAIL', 'GOOGLE_CALENDAR', 'GITHUB']


Release = Literal['P0', 'P1', 'P2']


ModelRole = Literal[
    'SIMPLE',
    'ORCHESTRATOR',
    'REVIEWER',
    'DISCORD',
    'LINE',
    'GMAIL',
    'GOOGLE_CALENDAR',
    'GITHUB',
]


BotStatus = Literal[
    'UNCONFIGURED',
    'PENDING_STORAGE',
    'READY',
    'STOPPED',
    'DELETING',
    'REMOVED',
    'SETUP_DISABLED',
]


RequestStatus = Literal[
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


ApprovalType = Literal['TOOL_ACTION', 'TRIGGER_POLICY_CREATE', 'TRIGGER_POLICY_UPDATE']


Audience = Literal['PRIVATE', 'GROUP']


GrantStatus = Literal['ACTIVE', 'REVOKED', 'EXPIRED']


ApprovalStatus = Literal[
    'PENDING', 'APPROVED', 'REJECTED', 'EXPIRED', 'REVOKED', 'CONSUMED'
]


FormAction = Literal[
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


ScalarParameter = Union[str, float, bool]


JsonValue = Optional[Union[str, float, bool, List['JsonValue'], Dict[str, 'JsonValue']]]


ModelParameters = Dict[str, ScalarParameter]


class ReviewedJsonSchema1(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['string', 'boolean', 'number', 'integer', 'null']
    enum: NotRequired[List[Optional[Union[str, bool, float]]]]
    const: NotRequired[Optional[Union[str, bool, float]]]
    format: NotRequired[Literal['uuid', 'date-time', 'uri', 'email']]
    pattern: NotRequired[str]
    minLength: NotRequired[int]
    maxLength: NotRequired[int]
    minimum: NotRequired[float]
    maximum: NotRequired[float]


RequiredItem = str


class BotSummary(TypedDict):
    bot_id: str
    name: str
    platform: Platform
    status: BotStatus
    conversation_label: str


class CommandSync(TypedDict):
    status: Literal['PENDING', 'SYNCED', 'FALLBACK']
    reason_code: Optional[str]


class SafePreview(TypedDict):
    field: str
    before: Optional[str]
    after: Optional[str]


class ToolActionPreview(TypedDict):
    tool_id: str
    version: str
    operation: str
    target: str
    changes: List[SafePreview]


class TriggerPolicyPreview(TypedDict):
    event_type: str
    filters: Dict[str, ScalarParameter]
    account: str
    resource: str
    action: str
    argument_bounds: Dict[str, ScalarParameter]
    destination: str
    audience: Audience
    recurrence: Optional[str]
    timezone: Optional[str]
    expires_at: str
    quota: int
    policy_revision: int


class SafeLogEvent(TypedDict):
    timestamp: str
    level: str
    service: str
    event_type: str
    trace_id: str
    reason_code: Optional[str]
    safe_metadata: Dict[str, Optional[ScalarParameter]]


class Session(TypedDict):
    session_ref: str
    execution_mode: Mode


class Api005Response(TypedDict):
    bot: BotSummary
    revision: int
    command_sync: CommandSync


class Platform1(TypedDict):
    platform: Platform
    label: str
    release: Release
    enabled: bool
    setup_available: bool
    reason_code: Optional[str]


class Api007Response(TypedDict):
    platforms: List[Platform1]


class AccountSummary(TypedDict):
    account_ref: str
    platform: Platform
    label: Optional[str]
    status: Literal['PENDING', 'ACTIVE', 'REVOKED', 'UNAVAILABLE']
    visible_scopes: List[str]
    audience: Audience
    can_revoke: bool


class AccountPage(TypedDict):
    items: List[AccountSummary]
    next_cursor: Optional[str]


class Item2(TypedDict):
    approval_id: str
    request_ref: Optional[str]
    approval_type: ApprovalType
    operation_label: str
    status: ApprovalStatus
    expires_at: str
    can_decide: bool


class ApprovalPage(TypedDict):
    items: List[Item2]
    next_cursor: Optional[str]


class Api012Response1(TypedDict):
    approval_id: str
    status: ApprovalStatus
    approval_type: Literal['TOOL_ACTION']
    preview: ToolActionPreview
    digest: str
    expires_at: str
    can_decide: bool


class Api012Response2(TypedDict):
    approval_id: str
    status: ApprovalStatus
    approval_type: Literal['TRIGGER_POLICY_CREATE', 'TRIGGER_POLICY_UPDATE']
    preview: TriggerPolicyPreview
    digest: str
    expires_at: str
    can_decide: bool


Api012Response = Union[Api012Response1, Api012Response2]


class Item3(TypedDict):
    request_id: str
    status: RequestStatus
    queue_position: Optional[int]
    execution_mode: Mode
    created_at: str
    error_code: Optional[str]
    can_control: bool


class RequestPage(TypedDict):
    items: List[Item3]
    next_cursor: Optional[str]


class Api020Request(TypedDict):
    request_ref: str
    step_id: str
    tool_id: str
    tool_version: str
    arguments: Dict[str, JsonValue]
    action_ref: NotRequired[str]
    idempotency_key: str
    lease_ref: str


class Api020Response(TypedDict):
    status: Literal['SUCCEEDED', 'FAILED', 'APPROVAL_REQUIRED']
    result: NotRequired[JsonValue]
    approval_ref: NotRequired[str]
    error_code: NotRequired[str]
    retryable: bool
    trace_id: str


OperationSetItem = str


class Api040Request(TypedDict):
    tool_id: str
    resource_ref: str
    operation_set: List[OperationSetItem]
    audience: Audience
    expires_at: str
    revision: int


AllowedReadOperation = str


class Api043Request(TypedDict):
    session_ref: str
    resource_ref: str
    allowed_read_operations: List[AllowedReadOperation]
    audience: Audience
    expires_at: str


class Api043Response(TypedDict):
    consent_id: str
    status: GrantStatus


class Api047Request(TypedDict):
    operation: Literal['GRANT', 'REVOKE']
    grantee_ref: str
    expected_revision: int


class ValidationChecks(TypedDict):
    valid: bool
    checks: List[str]
    warnings: List[str]


Capability = str


class ModelCapability(TypedDict):
    model_catalog_ref: str
    provider: str
    model_id: str
    display_name: str
    capabilities: List[Capability]


class ParameterRule(TypedDict):
    type: Literal['number', 'integer', 'string', 'boolean']
    minimum: NotRequired[float]
    maximum: NotRequired[float]
    enum: NotRequired[List[Union[str, float, bool]]]
    default: NotRequired[Union[str, float, bool]]


ToolConstraint = str


class Api050Response(TypedDict):
    models: List[ModelCapability]
    supported_params: Dict[str, Dict[str, ParameterRule]]
    tool_constraints: Dict[str, List[ToolConstraint]]


class Api051Request(TypedDict):
    provider: str
    model_id: str
    parameters: ModelParameters
    credential: NotRequired[str]
    confirm_cost: bool


class Api052Request(TypedDict):
    model_catalog_ref: str
    parameters: ModelParameters
    credential: NotRequired[str]
    revision: int


class Api052Response(TypedDict):
    provider: str
    model_name: str
    role: ModelRole
    credential_configured: bool
    revision: int


RequestedScope = str


class Api053Request(TypedDict):
    requested_scopes: List[RequestedScope]
    form_ref: str


class Api053Response(TypedDict):
    authorization_url: str


class Api057Request(TypedDict):
    target_ref: str
    confirmation: Literal[True]
    revision: int


class Api058Request(TypedDict):
    action: FormAction
    resource_ref: str
    request_ref: NotRequired[str]


class Api058Response(TypedDict):
    ticket_ref: str
    private_delivery_ref: str
    expires_at: str


class Api060Response(TypedDict):
    form_session_ref: str
    expires_at: str


class FormSubmission(TypedDict):
    revision: int
    confirmation: NotRequired[bool]


class Api062Response(TypedDict):
    status: str
    revision: int
    job_ref: NotRequired[str]


class Api064Request(TypedDict):
    ticket_ref: NotRequired[str]


class LogQuery(TypedDict):
    level: NotRequired[str]
    service: NotRequired[str]
    event_type: NotRequired[str]
    start_at: NotRequired[str]
    end_at: NotRequired[str]
    limit: NotRequired[int]
    cursor: NotRequired[str]


class TraceQuery(TypedDict):
    limit: NotRequired[int]
    cursor: NotRequired[str]


class Api027Response(TypedDict):
    items: List[SafeLogEvent]
    next_cursor: Optional[str]


class Api028Response(TypedDict):
    request_id: str
    trace_id: str
    events: List[SafeLogEvent]
    next_cursor: Optional[str]


class Api030Request(TypedDict):
    request_ref: str
    lease_ref: str
    idempotency_key: str


class Api030Response(TypedDict):
    request_id: str
    status: Literal['QUEUED', 'RUNNING']
    trace_id: str


class Api031Request(TypedDict):
    trigger_ref: str
    scheduled_at: str
    delivery_id: str
    lease_ref: str


class Firing(TypedDict):
    trigger_id: str
    request_id: NotRequired[str]
    status: str


class Api031Response(TypedDict):
    status: Literal['ACCEPTED', 'NO_MATCH', 'DUPLICATE']
    firings: List[Firing]
    trace_id: str


class BotIdPath(TypedDict):
    botId: str


class PlatformPath(TypedDict):
    platform: Platform


class ApprovalIdPath(TypedDict):
    approvalId: str


class JobIdPath(TypedDict):
    jobId: str


class RequestIdPath(TypedDict):
    requestId: str


class GrantIdPath(TypedDict):
    grantId: str


class SessionIdPath(TypedDict):
    sessionId: str


class BotIdAgentRolePath(TypedDict):
    botId: str
    agentRole: ModelRole


class AccountCallbackQuery1(TypedDict):
    code: str
    state: str


class AccountCallbackQuery2(TypedDict):
    error: str
    state: str


AccountCallbackQuery = Union[AccountCallbackQuery1, AccountCallbackQuery2]


class AccountIdPath(TypedDict):
    accountId: str


class ActionTicketPath(TypedDict):
    action: FormAction
    ticket: str


class FormIdPath(TypedDict):
    formId: str


class SafeScope(TypedDict):
    platforms: List[str]
    tool_ids: List[str]
    operations: List[str]
    resource_labels: List[str]
    audience: Audience
    expires_at: Optional[str]


class ModelSummary(TypedDict):
    provider: str
    model_name: str
    role: ModelRole
    credential_configured: bool


class FeatureSummary(TypedDict):
    enabled: bool
    release: Release
    count: Optional[int]
    reason_code: Optional[str]


class ConnectionSummary(TypedDict):
    connection_id: str
    bot_label: str
    status: str
    scope: SafeScope
    expires_at: Optional[str]


class RequestAcceptedResponse(TypedDict):
    request_id: str
    status: RequestStatus
    execution_mode: Mode
    trace_id: str


class Api033Response(TypedDict):
    request_id: str
    status: RequestStatus
    queue_position: Optional[int]
    execution_mode: Mode
    error_code: Optional[str]
    can_control: bool
    trace_id: str


class BotTransitionResponse(TypedDict):
    bot_id: str
    status: BotStatus
    trace_id: str


class ApprovalDecisionResponse(TypedDict):
    approval_id: str
    approval_type: ApprovalType
    status: ApprovalStatus
    activation_status: NotRequired[str]
    trace_id: str


class ConnectionDashboard(TypedDict):
    enabled: bool
    incoming: List[ConnectionSummary]
    outgoing: List[ConnectionSummary]
    pending_count: Optional[int]


class Item(TypedDict):
    bot_id: str
    name: str
    platform: Platform
    conversation_label: str
    status: BotStatus
    can_setup: Literal[True]
    model: Optional[ModelSummary]


class BotPage(TypedDict):
    items: List[Item]
    next_cursor: Optional[str]


class Api004Response(TypedDict):
    bot: BotSummary
    revision: int
    models: List[ModelSummary]
    sessions: List[Session]
    storage: StorageSummary
    health: HealthSummary
    requests: RequestCounts
    approvals: ApprovalCounts
    triggers: FeatureSummary
    connections: ConnectionDashboard
    command_sync: CommandSync


class Agent(TypedDict):
    role: ModelRole
    model: ModelSummary
    parameters: ModelParameters
    credential_configured: bool
    revision: int


class Api006Response(TypedDict):
    agents: List[Agent]
    supported_modes: List[Mode]


class Item1(TypedDict):
    grant_id: str
    tool_id: str
    scope: SafeScope
    status: GrantStatus
    expires_at: Optional[str]
    approval_required: bool


class ToolGrantPage(TypedDict):
    items: List[Item1]
    next_cursor: Optional[str]


class Api041Response(TypedDict):
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


class ReviewedJsonSchema2(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['object']
    properties: Dict[str, ReviewedJsonSchema]
    required: NotRequired[List[RequiredItem]]
    additionalProperties: Literal[False]


class ReviewedJsonSchema3(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    type: Literal['array']
    items: ReviewedJsonSchema
    minItems: NotRequired[int]
    maxItems: NotRequired[int]
    uniqueItems: NotRequired[bool]


class ReviewedJsonSchema4(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    anyOf: List[ReviewedJsonSchema]


class ReviewedJsonSchema5(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    oneOf: List[ReviewedJsonSchema]


ReviewedJsonSchema = Union[
    ReviewedJsonSchema1,
    ReviewedJsonSchema2,
    ReviewedJsonSchema3,
    ReviewedJsonSchema4,
    ReviewedJsonSchema5,
]


class Tool(TypedDict):
    tool_id: str
    version: str
    label: str
    operation: Literal['READ', 'WRITE']
    input_schema: ReviewedJsonSchema
    approval_required: bool
    sensitive: bool
    enabled: bool


class Api009Response(TypedDict):
    platform: Platform
    tools: List[Tool]


class Trigger(TypedDict):
    event_type: str
    label: str
    config_schema: ReviewedJsonSchema
    enabled: bool
    default_system: bool
    requires_approval: bool


class Api023Response(TypedDict):
    platform: Platform
    triggers: List[Trigger]


class Api061Response(TypedDict):
    action: FormAction
    fields: ReviewedJsonSchema
    expires_at: str
    revision: int


ApiContract = Union[
    LegacyHealthResponse,
    CanonicalError,
    Api017NotReadyResponse,
    Api001Response,
    EmptyBody,
    BotPage,
    Api004Response,
    Api005Request,
    Api005Response,
    Api006Response,
    Api007Response,
    AccountPage,
    Api009Response,
    ToolGrantPage,
    ApprovalPage,
    Api012Response,
    RequestPage,
    Api014Response,
    Api015Response,
    Api016Response,
    Api017ReadyResponse,
    Api018Response,
    Api019Request,
    Api020Request,
    Api020Response,
    Api023Response,
    Api027Response,
    Api028Response,
    Api030Request,
    Api030Response,
    Api031Request,
    Api031Response,
    Api032Request,
    RequestAcceptedResponse,
    Api033Response,
    BotTransitionResponse,
    ApprovalDecisionRequest,
    ApprovalDecisionResponse,
    Api040Request,
    GrantResponse,
    Api041Response,
    Api043Request,
    Api043Response,
    HealthSummary,
    ModeResponse,
    ModeRequest,
    Api047Request,
    Api048Request,
    ValidationChecks,
    Api049Request,
    Api049Response,
    Api050Response,
    Api051Request,
    Api052Request,
    Api052Response,
    Api053Request,
    Api053Response,
    AccountSummary,
    Api057Request,
    JobResponse,
    Api058Request,
    Api058Response,
    Api060Response,
    Api061Response,
    FormSubmission,
    Api062Response,
    Api064Request,
]
