/**
 * This interface was referenced by `PlatformContract`'s JSON-Schema
 * via the `definition` "__catalog_tool".
 */
export type ToolContract =
  | ToolSpec
  | (
      | {
          status: "success";
          data_ref: string;
          source: string;
          timestamp: string;
          error_code: null;
          retryable: false;
        }
      | {
          status: "failed";
          data_ref: null;
          source: string;
          timestamp: string;
          error_code:
            | "AUTH_REQUIRED"
            | "INVALID_CREDENTIAL"
            | "RATE_LIMITED"
            | "UNAVAILABLE"
            | "BAD_INPUT"
            | "NOT_AUTHORIZED"
            | "BUDGET_EXHAUSTED"
            | "TIMEOUT"
            | "INTERNAL_ERROR";
          retryable: boolean;
        }
    );

export interface PlatformContract {
  schema_version: "1.0.0";
  platforms: {
    platform_key: string;
    display_name: string;
    enabled: boolean;
    capabilities: {
      setup: boolean;
      invoke: boolean;
      connection: boolean;
      tool: boolean;
      trigger: boolean;
      response: boolean;
    };
    setup_flow: {
      adapter: string | null;
      status: string | null;
      permission: string | null;
      bootstrap: string | null;
    };
    invoke_adapter: string | null;
    connection_adapter: string | null;
    trigger_adapter: string | null;
    response_adapter: string | null;
    scheduler_support: boolean;
    supported_response_components: (
      "TEXT" | "EMBED" | "RESULT_CARD" | "APPROVAL_BUTTON" | "PRIVATE_FORM_LINK" | "ERROR_NOTICE"
    )[];
    tool_registry: {
      adapter: string | null;
      tools: ToolSpec[];
    };
    oauth_requirements: {
      required: boolean;
      scopes: string[];
    };
    event_source_type: "gateway" | "webhook" | "composio" | "none";
    default_event_policy: TriggerContract[];
    release: "P0" | "P1" | "P2";
  }[];
}
export interface ToolSpec {
  tool_id: string;
  version: "1.0.0";
  provider_action: string;
  operation: "READ" | "WRITE";
  adapter: string;
  input_schema_ref: string;
  result_schema_ref: string;
  required_scopes: string[];
  rate_limit: {
    max_calls: number;
    window_ms: number;
  };
}
/**
 * This interface was referenced by `PlatformContract`'s JSON-Schema
 * via the `definition` "__catalog_trigger".
 */
export interface TriggerContract {
  event_slug: string;
  source: "gateway" | "webhook" | "composio" | "none";
  payload_schema_ref: string;
  filters: {};
  eligible_roles: ("ADMIN" | "MEMBER")[];
  default_on_action: ("help" | "setup" | "mention" | "approval" | "removal" | "status") | null;
  filter_schema_ref: string;
}
