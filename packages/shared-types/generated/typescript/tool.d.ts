/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ToolResult".
 */
export type ToolResult =
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
    };
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ToolContract".
 */
export type ToolContract = ToolSpec | ToolResult;

export interface GeneratorWrapper {
  value0?: ToolSpec;
  value1?: ToolResult;
  value2?: ToolContract;
  [k: string]: unknown | undefined;
}
/**
 * This interface was referenced by `GeneratorWrapper`'s JSON-Schema
 * via the `definition` "ToolSpec".
 */
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
