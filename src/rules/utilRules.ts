import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import { getParents } from "./utils";

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
  // finite: "",

  // https://zod.dev/?id=safeparseasync
  spa: "safeParseAsync",
  // TODO: ここにエイリアスを追加していく
} as Record<string, string>;

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

          const aliassesKeys = Object.keys(aliasses);
          for (const alias of aliassesKeys) {
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
