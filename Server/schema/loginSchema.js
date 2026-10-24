import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, "Email should contain at least 2 characters")
    .email(),
  password: z
    .string()
    .min(2, "Password should contain at least 2 characters")
    .max(64, "Password should contain at most 64 characters"),
});

export default loginSchema;
