import { zodNumber, zodString } from "./rules";

export = {
  rules: {
    number: zodNumber,
    string: zodString,
  },
  configs: {
    all: {
      plugins: ["zod-fluct"],
      rules: {
        "zod-fluct/number": "error",
        "zod-fluct/string": "error",
      },
    },
  },
};
