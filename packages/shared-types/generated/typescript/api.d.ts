/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Mode".
 */
export type Mode = "normal" | "langgraph";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "InternalMode".
 */
export type InternalMode = "SIMPLE" | "MULTI_AGENT";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Audience".
 */
export type Audience = "PRIVATE" | "GROUP";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModelRole".
 */
export type ModelRole =
  "SIMPLE" | "ORCHESTRATOR" | "REVIEWER" | "DISCORD" | "LINE" | "GMAIL" | "GOOGLE_CALENDAR" | "GITHUB";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Release".
 */
export type Release = "P0" | "P1" | "P2";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Counts".
 */
export type Counts = RequestCounts | ApprovalCounts;
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "RequestStatus".
 */
export type RequestStatus =
  | "QUEUED"
  | "RUNNING"
  | "WAITING_APPROVAL"
  | "PAUSE_REQUESTED"
  | "PAUSED"
  | "CANCEL_REQUESTED"
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED"
  | "REJECTED"
  | "RECOVERY_REQUIRED";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotStatus".
 */
export type BotStatus =
  "UNCONFIGURED" | "PENDING_STORAGE" | "READY" | "STOPPED" | "DELETING" | "REMOVED" | "SETUP_DISABLED";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalType".
 */
export type ApprovalType = "TOOL_ACTION" | "TRIGGER_POLICY_CREATE" | "TRIGGER_POLICY_UPDATE";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalStatus".
 */
export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED" | "REVOKED" | "CONSUMED";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "OAuthCallbackQuery".
 */
export type OAuthCallbackQuery =
  | {
      code: string;
      state: string;
      iss?: string;
    }
  | {
      error: string;
      state: string;
      iss?: string;
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Platform".
 */
export type Platform = "DISCORD" | "LINE" | "GMAIL" | "GOOGLE_CALENDAR" | "GITHUB";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "GrantStatus".
 */
export type GrantStatus = "ACTIVE" | "REVOKED" | "EXPIRED";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "FormAction".
 */
export type FormAction =
  | "SETUP"
  | "GUILD_BOOTSTRAP"
  | "DM_ENROLLMENT"
  | "APPROVAL"
  | "ACCOUNT_CONSENT"
  | "BOT_CONNECTION"
  | "PEOPLE_EDIT"
  | "TRIGGER_POLICY"
  | "DELETION"
  | "TOOL_GRANT"
  | "MODEL_CONFIG"
  | "STORAGE_CONFIG";
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ScalarParameter".
 */
export type ScalarParameter = string | number | boolean;
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "JsonValue".
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {
      [k: string]: JsonValue | undefined;
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ReviewedJsonSchema".
 */
export type ReviewedJsonSchema =
  | {
      title?: string;
      description?: string;
      type: "string" | "boolean" | "number" | "integer" | "null";
      /**
       * @minItems 1
       */
      enum?: [string | boolean | number | null, ...(string | boolean | number | null)[]];
      const?: string | boolean | number | null;
      format?: "uuid" | "date-time" | "uri" | "email";
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      minimum?: number;
      maximum?: number;
    }
  | {
      title?: string;
      description?: string;
      type: "object";
      properties: {
        [k: string]: ReviewedJsonSchema | undefined;
      };
      required?: string[];
      additionalProperties: false;
    }
  | {
      title?: string;
      description?: string;
      type: "array";
      items: ReviewedJsonSchema;
      minItems?: number;
      maxItems?: number;
      uniqueItems?: boolean;
    }
  | {
      title?: string;
      description?: string;
      /**
       * @minItems 1
       */
      anyOf: [ReviewedJsonSchema, ...ReviewedJsonSchema[]];
    }
  | {
      title?: string;
      description?: string;
      /**
       * @minItems 1
       */
      oneOf: [ReviewedJsonSchema, ...ReviewedJsonSchema[]];
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api012Response".
 */
export type Api012Response =
  | {
      approval_id: string;
      status: ApprovalStatus;
      approval_type: "TOOL_ACTION";
      preview: ToolActionPreview;
      digest: string;
      expires_at: string;
      can_decide: boolean;
    }
  | {
      approval_id: string;
      status: ApprovalStatus;
      approval_type: "TRIGGER_POLICY_CREATE" | "TRIGGER_POLICY_UPDATE";
      preview: TriggerPolicyPreview;
      digest: string;
      expires_at: string;
      can_decide: boolean;
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "AccountCallbackQuery".
 */
export type AccountCallbackQuery =
  | {
      code: string;
      state: string;
    }
  | {
      error: string;
      state: string;
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApiContract".
 */
export type ApiContract =
  | LegacyHealthResponse
  | CanonicalError
  | Api017NotReadyResponse
  | Api001Response
  | EmptyBody
  | BotPage
  | Api004Response
  | Api005Request
  | Api005Response
  | Api006Response
  | Api007Response
  | AccountPage
  | Api009Response
  | ToolGrantPage
  | ApprovalPage
  | Api012Response
  | RequestPage
  | Api014Response
  | Api015Response
  | Api016Response
  | Api017ReadyResponse
  | Api018Response
  | Api019Request
  | Api020Request
  | Api020Response
  | Api023Response
  | Api027Response
  | Api028Response
  | Api030Request
  | Api030Response
  | Api031Request
  | Api031Response
  | Api032Request
  | RequestAcceptedResponse
  | Api033Response
  | BotTransitionResponse
  | ApprovalDecisionRequest
  | ApprovalDecisionResponse
  | Api040Request
  | GrantResponse
  | Api041Response
  | Api043Request
  | Api043Response
  | HealthSummary
  | ModeResponse
  | ModeRequest
  | Api047Request
  | Api048Request
  | ValidationChecks
  | Api049Request
  | Api049Response
  | Api050Response
  | Api051Request
  | Api052Request
  | Api052Response
  | Api053Request
  | Api053Response
  | AccountSummary
  | Api057Request
  | JobResponse
  | Api058Request
  | Api058Response
  | Api060Response
  | Api061Response
  | FormSubmission
  | Api062Response
  | Api064Request;

export interface GeneratorWrapper {
  value0?: LegacyHealthResponse;
  value1?: FieldError;
  value2?: CanonicalError;
  value3?: Mode;
  value4?: InternalMode;
  value5?: SafeScope;
  value6?: ModelSummary;
  value7?: HealthSummary;
  value8?: FeatureSummary;
  value9?: StorageSummary;
  value10?: ConnectionSummary;
  value11?: RequestCounts;
  value12?: ApprovalCounts;
  value13?: Counts;
  value14?: EmptyBody;
  value15?: Api001Response;
  value16?: Api005Request;
  value17?: Api014Response;
  value18?: Api015Response;
  value19?: Api016Response;
  value20?: Api017ReadyResponse;
  value21?: Api017NotReadyResponse;
  value22?: Api018Response;
  value23?: Api019Request;
  value24?: Api032Request;
  value25?: RequestAcceptedResponse;
  value26?: Api033Response;
  value27?: BotTransitionResponse;
  value28?: ApprovalDecisionRequest;
  value29?: ApprovalDecisionResponse;
  value30?: ModeResponse;
  value31?: ModeRequest;
  value32?: GrantResponse;
  value33?: Api048Request;
  value34?: Api049Request;
  value35?: Api049Response;
  value36?: JobResponse;
  value37?: OAuthCallbackQuery;
  value38?: Platform;
  value39?: Release;
  value40?: ModelRole;
  value41?: BotStatus;
  value42?: RequestStatus;
  value43?: ApprovalType;
  value44?: Audience;
  value45?: GrantStatus;
  value46?: ApprovalStatus;
  value47?: FormAction;
  value48?: ScalarParameter;
  value49?: JsonValue;
  value50?: ModelParameters;
  value51?: ReviewedJsonSchema;
  value52?: BotSummary;
  value53?: CommandSync;
  value54?: ConnectionDashboard;
  value55?: SafePreview;
  value56?: ToolActionPreview;
  value57?: TriggerPolicyPreview;
  value58?: SafeLogEvent;
  value59?: BotPage;
  value60?: Api004Response;
  value61?: Api005Response;
  value62?: Api006Response;
  value63?: Api007Response;
  value64?: AccountSummary;
  value65?: AccountPage;
  value66?: Api009Response;
  value67?: ToolGrantPage;
  value68?: ApprovalPage;
  value69?: Api012Response;
  value70?: RequestPage;
  value71?: Api020Request;
  value72?: Api020Response;
  value73?: Api023Response;
  value74?: Api040Request;
  value75?: Api041Response;
  value76?: Api043Request;
  value77?: Api043Response;
  value78?: Api047Request;
  value79?: ValidationChecks;
  value80?: ModelCapability;
  value81?: ParameterRule;
  value82?: Api050Response;
  value83?: Api051Request;
  value84?: Api052Request;
  value85?: Api052Response;
  value86?: Api053Request;
  value87?: Api053Response;
  value88?: Api057Request;
  value89?: Api058Request;
  value90?: Api058Response;
  value91?: Api060Response;
  value92?: Api061Response;
  value93?: FormSubmission;
  value94?: Api062Response;
  value95?: Api064Request;
  value96?: LogQuery;
  value97?: TraceQuery;
  value98?: Api027Response;
  value99?: Api028Response;
  value100?: Api030Request;
  value101?: Api030Response;
  value102?: Api031Request;
  value103?: Api031Response;
  value104?: BotIdPath;
  value105?: PlatformPath;
  value106?: ApprovalIdPath;
  value107?: JobIdPath;
  value108?: RequestIdPath;
  value109?: GrantIdPath;
  value110?: SessionIdPath;
  value111?: BotIdAgentRolePath;
  value112?: AccountCallbackQuery;
  value113?: AccountIdPath;
  value114?: ActionTicketPath;
  value115?: FormIdPath;
  value116?: ApiContract;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "LegacyHealthResponse".
 */
export interface LegacyHealthResponse {
  status: "ok";
  service: "api";
  readiness: "scaffold";
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "FieldError".
 */
export interface FieldError {
  field: string;
  message: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "CanonicalError".
 */
export interface CanonicalError {
  code: string;
  message: string;
  field_errors: FieldError[];
  trace_id: string;
  retryable: boolean;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "SafeScope".
 */
export interface SafeScope {
  platforms: string[];
  tool_ids: string[];
  operations: string[];
  resource_labels: string[];
  audience: Audience;
  expires_at: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModelSummary".
 */
export interface ModelSummary {
  provider: string;
  model_name: string;
  role: ModelRole;
  credential_configured: boolean;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "HealthSummary".
 */
export interface HealthSummary {
  status: string;
  components: {
    name: string;
    status: string;
  }[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "FeatureSummary".
 */
export interface FeatureSummary {
  enabled: boolean;
  release: Release;
  count: number | null;
  reason_code: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "StorageSummary".
 */
export interface StorageSummary {
  managed_selected: boolean;
  app_data: {
    location: "HOSTED" | null;
    status: string;
  };
  checkpoint: {
    location: "HOSTED" | null;
    status: string;
  };
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ConnectionSummary".
 */
export interface ConnectionSummary {
  connection_id: string;
  bot_label: string;
  status: string;
  scope: SafeScope;
  expires_at: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "RequestCounts".
 */
export interface RequestCounts {
  queued: number;
  running: number;
  waiting_approval: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalCounts".
 */
export interface ApprovalCounts {
  pending: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "EmptyBody".
 */
export interface EmptyBody {}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api001Response".
 */
export interface Api001Response {
  user_ref: string;
  display_name: string | null;
  platform: "DISCORD";
  expires_at: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api005Request".
 */
export interface Api005Request {
  name: string;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api014Response".
 */
export interface Api014Response {
  managed_selected: boolean;
  app_data: {
    location: "HOSTED" | null;
    status: string;
  };
  checkpoint: {
    location: "HOSTED" | null;
    status: string;
  };
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api015Response".
 */
export interface Api015Response {
  job_id: string;
  status: string;
  completed_classes: string[];
  pending_classes: string[];
  error_code: string | null;
  updated_at: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api016Response".
 */
export interface Api016Response {
  status: "UP";
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api017ReadyResponse".
 */
export interface Api017ReadyResponse {
  status: "READY";
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api017NotReadyResponse".
 */
export interface Api017NotReadyResponse {
  status: "NOT_READY";
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api018Response".
 */
export interface Api018Response {
  enabled: boolean;
  export_mode: "OFF" | "METADATA_ONLY";
  key_configured: boolean;
  workspace: string | null;
  project: string | null;
  destination_label: string | null;
  retention_notice: string | null;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api019Request".
 */
export interface Api019Request {
  enabled: boolean;
  export_mode: "OFF" | "METADATA_ONLY";
  workspace?: string;
  project?: string;
  endpoint?: string;
  api_key?: string;
  remove_key?: boolean;
  consent_confirmed?: boolean;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api032Request".
 */
export interface Api032Request {
  session_ref: string;
  message: string;
  client_event_ref: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "RequestAcceptedResponse".
 */
export interface RequestAcceptedResponse {
  request_id: string;
  status: RequestStatus;
  execution_mode: Mode;
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api033Response".
 */
export interface Api033Response {
  request_id: string;
  status: RequestStatus;
  queue_position: number | null;
  execution_mode: Mode;
  error_code: string | null;
  can_control: boolean;
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotTransitionResponse".
 */
export interface BotTransitionResponse {
  bot_id: string;
  status: BotStatus;
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalDecisionRequest".
 */
export interface ApprovalDecisionRequest {
  decision: "APPROVE" | "REJECT";
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalDecisionResponse".
 */
export interface ApprovalDecisionResponse {
  approval_id: string;
  approval_type: ApprovalType;
  status: ApprovalStatus;
  activation_status?: string;
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModeResponse".
 */
export interface ModeResponse {
  current_mode: Mode;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModeRequest".
 */
export interface ModeRequest {
  mode: Mode;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "GrantResponse".
 */
export interface GrantResponse {
  grant_id: string;
  status: string;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api048Request".
 */
export interface Api048Request {
  managed_selected: boolean;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api049Request".
 */
export interface Api049Request {
  managed_selected: boolean;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api049Response".
 */
export interface Api049Response {
  managed_selected: boolean;
  app_data: {
    location: "HOSTED" | null;
    status: string;
  };
  checkpoint: {
    location: "HOSTED" | null;
    status: string;
  };
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "JobResponse".
 */
export interface JobResponse {
  job_id: string;
  status: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModelParameters".
 */
export interface ModelParameters {
  [k: string]: ScalarParameter | undefined;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotSummary".
 */
export interface BotSummary {
  bot_id: string;
  name: string;
  platform: Platform;
  status: BotStatus;
  conversation_label: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "CommandSync".
 */
export interface CommandSync {
  status: "PENDING" | "SYNCED" | "FALLBACK";
  reason_code: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ConnectionDashboard".
 */
export interface ConnectionDashboard {
  enabled: boolean;
  incoming: ConnectionSummary[];
  outgoing: ConnectionSummary[];
  pending_count: number | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "SafePreview".
 */
export interface SafePreview {
  field: string;
  before: string | null;
  after: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ToolActionPreview".
 */
export interface ToolActionPreview {
  tool_id: string;
  version: string;
  operation: string;
  target: string;
  changes: SafePreview[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "TriggerPolicyPreview".
 */
export interface TriggerPolicyPreview {
  event_type: string;
  filters: {
    [k: string]: ScalarParameter | undefined;
  };
  account: string;
  resource: string;
  action: string;
  argument_bounds: {
    [k: string]: ScalarParameter | undefined;
  };
  destination: string;
  audience: Audience;
  recurrence: string | null;
  timezone: string | null;
  expires_at: string;
  quota: number;
  policy_revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "SafeLogEvent".
 */
export interface SafeLogEvent {
  timestamp: string;
  level: string;
  service: string;
  event_type: string;
  trace_id: string;
  reason_code: string | null;
  safe_metadata: {
    [k: string]: ScalarParameter | null | undefined;
  };
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotPage".
 */
export interface BotPage {
  /**
   * @maxItems 50
   */
  items: {
    bot_id: string;
    name: string;
    platform: Platform;
    conversation_label: string;
    status: BotStatus;
    can_setup: true;
    model: ModelSummary | null;
  }[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api004Response".
 */
export interface Api004Response {
  bot: BotSummary;
  revision: number;
  models: ModelSummary[];
  sessions: {
    session_ref: string;
    execution_mode: Mode;
  }[];
  storage: StorageSummary;
  health: HealthSummary;
  requests: RequestCounts;
  approvals: ApprovalCounts;
  triggers: FeatureSummary;
  connections: ConnectionDashboard;
  command_sync: CommandSync;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api005Response".
 */
export interface Api005Response {
  bot: BotSummary;
  revision: number;
  command_sync: CommandSync;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api006Response".
 */
export interface Api006Response {
  agents: {
    role: ModelRole;
    model: ModelSummary;
    parameters: ModelParameters;
    credential_configured: boolean;
    revision: number;
  }[];
  supported_modes: Mode[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api007Response".
 */
export interface Api007Response {
  platforms: {
    platform: Platform;
    label: string;
    release: Release;
    enabled: boolean;
    setup_available: boolean;
    reason_code: string | null;
  }[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "AccountSummary".
 */
export interface AccountSummary {
  account_ref: string;
  platform: Platform;
  label: string | null;
  status: "PENDING" | "ACTIVE" | "REVOKED" | "UNAVAILABLE";
  visible_scopes: string[];
  audience: Audience;
  can_revoke: boolean;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "AccountPage".
 */
export interface AccountPage {
  /**
   * @maxItems 50
   */
  items: AccountSummary[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api009Response".
 */
export interface Api009Response {
  platform: Platform;
  tools: {
    tool_id: string;
    version: string;
    label: string;
    operation: "READ" | "WRITE";
    input_schema: ReviewedJsonSchema;
    approval_required: boolean;
    sensitive: boolean;
    enabled: boolean;
  }[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ToolGrantPage".
 */
export interface ToolGrantPage {
  /**
   * @maxItems 50
   */
  items: {
    grant_id: string;
    tool_id: string;
    scope: SafeScope;
    status: GrantStatus;
    expires_at: string | null;
    approval_required: boolean;
  }[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalPage".
 */
export interface ApprovalPage {
  /**
   * @maxItems 50
   */
  items: {
    approval_id: string;
    request_ref: string | null;
    approval_type: ApprovalType;
    operation_label: string;
    status: ApprovalStatus;
    expires_at: string;
    can_decide: boolean;
  }[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "RequestPage".
 */
export interface RequestPage {
  /**
   * @maxItems 50
   */
  items: {
    request_id: string;
    status: RequestStatus;
    queue_position: number | null;
    execution_mode: Mode;
    created_at: string;
    error_code: string | null;
    can_control: boolean;
  }[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api020Request".
 */
export interface Api020Request {
  request_ref: string;
  step_id: string;
  tool_id: string;
  tool_version: string;
  arguments: {
    [k: string]: JsonValue | undefined;
  };
  action_ref?: string;
  idempotency_key: string;
  lease_ref: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api020Response".
 */
export interface Api020Response {
  status: "SUCCEEDED" | "FAILED" | "APPROVAL_REQUIRED";
  result?: JsonValue;
  approval_ref?: string;
  error_code?: string;
  retryable: boolean;
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api023Response".
 */
export interface Api023Response {
  platform: Platform;
  triggers: {
    event_type: string;
    label: string;
    config_schema: ReviewedJsonSchema;
    enabled: boolean;
    default_system: boolean;
    requires_approval: boolean;
  }[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api040Request".
 */
export interface Api040Request {
  tool_id: string;
  resource_ref: string;
  /**
   * @minItems 1
   */
  operation_set: [string, ...string[]];
  audience: Audience;
  expires_at: string;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api041Response".
 */
export interface Api041Response {
  grant_id: string;
  scope: SafeScope;
  status: GrantStatus;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api043Request".
 */
export interface Api043Request {
  session_ref: string;
  resource_ref: string;
  /**
   * @minItems 1
   */
  allowed_read_operations: [string, ...string[]];
  audience: Audience;
  expires_at: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api043Response".
 */
export interface Api043Response {
  consent_id: string;
  status: GrantStatus;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api047Request".
 */
export interface Api047Request {
  operation: "GRANT" | "REVOKE";
  grantee_ref: string;
  expected_revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ValidationChecks".
 */
export interface ValidationChecks {
  valid: boolean;
  checks: string[];
  warnings: string[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ModelCapability".
 */
export interface ModelCapability {
  model_catalog_ref: string;
  provider: string;
  model_id: string;
  display_name: string;
  capabilities: string[];
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ParameterRule".
 */
export interface ParameterRule {
  type: "number" | "integer" | "string" | "boolean";
  minimum?: number;
  maximum?: number;
  /**
   * @minItems 1
   */
  enum?: [string | number | boolean, ...(string | number | boolean)[]];
  default?: string | number | boolean;
}
/**
 * Parameter rules and tool constraints are keyed by model catalogue UUID.
 *
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api050Response".
 */
export interface Api050Response {
  models: ModelCapability[];
  supported_params: {
    [k: string]: {
      [k: string]: ParameterRule | undefined;
    };
  };
  tool_constraints: {
    [k: string]: string[] | undefined;
  };
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api051Request".
 */
export interface Api051Request {
  provider: string;
  model_id: string;
  parameters: ModelParameters;
  credential?: string;
  confirm_cost: boolean;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api052Request".
 */
export interface Api052Request {
  model_catalog_ref: string;
  parameters: ModelParameters;
  credential?: string;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api052Response".
 */
export interface Api052Response {
  provider: string;
  model_name: string;
  role: ModelRole;
  credential_configured: boolean;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api053Request".
 */
export interface Api053Request {
  /**
   * @minItems 1
   */
  requested_scopes: [string, ...string[]];
  form_ref: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api053Response".
 */
export interface Api053Response {
  authorization_url: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api057Request".
 */
export interface Api057Request {
  target_ref: string;
  confirmation: true;
  revision: number;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api058Request".
 */
export interface Api058Request {
  action: FormAction;
  resource_ref: string;
  request_ref?: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api058Response".
 */
export interface Api058Response {
  ticket_ref: string;
  private_delivery_ref: string;
  expires_at: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api060Response".
 */
export interface Api060Response {
  form_session_ref: string;
  expires_at: string;
}
/**
 * fields is the reviewed JSON Schema describing the fields allowed by this bound form.
 *
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api061Response".
 */
export interface Api061Response {
  action: FormAction;
  fields: ReviewedJsonSchema;
  expires_at: string;
  revision: number;
}
/**
 * Flat submission. The server must validate all fields, including confirmation, against the bound local submit schema.
 *
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "FormSubmission".
 */
export interface FormSubmission {
  revision: number;
  confirmation?: boolean;
  [k: string]: JsonValue | undefined;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api062Response".
 */
export interface Api062Response {
  status: string;
  revision: number;
  job_ref?: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api064Request".
 */
export interface Api064Request {
  ticket_ref?: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "LogQuery".
 */
export interface LogQuery {
  level?: string;
  service?: string;
  event_type?: string;
  start_at?: string;
  end_at?: string;
  limit?: number;
  cursor?: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "TraceQuery".
 */
export interface TraceQuery {
  limit?: number;
  cursor?: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api027Response".
 */
export interface Api027Response {
  /**
   * @maxItems 100
   */
  items: SafeLogEvent[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api028Response".
 */
export interface Api028Response {
  request_id: string;
  trace_id: string;
  /**
   * @maxItems 100
   */
  events: SafeLogEvent[];
  next_cursor: string | null;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api030Request".
 */
export interface Api030Request {
  request_ref: string;
  lease_ref: string;
  idempotency_key: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api030Response".
 */
export interface Api030Response {
  request_id: string;
  status: "QUEUED" | "RUNNING";
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api031Request".
 */
export interface Api031Request {
  trigger_ref: string;
  scheduled_at: string;
  delivery_id: string;
  lease_ref: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "Api031Response".
 */
export interface Api031Response {
  status: "ACCEPTED" | "NO_MATCH" | "DUPLICATE";
  firings: {
    trigger_id: string;
    request_id?: string;
    status: string;
  }[];
  trace_id: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotIdPath".
 */
export interface BotIdPath {
  botId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "PlatformPath".
 */
export interface PlatformPath {
  platform: Platform;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ApprovalIdPath".
 */
export interface ApprovalIdPath {
  approvalId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "JobIdPath".
 */
export interface JobIdPath {
  jobId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "RequestIdPath".
 */
export interface RequestIdPath {
  requestId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "GrantIdPath".
 */
export interface GrantIdPath {
  grantId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "SessionIdPath".
 */
export interface SessionIdPath {
  sessionId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "BotIdAgentRolePath".
 */
export interface BotIdAgentRolePath {
  botId: string;
  agentRole: ModelRole;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "AccountIdPath".
 */
export interface AccountIdPath {
  accountId: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ActionTicketPath".
 */
export interface ActionTicketPath {
  action: FormAction;
  ticket: string;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "FormIdPath".
 */
export interface FormIdPath {
  formId: string;
}
