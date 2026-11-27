export interface TriggerContract {
  event_slug: string;
  source: "gateway" | "webhook" | "composio" | "none";
  payload_schema_ref: string;
  filters: {};
  eligible_roles: ("ADMIN" | "MEMBER")[];
  default_on_action: ("help" | "setup" | "mention" | "approval" | "removal" | "status") | null;
  filter_schema_ref: string;
}
/**
 * This interface was referenced by `TriggerContract`'s JSON-Schema
 * via the `definition` "SystemEvent".
 */
export interface SystemEvent {}
/**
 * This interface was referenced by `TriggerContract`'s JSON-Schema
 * via the `definition` "SystemFilter".
 */
export interface SystemFilter {}
