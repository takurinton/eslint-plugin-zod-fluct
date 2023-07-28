import { describe, it, expect } from "vitest";
import {
  getParents,
  //   requireMinErrorMessage,
  //   requireMaxErrorMessage,
  doNotUseOtherThanMinAndMaxIfNumber,
  stringMustHaveMinIfNotNullable,
} from "../rules/utils";
import { TSESTree } from "@typescript-eslint/experimental-utils";

const nodeWithParents = ({
  type: "Identifier",
  name: "childNode",
  parent: {
    type: "MemberExpression",
    computed: false,
    object: {
      type: "Identifier",
      name: "parentNode1",
      parent: {
        type: "MemberExpression",
        computed: false,
        object: {
          type: "Identifier",
          name: "parentNode2",
          parent: null, // this is the top-most node, so no parent here
        },
        property: {
          type: "Identifier",
          name: "parentNode2Property",
        },
      },
    },
    property: {
      type: "Identifier",
      name: "parentNode1Property",
    },
  },
} as unknown) as TSESTree.Node;

describe("Testing TSESTree.Node utilities", () => {
  it("getParents returns parents if they exist", () => {
    const parents = getParents(nodeWithParents);
    expect(parents).not.toBe([]);
    // Add more assertions based on your expected output
  });

  // 書き換える
  //   it("getParents returns empty array if no parents", () => {
  //     const parents = getParents(nodeWithoutParents);
  //     expect(parents).toEqual([]);
  //   });

  // TODO
  //   it("requireMinErrorMessage returns correct error message", () => {
  //     const errorMessage = requireMinErrorMessage(nodeWithMinError); // Add your mocked node here
  //     expect(errorMessage).toBe("not_min_error_message");
  //     // Add more test cases for other conditions
  //   });

  // TODO
  //   it("requireMaxErrorMessage returns correct error message", () => {
  //     const errorMessage = requireMaxErrorMessage(nodeWithMaxError); // Add your mocked node here
  //     expect(errorMessage).toBe("not_max_error_message");
  //     // Add more test cases for other conditions
  //   });

  it("doNotUseOtherThanMinAndMaxIfNumber returns correct boolean", () => {
    const isNotAllowed = doNotUseOtherThanMinAndMaxIfNumber(["gt", "max"]); // Add your test case here
    expect(isNotAllowed).toBe(true);
    // Add more test cases for other conditions
  });

  it("stringMustHaveMinIfNotNullable returns correct boolean", () => {
    const isMustHaveMin = stringMustHaveMinIfNotNullable(["nullable", "min"]); // Add your test case here
    expect(isMustHaveMin).toBe(false);
    // Add more test cases for other conditions
  });
});
