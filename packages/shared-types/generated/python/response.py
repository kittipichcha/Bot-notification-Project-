# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import Literal, NotRequired

from typing_extensions import TypedDict


class Payload(TypedDict, closed=True):
    text: str


class ExtraResponse(TypedDict, closed=True):
    kind: Literal['TEXT']
    payload: Payload


class Field(TypedDict, closed=True):
    name: str
    value: str


class Payload1(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]
    source_refs: NotRequired[list[str]]


class ExtraResponse1(TypedDict, closed=True):
    kind: Literal['EMBED']
    payload: Payload1


class Payload2(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]
    source_refs: NotRequired[list[str]]


class ExtraResponse2(TypedDict, closed=True):
    kind: Literal['RESULT_CARD']
    payload: Payload2


class Payload3(TypedDict, closed=True):
    label: str
    action_ref: str
    preview: str
    expiry: str


class ExtraResponse3(TypedDict, closed=True):
    kind: Literal['APPROVAL_BUTTON']
    payload: Payload3


class Payload4(TypedDict, closed=True):
    label: str
    transaction_ref: str


class ExtraResponse4(TypedDict, closed=True):
    kind: Literal['PRIVATE_FORM_LINK']
    payload: Payload4


class Payload5(TypedDict, closed=True):
    error_code: str
    text: str
    retryable: NotRequired[bool]


class ExtraResponse5(TypedDict, closed=True):
    kind: Literal['ERROR_NOTICE']
    payload: Payload5


class FinalResponse(TypedDict, closed=True):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: list[
        ExtraResponse
        | ExtraResponse1
        | ExtraResponse2
        | ExtraResponse3
        | ExtraResponse4
        | ExtraResponse5
    ]
    source_refs: list[str]
    stale: bool
    error_code: NotRequired[str]


class Payload6(TypedDict, closed=True):
    text: str


class ExtraResponse6(TypedDict, closed=True):
    kind: Literal['TEXT']
    payload: Payload6


class Payload7(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]
    source_refs: NotRequired[list[str]]


class ExtraResponse7(TypedDict, closed=True):
    kind: Literal['EMBED']
    payload: Payload7


class Payload8(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]
    source_refs: NotRequired[list[str]]


class ExtraResponse8(TypedDict, closed=True):
    kind: Literal['RESULT_CARD']
    payload: Payload8


class Payload9(TypedDict, closed=True):
    label: str
    action_ref: str
    preview: str
    expiry: str


class ExtraResponse9(TypedDict, closed=True):
    kind: Literal['APPROVAL_BUTTON']
    payload: Payload9


class Payload10(TypedDict, closed=True):
    label: str
    transaction_ref: str


class ExtraResponse10(TypedDict, closed=True):
    kind: Literal['PRIVATE_FORM_LINK']
    payload: Payload10


class Payload11(TypedDict, closed=True):
    error_code: str
    text: str
    retryable: NotRequired[bool]


class ExtraResponse11(TypedDict, closed=True):
    kind: Literal['ERROR_NOTICE']
    payload: Payload11


class FinalResponse1(TypedDict, closed=True):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: list[
        ExtraResponse6
        | ExtraResponse7
        | ExtraResponse8
        | ExtraResponse9
        | ExtraResponse10
        | ExtraResponse11
    ]
    source_refs: list[str]
    stale: bool
    error_code: NotRequired[str]


class Payload12(TypedDict, closed=True):
    text: str


class ExtraResponse12(TypedDict, closed=True):
    kind: Literal['TEXT']
    payload: Payload12


class Payload13(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]


class ExtraResponse13(TypedDict, closed=True):
    kind: Literal['EMBED']
    payload: Payload13


class Payload14(TypedDict, closed=True):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[list[Field]]


class ExtraResponse14(TypedDict, closed=True):
    kind: Literal['RESULT_CARD']
    payload: Payload14


class ModelResponseProposal(TypedDict, closed=True):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: list[ExtraResponse12 | ExtraResponse13 | ExtraResponse14]
