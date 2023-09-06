import { zodUtilRules } from "../rules";
import { afterAll, describe, it } from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

it("zodString", () => {
  const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
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
