export interface BudgetContract {
  schema_version: "1.0.0";
  currency: "THB";
  timezone: "Asia/Bangkok";
  monthly_cash_cap: number;
  protected_reserve: number;
  operating_cap: number;
  inference_cap: number;
  hosting_cap: number;
  paid_upgrades: number;
  max_llm_calls_per_run: number;
  max_input_tokens_per_run: number;
  max_output_tokens_per_run: number;
  max_platform_subtasks_per_run: number;
  max_tool_calls_per_run: number;
  max_retries_per_run: number;
  warning_percent: number;
  funded_runs_per_month: number;
  funded_runs_per_day: number;
  user_monthly_cap: number;
  tracing_enabled: false;
}
