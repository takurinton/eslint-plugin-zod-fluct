export type Errors =
  | "not_min_error"
  | "not_max_error"
  | "not_min_error_message"
  | "not_max_error_message"
  | "error_message_must_be_object"
  | "string_must_have_min_if_not_nullable"
  | "not_use_alias"
  | "not_use_method"
  | "not_use_optional_with_nullable";

export type Messages = {
  [key in Errors]: string;
};
