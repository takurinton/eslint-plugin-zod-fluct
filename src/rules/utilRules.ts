import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import { getZodChainMethods } from "./utils";

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
          const methods = getZodChainMethods(context);

          if (methods.includes("optional") && methods.includes("nullable")) {
            context.report({
              node,
              messageId: "not_use_optional_with_nullable",
            });
          }

          // do not use methods
          for (const doNotUse of doNotUses) {
            if (methods.includes(doNotUse)) {
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
