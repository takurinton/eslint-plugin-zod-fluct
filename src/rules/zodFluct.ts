import { TSESLint, TSESTree } from "@typescript-eslint/experimental-utils";

type Errors =
  | "required_error"
  | "invalid_type_error"
  | "not_min_error"
  | "do_not_use_other_than_min_and_max_if_number"
  | "not_max_error"
  | "not_min_error_message"
  | "not_max_error_message"
  | "error_message_must_be_string"
  | "string_must_have_min_if_not_optional"
  | "nullable_and_optional_must_have_invalid_type_error"
  | "not_nullable_and_not_optional_must_have_required_error";

type Messages = {
  [key in Errors]: string;
};

const messages: Messages = {
  required_error: "required_errorは必ず指定してください",
  invalid_type_error: "invalid_type_errorは必ず指定してください",
  not_min_error: "{{ name }}を使用しているときはmin()を必ず指定してください",
  do_not_use_other_than_min_and_max_if_number:
    "number()を使用している時はmin()とmax()以外で範囲を指定しないでください",
  not_max_error: "{{ name }}を使用しているときはmax()を必ず指定してください",
  not_min_error_message: "min()のエラーメッセージを指定してください",
  not_max_error_message: "max()のエラーメッセージを指定してください",
  error_message_must_be_string: "エラーメッセージは文字列で指定してください",
  string_must_have_min_if_not_optional:
    "z.string()はoptional()を使用していない場合はmin()を必ず指定してください",
  nullable_and_optional_must_have_invalid_type_error:
    "nullable()とoptional()を同時に使用する場合はinvalid_type_errorを必ず指定してください",
  not_nullable_and_not_optional_must_have_required_error:
    "nullable()とoptional()を使用しない場合はrequired_errorを必ず指定してください",
};

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
          requireMin(node, parents, context, "z.number()");
          requireMax(node, parents, context, "z.number()");

          // do not use other than min and max if number
          doNotUseOtherThanMinAndMaxIfNumber(node, parents, context);

          // require min and max error text
          requireMinErrorMessage(node, context);
          requireMaxErrorMessage(node, context);
        }
      },
    };
  },
};

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
          const parents = getParents(node);

          // require min if string and not optional
          stringMustHaveMinIfNotOptional(node, parents, context);

          // require max if string
          requireMax(node, parents, context, "z.string()");

          // require min and max error text
          requireMinErrorMessage(node, context);
          requireMaxErrorMessage(node, context);
        }
      },
    };
  },
};

// TODO: zodObject
// TODO: zodArray
// TODO: zodBoolean
// TODO: zodUnion

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

const requireMinErrorMessage = (node: TSESTree.Node) => {
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
        return "not_min_error_message";
      }
      if (args.length === 2 && args[1].type !== "Literal") {
        return "error_message_must_be_string";
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
      if (args.length === 2 && args[1].type !== "Literal") {
        context.report({
          node,
          messageId: "error_message_must_be_string",
        });
      }
      break;
    }
    parent = parent.parent;
  }
};

const requireMin = (parents: string[]) => parents.includes("min");

const doNotUseOtherThanMinAndMaxIfNumber = (parents: string[]) => {
  const notAllowed = [
    "gt",
    "gte",
    "lt",
    "lte",
    "positive",
    "negative",
    "nonnegative",
    "nonpositive",
  ];

  return parents.some((parent) => notAllowed.includes(parent));
};

const requireMax = (parents: string[]) => parents.includes("max");

const stringMustHaveMinIfNotOptional = (parents: string[]) =>
  parents.includes("optional");
