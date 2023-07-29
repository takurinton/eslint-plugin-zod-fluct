import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import {
  getZodChainMethods,
  requireMaxErrorMessage,
  requireMinErrorMessage,
  stringMustHaveMinIfNotNullable,
} from "./utils";

export const zodString: TSESLint.RuleModule<Errors, []> = {
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
          callee.property.name === "string"
        ) {
          const node = callee.property;
          const methods = getZodChainMethods(context);

          // require min if string and not optional
          if (stringMustHaveMinIfNotNullable(methods)) {
            context.report({
              node,
              messageId: "string_must_have_min_if_not_nullable",
            });
          }

          // require max if string
          if (!methods.includes("max")) {
            context.report({
              node,
              messageId: "not_max_error",
              data: { name: "z.string()" },
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
        }
      },
    };
  },
};
