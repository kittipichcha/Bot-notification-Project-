import type { ApiContract, PlatformContract, TriggerContract, ToolContract, FinalResponse, BudgetContract, PolicyContract } from '../../packages/shared-types/generated/typescript';
export type Contracts = [ApiContract, PlatformContract, TriggerContract, ToolContract, FinalResponse, BudgetContract, PolicyContract];

import type { RequestPage, BotIdPath } from '../../packages/shared-types/generated/typescript/api';
const api: RequestPage = {items: [], next_cursor: null};
const rootApi: ApiContract = api;
const pathDto: BotIdPath = {botId: '00000000-0000-4000-8000-000000000001'};
void [rootApi, pathDto];

import type { ModelResponseProposal } from '../../packages/shared-types/generated/typescript/response';
import type { SystemFilter } from '../../packages/shared-types/generated/typescript/trigger';
const proposal: ModelResponseProposal = {text: 'hello', status: 'SUCCESS', extra_response: []};
const filter: SystemFilter = {};
void [proposal, filter];
