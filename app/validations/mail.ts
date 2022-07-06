import { z } from "zod"; // Look into .refine() -> pretty cool

export const createMailValidation = z.object({
  to: z.string().min(1),
  from: z.string().email(),
});
