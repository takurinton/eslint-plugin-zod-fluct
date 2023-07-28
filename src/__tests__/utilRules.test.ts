import path from "path";
import { zodUtilRules } from "../rules";
import { RuleTester } from "eslint";
import { it } from "vitest";

it("zodString", () => {
  const ruleTester = new RuleTester({
    parser: path.resolve(
      __dirname,
      "../../node_modules/@typescript-eslint/parser"
    ),
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ruleTester.run("zod-fluct/string", zodUtilRules, {
    valid: [],
    invalid: [
      {
        code: `
                const schema = z.string()
                    .nullable()
                    .optional();
            `,
        errors: [
          {
            messageId: "not_use_optional_with_nullable",
          },
        ],
      },
      {
        code: `
                const schema = z.string().passthrough();
            `,
        errors: [
          {
            messageId: "not_use_method",
          },
        ],
      },
      {
        code: `
                const schema = z.string().strip();
            `,
        errors: [
          {
            messageId: "not_use_method",
          },
        ],
      },
    ],
  });
});
