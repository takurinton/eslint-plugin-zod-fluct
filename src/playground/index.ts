import { z } from "zod";

const schema = z.object({
  foo: z.string(),
});

const hoge = "takurinton";

schema;
