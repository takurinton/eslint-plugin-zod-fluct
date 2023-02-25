import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import { getParents } from "./utils";

const aliasses = {
  // TODO: ここにエイリアスを追加していく
};

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

          if (parents.includes("spa")) {
            context.report({
              node,
              messageId: "not_use_alias",
              // data: { name: "z.string()" },
            });
          }
        }
      },
    };
  },
};
