import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/src/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-500",
  secondary:
    "bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200",
  ghost: "bg-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
