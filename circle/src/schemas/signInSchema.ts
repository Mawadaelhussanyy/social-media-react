import * as zod from "zod";
import {
  emailRegex,
  passwordRegex,
} from "../utils/regex";

export const signInSchema = zod.object({
  email: zod
    .string()
    .regex(emailRegex, "Please enter a valid email"),

  password: zod
    .string()
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters"
    ),
});