import { z } from "zod";

export const loginValidations = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

export const registerValidations = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password needs at least 6 characters"),
    confirmPassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
