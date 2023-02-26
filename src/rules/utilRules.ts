import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import { getParents } from "./utils";

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

// do not use methods
const doNotUses = [
  // https://zod.dev/?id=passthrough
  "passthrough",
  // https://zod.dev/?id=strip
  "strip",
];

export const zodUtilRules: TSESLint.RuleModule<Errors, []> = {
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
          callee.object.type === "Identifier"
        ) {
          const node = callee.property;
          const parents = getParents(node);

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

          // do not use methods
          for (const doNotUse of doNotUses) {
            if (parents.includes(doNotUse)) {
              context.report({
                node,
                messageId: "not_use_method",
                data: { name: doNotUse },
              });
            }
          }
        }
      },
    };
  },
};
