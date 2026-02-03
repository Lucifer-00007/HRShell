import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";

export function ModulePlaceholder({
  title,
  description,
  highlights
}: {
  title: string;
  description: string;
  highlights: string[];
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge tone="warning">UI only</Badge>
          <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          Backend deferred
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
