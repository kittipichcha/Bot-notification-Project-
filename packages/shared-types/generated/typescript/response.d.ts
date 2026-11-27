export interface FinalResponse {
  text: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "WAITING_APPROVAL" | "NEED_DISCUSSION";
  /**
   * @maxItems 10
   */
  extra_response:
    | []
    | [
        | {
            kind: "TEXT";
            payload: {
              text: string;
            };
          }
        | {
            kind: "EMBED";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
              source_refs?: string[];
            };
          }
        | {
            kind: "RESULT_CARD";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
              source_refs?: string[];
            };
          }
        | {
            kind: "APPROVAL_BUTTON";
            payload: {
              label: string;
              action_ref: string;
              preview: string;
              expiry: string;
            };
          }
        | {
            kind: "PRIVATE_FORM_LINK";
            payload: {
              label: string;
              transaction_ref: string;
            };
          }
        | {
            kind: "ERROR_NOTICE";
            payload: {
              error_code: string;
              text: string;
              retryable?: boolean;
            };
          }
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ];
  source_refs: string[];
  stale: boolean;
  error_code?: string;
}
/**
 * This interface was referenced by `FinalResponse`'s JSON-Schema
 * via the `definition` "FinalResponse".
 */
export interface FinalResponse1 {
  text: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "WAITING_APPROVAL" | "NEED_DISCUSSION";
  /**
   * @maxItems 10
   */
  extra_response:
    | []
    | [
        | {
            kind: "TEXT";
            payload: {
              text: string;
            };
          }
        | {
            kind: "EMBED";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
              source_refs?: string[];
            };
          }
        | {
            kind: "RESULT_CARD";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
              source_refs?: string[];
            };
          }
        | {
            kind: "APPROVAL_BUTTON";
            payload: {
              label: string;
              action_ref: string;
              preview: string;
              expiry: string;
            };
          }
        | {
            kind: "PRIVATE_FORM_LINK";
            payload: {
              label: string;
              transaction_ref: string;
            };
          }
        | {
            kind: "ERROR_NOTICE";
            payload: {
              error_code: string;
              text: string;
              retryable?: boolean;
            };
          }
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
                source_refs?: string[];
              };
            }
          | {
              kind: "APPROVAL_BUTTON";
              payload: {
                label: string;
                action_ref: string;
                preview: string;
                expiry: string;
              };
            }
          | {
              kind: "PRIVATE_FORM_LINK";
              payload: {
                label: string;
                transaction_ref: string;
              };
            }
          | {
              kind: "ERROR_NOTICE";
              payload: {
                error_code: string;
                text: string;
                retryable?: boolean;
              };
            }
        )
      ];
  source_refs: string[];
  stale: boolean;
  error_code?: string;
}
/**
 * This interface was referenced by `FinalResponse`'s JSON-Schema
 * via the `definition` "ModelResponseProposal".
 */
export interface ModelResponseProposal {
  text: string;
  status: "SUCCESS" | "PARTIAL" | "FAILED" | "WAITING_APPROVAL" | "NEED_DISCUSSION";
  /**
   * @maxItems 10
   */
  extra_response:
    | []
    | [
        | {
            kind: "TEXT";
            payload: {
              text: string;
            };
          }
        | {
            kind: "EMBED";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
            };
          }
        | {
            kind: "RESULT_CARD";
            payload: {
              title?: string;
              description?: string;
              /**
               * @maxItems 25
               */
              fields?: {
                name: string;
                value: string;
              }[];
            };
          }
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ]
    | [
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        ),
        (
          | {
              kind: "TEXT";
              payload: {
                text: string;
              };
            }
          | {
              kind: "EMBED";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
          | {
              kind: "RESULT_CARD";
              payload: {
                title?: string;
                description?: string;
                /**
                 * @maxItems 25
                 */
                fields?: {
                  name: string;
                  value: string;
                }[];
              };
            }
        )
      ];
}
