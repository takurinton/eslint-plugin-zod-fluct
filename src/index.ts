import { zodFluct } from "./rules/requireErrorMessage";

export = {
  rules: {
    "eslint-plugin-zod-fluct": zodFluct,
  },
  rulesConfig: {
    "require-error-message": 2,
  },
};
