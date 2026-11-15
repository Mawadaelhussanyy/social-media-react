import type React from "react";

export type InputProps = {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  type?: string;
  label?: React.ReactNode;
};