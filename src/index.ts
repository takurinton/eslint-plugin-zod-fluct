import { zodFluct } from "./rules/zodFluct";

export = {
  rules: {
    "eslint-plugin-zod-fluct": zodFluct,
  },
  rulesConfig: {
    "require-error-message": 2,
  },
};
