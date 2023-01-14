import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";

type Errors =
  | "required_error"
  | "invalid_type_error"
  | "not_min_error"
  | "not_max_error";

type Messages = {
  [key in Errors]: string;
};

const messages: Messages = {
  required_error: "required_errorは必ず指定してください",
  invalid_type_error: "invalid_type_errorは必ず指定してください",
  not_min_error: "z.number()を使用しているときはmin()を必ず指定してください",
  not_max_error: "z.number()を使用しているときはmax()を必ず指定してください",
};

export const zodFluct: TSESLint.RuleModule<Errors, []> = {
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
      Property(node) {
        const property = node as TSESTree.Property;
        const key = property.key as TSESTree.Identifier;
        const value = property.value as TSESTree.CallExpression;
        console.log(value);
      },
    };
  },
};
