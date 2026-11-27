import type { RequestPage } from '../../packages/shared-types/generated/typescript/api';
import type { FinalResponse } from '../../packages/shared-types/generated/typescript/response';
import type { ToolContract } from '../../packages/shared-types/generated/typescript/tool';
import type { PolicyContract } from '../../packages/shared-types/generated/typescript/policy';

const api: RequestPage = {items:[{request_id:'00000000-0000-4000-8000-000000000001',status:'QUEUED',queue_position:null,execution_mode:'normal',created_at:'2026-11-27T12:34:56Z',error_code:null,can_control:true}],next_cursor:null};
const response: FinalResponse = { text: 'สวัสดี 🌍', status: 'SUCCESS', extra_response: [{kind:'EMBED',payload:{title:'ผล',fields:[{name:'ชื่อ',value:'ค่า'}],source_refs:['source-1']}},{kind:'ERROR_NOTICE',payload:{error_code:'TIMEOUT',text:'ลองใหม่',retryable:true}}], source_refs:['source-1'], stale:false };
const tool: ToolContract = {status:'failed',data_ref:null,source:'discord',timestamp:'2026-11-27T12:34:56Z',error_code:'TIMEOUT',retryable:true};
const policy: PolicyContract = {schema_version:'1.0.0',release:'P0',tool:{default_access:'DENY'},trigger:{personal_watches_by_default:false,ignore_own_messages:true,schedule_enabled:false,deduplicate_events:true},model:{allowed_models:[]},agent:{default_mode:'SIMPLE',enabled_modes:['SIMPLE'],role_definitions:{},max_model_calls:4},request:{execution_enabled:false,retry_policy:{model_retries:1,tool_retries:0}},approval:{enabled:false,mutation_policy:'EXACT_ACTION'},bot_connection:{enabled_modes:['SAME_BOT']},response:{supported_components:['TEXT']}};
process.stdout.write(JSON.stringify({api,response,tool,policy}));
