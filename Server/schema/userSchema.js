import z from "zod";

const LEVELS = ["beginner", "intermediate", "expert"];

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First Name should have at least 2 characters")
    .max(25, "First Name should have at most 25 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last Name should have at least 2 characters")
    .max(25, "Last Name should have at most 25 characters"),

  email: z.string
    .trim()
    .toLowerCase()
    .min(2, "Email should contain at least 2 characters")
    .email(),

  age: z.coerce
    .number({ error: "Age must be a number" })
    .int("Age must be a whole Number")
    .min(11, "User must be at least 11 yrs old")
    .max(120, "Enter a valid Age"),

  password: z
    .string()
    .min(8, "Password should contain at least 8 characters")
    .max(64, "Password should contain at most 64 characters")
    .regex(/^\S/, "Password should not start with a space")
    .regex(/\S$/, "Password should not end with a space")
    .regex(/[A-Z]/, "Password should contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password should contain at least 1 lowercase letter")
    .regex(/\d/, "Password should contain at least 1 digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password should contain at least 1 special character",
    ),

  skillToLearn: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .toLowerCase()
          .min(1, "Skill Name should contain at least 1 character")
          .max(30, "Skill Name should not exceed 30 characters"),
        level: z
          .string()
          .trim()
          .toLowerCase()
          .min(1, "Skill should contain at least 1 character")
          .max(30, "Skill should not exceed 12 characters")
          .pipe(
            z.enum([...LEVELS].slice(1), {
              error: "Level must be intermediate or expert",
            }),
          ),
      }),
    )
    .min(1, "skill To Learn is required"),

  skillToTeach: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .toLowerCase()
          .min(1, "Skill Name should contain at least 1 character")
          .max(30, "Skill Name should not exceed 30 characters"),
        level: z
          .string()
          .trim()
          .toLowerCase()
          .min(1, "Skill should contain at least 1 character")
          .max(30, "Skill should not exceed 12 characters")
          .pipe(
            z.enum(LEVELS, {
              error: "Level must be beginner, intermediate or expert",
            }),
          ),
      }),
    )
    .min(1, "skill To Teach is required"),
});
