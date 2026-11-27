# Generated from canonical JSON Schema.

from __future__ import annotations

from typing import List, Literal, NotRequired, TypedDict, Union


class Payload(TypedDict):
    text: str


class ExtraResponse(TypedDict):
    kind: Literal['TEXT']
    payload: Payload


class Field(TypedDict):
    name: str
    value: str


class Payload1(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]
    source_refs: NotRequired[List[str]]


class ExtraResponse1(TypedDict):
    kind: Literal['EMBED']
    payload: Payload1


class Payload2(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]
    source_refs: NotRequired[List[str]]


class ExtraResponse2(TypedDict):
    kind: Literal['RESULT_CARD']
    payload: Payload2


class Payload3(TypedDict):
    label: str
    action_ref: str
    preview: str
    expiry: str


class ExtraResponse3(TypedDict):
    kind: Literal['APPROVAL_BUTTON']
    payload: Payload3


class Payload4(TypedDict):
    label: str
    transaction_ref: str


class ExtraResponse4(TypedDict):
    kind: Literal['PRIVATE_FORM_LINK']
    payload: Payload4


class Payload5(TypedDict):
    error_code: str
    text: str
    retryable: NotRequired[bool]


class ExtraResponse5(TypedDict):
    kind: Literal['ERROR_NOTICE']
    payload: Payload5


class FinalResponse(TypedDict):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: List[
        Union[
            ExtraResponse,
            ExtraResponse1,
            ExtraResponse2,
            ExtraResponse3,
            ExtraResponse4,
            ExtraResponse5,
        ]
    ]
    source_refs: List[str]
    stale: bool
    error_code: NotRequired[str]


class Payload6(TypedDict):
    text: str


class ExtraResponse6(TypedDict):
    kind: Literal['TEXT']
    payload: Payload6


class Payload7(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]
    source_refs: NotRequired[List[str]]


class ExtraResponse7(TypedDict):
    kind: Literal['EMBED']
    payload: Payload7


class Payload8(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]
    source_refs: NotRequired[List[str]]


class ExtraResponse8(TypedDict):
    kind: Literal['RESULT_CARD']
    payload: Payload8


class Payload9(TypedDict):
    label: str
    action_ref: str
    preview: str
    expiry: str


class ExtraResponse9(TypedDict):
    kind: Literal['APPROVAL_BUTTON']
    payload: Payload9


class Payload10(TypedDict):
    label: str
    transaction_ref: str


class ExtraResponse10(TypedDict):
    kind: Literal['PRIVATE_FORM_LINK']
    payload: Payload10


class Payload11(TypedDict):
    error_code: str
    text: str
    retryable: NotRequired[bool]


class ExtraResponse11(TypedDict):
    kind: Literal['ERROR_NOTICE']
    payload: Payload11


class FinalResponse1(TypedDict):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: List[
        Union[
            ExtraResponse6,
            ExtraResponse7,
            ExtraResponse8,
            ExtraResponse9,
            ExtraResponse10,
            ExtraResponse11,
        ]
    ]
    source_refs: List[str]
    stale: bool
    error_code: NotRequired[str]


class Payload12(TypedDict):
    text: str


class ExtraResponse12(TypedDict):
    kind: Literal['TEXT']
    payload: Payload12


class Payload13(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]


class ExtraResponse13(TypedDict):
    kind: Literal['EMBED']
    payload: Payload13


class Payload14(TypedDict):
    title: NotRequired[str]
    description: NotRequired[str]
    fields: NotRequired[List[Field]]


class ExtraResponse14(TypedDict):
    kind: Literal['RESULT_CARD']
    payload: Payload14


class ModelResponseProposal(TypedDict):
    text: str
    status: Literal[
        'SUCCESS', 'PARTIAL', 'FAILED', 'WAITING_APPROVAL', 'NEED_DISCUSSION'
    ]
    extra_response: List[Union[ExtraResponse12, ExtraResponse13, ExtraResponse14]]
