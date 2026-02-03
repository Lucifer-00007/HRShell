import type { HTMLAttributes } from "react";
import { cn } from "@/src/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "muted" | "info" | "success" | "warning";
};

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  muted: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  info: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
};

export function Badge({ tone = "muted", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
