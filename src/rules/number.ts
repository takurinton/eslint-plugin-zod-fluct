import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";
import { messages } from "./messages";
import { Errors } from "./types";
import {
  doNotUseOtherThanMinAndMaxIfNumber,
  getParents,
  requireMaxErrorMessage,
  requireMinErrorMessage,
} from "./utils";

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
          const parents = getParents(node);

          // require max and min if number
          if (!parents.includes("max")) {
            context.report({
              node,
              messageId: "not_min_error",
              data: { name: "z.number()" },
            });
          }
          if (!parents.includes("min")) {
            context.report({
              node,
              messageId: "not_max_error",
              data: { name: "z.number()" },
            });
          }

          // do not use other than min and max if number
          if (doNotUseOtherThanMinAndMaxIfNumber(parents)) {
            context.report({
              node,
              messageId: "do_not_use_other_than_min_and_max_if_number",
            });
          }
          // require min and max error text
          const minError = requireMinErrorMessage(node);
          if (minError) {
            context.report({
              node,
              messageId: minError,
            });
          }
          const maxError = requireMaxErrorMessage(node);
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
