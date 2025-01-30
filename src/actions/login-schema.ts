import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email("Email must be a valid email address")
    .min(1, { message: "Email must not be empty" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});
