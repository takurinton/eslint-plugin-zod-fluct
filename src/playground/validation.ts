import { z } from "zod";

export const schema = z.object({
  id: z.string().max(255, { message: "error message" }).nullable(),
  num: z
    .number()
    .min(0, { message: "error message" })
    .max(100, { message: "error message" }),
  name: z
    .string({
      required_error: "error message",
    })
    .min(1, { message: "error message" })
    .max(255, { message: "error message" }),
});
