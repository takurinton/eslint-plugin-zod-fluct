import { Messages } from "./types";

export const messages: Messages = {
  required_error: "required_errorは必ず指定してください",
  invalid_type_error: "invalid_type_errorは必ず指定してください",
  not_min_error: "{{ name }}を使用しているときはmin()を必ず指定してください",
  do_not_use_other_than_min_and_max_if_number:
    "number()を使用している時はmin()とmax()以外で範囲を指定しないでください",
  not_max_error: "{{ name }}を使用しているときはmax()を必ず指定してください",
  not_min_error_message: "min()のエラーメッセージを指定してください",
  not_max_error_message: "max()のエラーメッセージを指定してください",
  error_message_must_be_string: "エラーメッセージは文字列で指定してください",
  string_must_have_min_if_not_optional:
    "z.string()はoptional()を使用していない場合はmin()を必ず指定してください",
  nullable_and_optional_must_have_invalid_type_error:
    "nullable()とoptional()を同時に使用する場合はinvalid_type_errorを必ず指定してください",
  not_nullable_and_not_optional_must_have_required_error:
    "nullable()とoptional()を使用しない場合はrequired_errorを必ず指定してください",
};
