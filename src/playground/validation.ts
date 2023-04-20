import { z } from "zod";

const schema = z.object({
  id: z.string().max(255, { message: "error message" }).optional(),
  name: z
    .string({
      required_error: "error message",
    })
    .min(1, { message: "error message" })
    .max(255, { message: "error message" }),
});

const safe = schema.safeParse({
  id:
    "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
  name: "takurinton",
});

console.log(safe.success);
