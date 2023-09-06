import { describe, it, expect } from "vitest";
import {
  doNotUseOtherThanMinAndMaxIfNumber,
  stringMustHaveMinIfNotNullable,
} from "../rules/utils";

describe("Testing TSESTree.Node utilities", () => {
  it("doNotUseOtherThanMinAndMaxIfNumber returns correct boolean", () => {
    const isNotAllowed = doNotUseOtherThanMinAndMaxIfNumber(["gt", "max"]);
    expect(isNotAllowed).toBe(true);
  });

  it("stringMustHaveMinIfNotNullable returns correct boolean", () => {
    const isMustHaveMin = stringMustHaveMinIfNotNullable(["nullable", "min"]);
    expect(isMustHaveMin).toBe(false);
  });
});
