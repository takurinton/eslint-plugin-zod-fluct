import { zodNumber, zodString, zodUtilRules } from "./rules";

export = {
  rules: {
    number: zodNumber,
    string: zodString,
    utils: zodUtilRules,
  },
  configs: {
    all: {
      plugins: ["zod-fluct"],
      rules: {
        "zod-fluct/number": "error",
        "zod-fluct/string": "error",
        "zod-fluct/utils": "error",
      },
    },
  },
};
