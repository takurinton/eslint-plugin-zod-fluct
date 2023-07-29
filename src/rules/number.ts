import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import {
  getParents,
  requireMaxErrorMessage,
  requireMinErrorMessage,
} from "./utils";

// alias
const aliasses = {
  // https://zod.dev/?id=numbers
  gt: "",
  gte: "min",
  lt: "",
  lte: "max",
  // int: "",
  positive: "min(1)",
  nonnegative: "min(0)",
  negative: "max(-1)",
  nonpositive: "max(0)",
  finite: "maxとmin",

  // https://zod.dev/?id=safeparseasync
  spa: "safeParseAsync",
} as Record<string, string>;

export const zodNumber: TSESLint.RuleModule<Errors, []> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: "",
      recommended: "error",
      url: "",
    },
    messages,
    schema: [],
  },
  create: (context) => {
    return {
      CallExpression(node) {
        const callExpression = node as TSESTree.CallExpression;
        const callee = callExpression.callee;
        if (
          callee.type === "MemberExpression" &&
          callee.property.type === "Identifier" &&
          callee.object.type === "Identifier" &&
          callee.object.name === "z" &&
          callee.property.name === "number"
        ) {
          const node = callee.property;
          const parents = getParents(context);

          // require max and min if number
          if (!parents.includes("min")) {
            context.report({
              node,
              messageId: "not_min_error",
              data: { name: "z.number()" },
            });
          }
          if (!parents.includes("max")) {
            context.report({
              node,
              messageId: "not_max_error",
              data: { name: "z.number()" },
            });
          }

          // require min and max error text
          const minError = requireMinErrorMessage(context);
          if (minError) {
            context.report({
              node,
              messageId: minError,
            });
          }
          const maxError = requireMaxErrorMessage(context);
          if (maxError) {
            context.report({
              node,
              messageId: maxError,
            });
          }

          // alias check
          for (const alias of Object.keys(aliasses)) {
            if (parents.includes(alias)) {
              context.report({
                node,
                messageId: "not_use_alias",
                data: { name: alias, alias: aliasses[alias] },
              });
            }
          }
        }
      },
    };
  },
};
