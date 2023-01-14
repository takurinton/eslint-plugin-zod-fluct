import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";

type Errors =
  | "required_error"
  | "invalid_type_error"
  | "not_min_error"
  | "not_max_error"
  | "not_min_error_message"
  | "not_max_error_message";

type Messages = {
  [key in Errors]: string;
};

const messages: Messages = {
  required_error: "required_errorは必ず指定してください",
  invalid_type_error: "invalid_type_errorは必ず指定してください",
  not_min_error: "{{ name }}を使用しているときはmin()を必ず指定してください",
  not_max_error: "{{ name }}を使用しているときはmax()を必ず指定してください",
  not_min_error_message: "min()のエラーメッセージを指定してください",
  not_max_error_message: "max()のエラーメッセージを指定してください",
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
      CallExpression(node) {
        const callExpression = node as TSESTree.CallExpression;
        const callee = callExpression.callee;
        if (isZodObject(callee)) {
          // TODO: type safe
          // @ts-ignore
          const property = callee.property;
          let parents;
          switch (property.name) {
            case "number":
              parents = getParents(property);

              // require min and max error text
              requireMinErrorMessage(property, context);
              requireMaxErrorMessage(property, context);

              // require max and min if number
              requireMaxAndMin(property, parents, context, "z.number()");

              // require error message if not optional
              requireErrorMessageIfNotOptional(property, parents, context);
              break;
            case "string":
              parents = getParents(property);

              // require min and max error text
              requireMinErrorMessage(property, context);
              requireMaxErrorMessage(property, context);

              // require max and min if string
              requireMaxAndMin(property, parents, context, "z.string()");

              // require error message if not optional
              requireErrorMessageIfNotOptional(property, parents, context);
              break;
            case "object":
              break;
            // TODO: and more
            default:
              break;
          }
        }
      },
    };
  },
};

const isZodObject = (callee: TSESTree.LeftHandSideExpression) =>
  callee.type === "MemberExpression" &&
  callee.object.type === "Identifier" &&
  callee.object.name === "z";

const getParents = (node: TSESTree.Node) => {
  const parents = [];
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === "MemberExpression" &&
      parent.property.type === "Identifier"
    ) {
      parents.push(parent.property.name);
    }
    parent = parent.parent;
  }
  return parents;
};

const requireMinErrorMessage = (
  node: TSESTree.Node,
  context: TSESLint.RuleContext<Errors, []>
) => {
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === "CallExpression" &&
      parent.callee.type === "MemberExpression" &&
      parent.callee.property.type === "Identifier" &&
      parent.callee.property.name === "min"
    ) {
      const args = parent.arguments;
      if (args.length === 1) {
        context.report({
          node,
          messageId: "not_min_error_message",
        });
      }
      break;
    }
    parent = parent.parent;
  }
};

const requireMaxErrorMessage = (
  node: TSESTree.Node,
  context: TSESLint.RuleContext<Errors, []>
) => {
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === "CallExpression" &&
      parent.callee.type === "MemberExpression" &&
      parent.callee.property.type === "Identifier" &&
      parent.callee.property.name === "max"
    ) {
      const args = parent.arguments;
      if (args.length === 1) {
        context.report({
          node,
          messageId: "not_max_error_message",
        });
      }
      break;
    }
    parent = parent.parent;
  }
};

const requireMaxAndMin = (
  node: TSESTree.Node,
  parents: string[],
  context: TSESLint.RuleContext<Errors, []>,
  name?: string
) => {
  const hasMin = parents.includes("min");
  const hasMax = parents.includes("max");
  if (!hasMin) {
    context.report({
      node,
      messageId: "not_min_error",
      data: {
        name: name || "string",
      },
    });
  }
  if (!hasMax) {
    context.report({
      node,
      messageId: "not_max_error",
      data: {
        name: name || "string",
      },
    });
  }
};

const requireErrorMessageIfNotOptional = (
  node: TSESTree.Node,
  parents: string[],
  context: TSESLint.RuleContext<Errors, []>
) => {
  const hasOptional = parents.includes("optional");
  if (!hasOptional) {
    const hasRequiredError = parents.includes("required_error");
    if (!hasRequiredError) {
      context.report({
        node,
        messageId: "required_error",
      });
    }
  }
};
