import { TSESTree } from "@typescript-eslint/experimental-utils";

export const getParents = (node: TSESTree.Node) => {
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

export const requireMinErrorMessage = (node: TSESTree.Node) => {
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
        return "error_message_must_be_object";
      }
      break;
    }
    parent = parent.parent;
  }
};

export const requireMaxErrorMessage = (node: TSESTree.Node) => {
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
        return "not_max_error_message";
      }
      if (args.length === 2 && args[1].type !== "Literal") {
        return "error_message_must_be_object";
      }
      break;
    }
    parent = parent.parent;
  }
};

export const doNotUseOtherThanMinAndMaxIfNumber = (parents: string[]) => {
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

export const stringMustHaveMinIfNotOptional = (parents: string[]) =>
  !(parents.includes("optional") || parents.includes("min"));
