# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Literal, NotRequired

from typing_extensions import TypedDict

type RequiredScope = str


class RateLimit(TypedDict, closed=True):
    max_calls: int
    window_ms: int


class ToolSpec(TypedDict, closed=True):
    tool_id: str
    version: Literal['1.0.0']
    provider_action: str
    operation: Literal['READ', 'WRITE']
    adapter: str
    input_schema_ref: str
    result_schema_ref: str
    required_scopes: list[RequiredScope]
    rate_limit: RateLimit


class ToolResult1(TypedDict, closed=True):
    status: Literal['success']
    data_ref: str
    source: str
    timestamp: str
    error_code: None
    retryable: Literal[False]


class ToolResult2(TypedDict, closed=True):
    status: Literal['failed']
    data_ref: None
    source: str
    timestamp: str
    error_code: Literal[
        'AUTH_REQUIRED',
        'INVALID_CREDENTIAL',
        'RATE_LIMITED',
        'UNAVAILABLE',
        'BAD_INPUT',
        'NOT_AUTHORIZED',
        'BUDGET_EXHAUSTED',
        'TIMEOUT',
        'INTERNAL_ERROR',
    ]
    retryable: bool


type ToolResult = ToolResult1 | ToolResult2


type ToolContract = ToolSpec | ToolResult


class GeneratorWrapper(TypedDict):
    value0: NotRequired[ToolSpec]
    value1: NotRequired[ToolResult]
    value2: NotRequired[ToolContract]
