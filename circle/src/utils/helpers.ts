import type { InputProps } from "../types/inputProps";

export function inputProps(): InputProps {
  return {
    variant: "bordered",
  };
}



export function validateAge(value: string) {
  const today = new Date();
  const birthDate = new Date(value);

  let age = today.getFullYear() - birthDate.getFullYear();

  const month = today.getMonth() - birthDate.getMonth();

  if (
    month < 0 ||
    (month === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18 || "You must be at least 18 years old";
}