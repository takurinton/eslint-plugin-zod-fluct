import { z } from "zod";

const schema = z.object({
  // foo: z.string({
  //   required_error: "foo is required",
  //   invalid_type_error: "foo must be string",
  // }),
  // bar: z
  //   .number({
  //     required_error: "bar is required",
  //     invalid_type_error: "bar must be number",
  //   })
  //   .min(0, "0以上のメッセージを入力してください")
  //   .max(100),
  hoge: z
    .number({
      invalid_type_error: "hoge must be number",
    })
    .min(0, "0以上のメッセージを入力してください")
    .max(100)
    .optional(),
});

const safe = schema.safeParse({
  foo: "foo",
  bar: 50,
});

console.log(safe.success);
