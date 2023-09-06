import { zodString } from "../rules";
import { afterAll, it } from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";
import { describe } from "node:test";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

it("zodString", () => {
  const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ruleTester.run("zod-fluct/string", zodString, {
    valid: [
      {
        code: `
            const schema = z
            .string()
            .min(0, { message: '0文字以上で入力してください' })
            .max(100, { message: '100文字以下で入力してください' });
        `,
      },
      {
        code: `
            const schema = z
            .string()
            .max(100, { message: '100文字以下で入力してください' })
            .nullish();
        `,
      },
    ],
    invalid: [
      {
        code: `      
            const schema = z.string()
                .min(0, { message: '0文字以上で入力してください' });    
        `,
        errors: [
          {
            messageId: "not_max_error",
            data: {
              name: "z.string()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.string()
                .max(100, { message: '100文字以下で入力してください' });    
        `,
        errors: [
          {
            messageId: "string_must_have_min_if_not_nullable",
            data: {
              name: "z.string()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.string()
                .min(0)
                .max(100);
        `,
        errors: [
          {
            messageId: "not_min_error_message",
            data: {
              name: "z.string()",
            },
          },
          {
            messageId: "not_max_error_message",
            data: {
              name: "z.string()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.string()
                .min(0, '0文字以上で入力してください')
                .max(100, '100文字以下で入力してください');
        `,
        errors: [
          {
            messageId: "error_message_must_be_object",
            data: {
              name: "z.string()",
            },
          },
          {
            messageId: "error_message_must_be_object",
            data: {
              name: "z.string()",
            },
          },
        ],
      },
    ],
  });
});
