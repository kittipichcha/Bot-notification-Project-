# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Literal, TypedDict


class BudgetContract(TypedDict):
    schema_version: Literal['1.0.0']
    currency: Literal['THB']
    timezone: Literal['Asia/Bangkok']
    monthly_cash_cap: float
    protected_reserve: float
    operating_cap: float
    inference_cap: float
    hosting_cap: float
    paid_upgrades: float
    max_llm_calls_per_run: int
    max_input_tokens_per_run: int
    max_output_tokens_per_run: int
    max_platform_subtasks_per_run: int
    max_tool_calls_per_run: int
    max_retries_per_run: int
    warning_percent: float
    funded_runs_per_month: int
    funded_runs_per_day: int
    user_monthly_cap: int
    tracing_enabled: Literal[False]
