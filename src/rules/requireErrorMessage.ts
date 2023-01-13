import { TSESLint } from "@typescript-eslint/experimental-utils";

export const requireErrorMessage: TSESLint.RuleModule<"messageId", []> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: "",
      recommended: "error",
      url: "",
    },
    messages: {
      messageId: "エラーメッセージは必ず入力してください",
    },
    schema: [
      //   {
      //     type: "object",
      //     properties: {},
      //     additionalProperties: false,
      //   },
    ],
  },
  create: (context) => {
    return {
      CallExpression(node) {
        console.log(node);
        // if (node.callee.object?.name !== "z") {
        //   return;
        // }

        // if (node.callee.property.name !== "object") {
        //   return;
        // }
      },
    };
  },
};
