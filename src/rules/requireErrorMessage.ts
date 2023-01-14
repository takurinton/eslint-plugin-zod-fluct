import { TSESLint } from "@typescript-eslint/experimental-utils";

// もう少し丁寧に定義する
const properties = ["string", "number", "optional"];

export const requireErrorMessage: TSESLint.RuleModule<
  "required_error" | "invalid_type_error",
  []
> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: "",
      recommended: "error",
      url: "",
    },
    messages: {
      required_error: "required_errorは必ず指定してください",
      invalid_type_error: "invalid_type_errorは必ず指定してください",
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
        if (!/.*\/validation.ts/.test(context.getFilename())) {
          return;
        }

        const callee = node.callee;

        const isOptional = (() => {
          if (callee.type === "MemberExpression") {
            const property = callee.property;
            if (property.type === "Identifier") {
              //   console.log(property.name);
              return property.name === "optional";
            }
          }
          return false;
        })();

        if (callee.type === "MemberExpression") {
          const property = callee.property;
          if (property.type === "Identifier") {
            if (properties.includes(property.name)) {
              const args = node.arguments;
              if (args.length === 1) {
                const arg = args[0];
                if (arg.type === "ObjectExpression") {
                  const properties = arg.properties;
                  const keys = properties.map((property) => {
                    if (property.type === "Property") {
                      const key = property.key;
                      if (key.type === "Identifier") {
                        return key.name;
                      }
                    }
                  });
                  // optionalなプロパティはrequired_errorは不要
                  // 同じ識別子になるのでどんな感じで管理しようか迷ってる
                  //   if (isOptional && !keys.includes("required_error")) {
                  //     context.report({
                  //       node,
                  //       messageId: "required_error",
                  //     });
                  //   }
                  if (!keys.includes("invalid_type_error")) {
                    context.report({
                      node,
                      messageId: "invalid_type_error",
                    });
                  }
                }
              }
            }
          }
        }
      },
    };
  },
};
