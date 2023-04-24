import { Messages } from "./types";

export const messages: Messages = {
  not_min_error: "{{ name }}を使用しているときはmin()を必ず指定してください",
  not_max_error: "{{ name }}を使用しているときはmax()を必ず指定してください",
  not_min_error_message: "min()のエラーメッセージを指定してください",
  not_max_error_message: "max()のエラーメッセージを指定してください",
  // ref: https://github.com/colinhacks/zod/issues/97#issuecomment-664178323
  error_message_must_be_object:
    "エラーメッセージはオブジェクトで指定してください",
  string_must_have_min_if_not_nullable:
    "z.string()はnullable/optional/nullishを使用していない場合はmin()を必ず指定してください",
  not_use_alias:
    "{{ name }}を使用しないでください。変わりに{{ alias }}を使用してください",
  not_use_method: "{{ name }}は使用しないでください",
  not_use_optional_with_nullable:
    "nullable()とoptional()は同時に使用しないでください、代わりにnullish()を使用してください",
};
