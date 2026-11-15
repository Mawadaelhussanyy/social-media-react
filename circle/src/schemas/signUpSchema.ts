import * as zod from "zod";
import {
  emailRegex,
  passwordRegex,
} from "../utils/regex";

export const signUpSchema = zod
  .object({
    name: zod
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),

    email: zod
      .string()
      .regex(emailRegex, "Please enter a valid email"),

    dateOfBirth: zod
      .string()
      .min(1, "You should enter your date of birth"),

    gender: zod
      .string()
      .min(1, "You should select your gender"),

    password: zod
      .string()
      .regex(
        passwordRegex,
        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters"
      ),

    rePassword: zod.string(),
  })
  .refine(
    (data) => data.password === data.rePassword,
    {
      message: "Passwords do not match",
      path: ["rePassword"],
    }
  );