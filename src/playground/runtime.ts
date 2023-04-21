import { schema } from "./validation";

const safe = schema.safeParse({
  id:
    "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
  // num: null,
  name: "takurinton",
});

console.log(safe);
