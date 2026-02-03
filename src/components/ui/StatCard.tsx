import type { ReactNode } from "react";
import { Card } from "@/src/components/ui/Card";

export function StatCard({
  label,
  value,
  helper,
  icon
}: {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        {icon ? <div className="text-slate-400 dark:text-slate-500">{icon}</div> : null}
      </div>
      <div className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      {helper ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helper}</p>
      ) : null}
    </Card>
  );
}
