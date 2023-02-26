export type Errors =
  | "required_error"
  | "invalid_type_error"
  | "not_min_error"
  | "do_not_use_other_than_min_and_max_if_number"
  | "not_max_error"
  | "not_min_error_message"
  | "not_max_error_message"
  | "error_message_must_be_string"
  | "string_must_have_min_if_not_optional"
  | "nullable_and_optional_must_have_invalid_type_error"
  | "not_nullable_and_not_optional_must_have_required_error"
  | "not_use_alias"
  | "not_use_method";

export type Messages = {
  [key in Errors]: string;
};
