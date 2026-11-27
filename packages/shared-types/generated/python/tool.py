# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import List, Literal, NotRequired, TypedDict, Union

RequiredScope = str


class RateLimit(TypedDict):
    max_calls: int
    window_ms: int


class ToolSpec(TypedDict):
    tool_id: str
    version: Literal['1.0.0']
    provider_action: str
    operation: Literal['READ', 'WRITE']
    adapter: str
    input_schema_ref: str
    result_schema_ref: str
    required_scopes: List[RequiredScope]
    rate_limit: RateLimit


class ToolResult1(TypedDict):
    status: Literal['success']
    data_ref: str
    source: str
    timestamp: str
    error_code: None
    retryable: Literal[False]


class ToolResult2(TypedDict):
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


ToolResult = Union[ToolResult1, ToolResult2]


ToolContract = Union[ToolSpec, ToolResult]


class GeneratorWrapper(TypedDict):
    value0: NotRequired[ToolSpec]
    value1: NotRequired[ToolResult]
    value2: NotRequired[ToolContract]
