import { SparkIcon } from "@/src/components/icons";

export function EmptyState({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900">
      <div className="rounded-full bg-slate-100 p-3 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <SparkIcon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="max-w-sm text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
