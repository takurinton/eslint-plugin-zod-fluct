import path from "path";
import { zodNumber } from "../rules";
import { RuleTester } from "eslint";
import { it } from "vitest";

it("zodNumber", () => {
  const ruleTester = new RuleTester({
    parser: path.resolve(
      __dirname,
      "../../node_modules/@typescript-eslint/parser"
    ),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ruleTester.run("zod-fluct/number", zodNumber, {
    valid: [
      {
        code: `
            const schema = z
            .number()
            .min(0, { message: '0以上の数字を入力してください' })
            .max(100, { message: '100以下の数字を入力してください' });
        `,
      },
    ],
    invalid: [
      {
        code: `      
            const schema = z.number()
                .min(0, { message: '0以上の数字を入力してください' });    
        `,
        errors: [
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number()
                .max(100, { message: '0以上の数字を入力してください' });
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number()
                .min(0)
                .max(100);
        `,
        errors: [
          {
            messageId: "not_min_error_message",
            data: {
              name: "min()",
            },
          },
          {
            messageId: "not_max_error_message",
            data: {
              name: "max()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number()
                .min(0, '0以上の数字を入力してください')
                .max(100, '100以下の数字を入力してください');
        `,
        errors: [
          {
            messageId: "error_message_must_be_object",
            data: {
              name: "min()",
            },
          },
          {
            messageId: "error_message_must_be_object",
            data: {
              name: "max()",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().gt(5)
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "gt",
              alias: "", // TODO
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().gte(5)
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "gte",
              alias: "min",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().lt(5)
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "lt",
              alias: "",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().lte(5)
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "lte",
              alias: "max",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().nonnegative()
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "nonnegative",
              alias: "min(0)",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().positive()
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "positive",
              alias: "min(1)",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().negative()
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "negative",
              alias: "max(-1)",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().nonpositive()
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "nonpositive",
              alias: "max(0)",
            },
          },
        ],
      },
      {
        code: `      
            const schema = z.number().finite()
        `,
        errors: [
          {
            messageId: "not_min_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_max_error",
            data: {
              name: "z.number()",
            },
          },
          {
            messageId: "not_use_alias",
            data: {
              name: "finite",
              alias: "maxとmin",
            },
          },
        ],
      },
    ],
  });
});
