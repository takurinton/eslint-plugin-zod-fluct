import { schema } from "./validation";

const safe = schema.safeParse({
  id:
    "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
  num: 1,
  name: "takurinton",
});

console.log(safe);
