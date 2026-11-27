export interface PolicyContract {
  schema_version: "1.0.0";
  release: "P0" | "P1" | "P2";
  tool: {
    default_access: "DENY";
  };
  trigger: {
    personal_watches_by_default: false;
    ignore_own_messages: true;
    schedule_enabled: boolean;
    schedule_limits?: {
      min_interval_ms: number;
      max_runs: number;
    };
    deduplicate_events: true;
  };
  model: {
    allowed_models: {
      provider: string;
      model: string;
      capabilities: string[];
      parameter_rules: {
        [k: string]: {
          type: "number" | "integer" | "string" | "boolean";
          minimum?: number;
          maximum?: number;
          /**
           * @minItems 1
           */
          enum?: [string | number | boolean, ...(string | number | boolean)[]];
          default?: string | number | boolean;
        };
      };
    }[];
  };
  agent: {
    default_mode: "SIMPLE" | "MULTI_AGENT";
    enabled_modes: ("SIMPLE" | "MULTI_AGENT")[];
    role_definitions: {
      [k: string]: {
        graph_mode: "SIMPLE" | "MULTI_AGENT";
        capabilities: string[];
      };
    };
    max_model_calls: number;
  };
  request: {
    execution_enabled: boolean;
    deadline_ms?: number;
    retry_policy: {
      model_retries: number;
      tool_retries: number;
      backoff_ms?: number;
    };
  };
  approval: {
    enabled: boolean;
    mutation_policy: "EXACT_ACTION";
    action_expiry_ms?: number;
  };
  bot_connection: {
    enabled_modes: ("SAME_BOT" | "CROSS_BOT_READ")[];
    cross_bot_policy?: {
      operation: "READ";
      max_hops: 1;
    };
    invitation_max_age_ms?: number;
  };
  response: {
    supported_components: (
      "TEXT" | "EMBED" | "RESULT_CARD" | "APPROVAL_BUTTON" | "PRIVATE_FORM_LINK" | "ERROR_NOTICE"
    )[];
  };
}
