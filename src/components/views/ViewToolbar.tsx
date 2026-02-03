import { Button } from "@/src/components/ui/Button";

export function ViewToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  primaryAction
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  primaryAction?: { label: string; onClick?: () => void };
}) {
  const isPrimaryDisabled = primaryAction ? !primaryAction.onClick : false;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="min-w-[220px] flex-1">
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder ?? "Search"}
            aria-label={searchPlaceholder ?? "Search"}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {["Filters", "Group By", "Sort"].map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-slate-200 px-3 py-1 transition hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {primaryAction ? (
        <Button
          type="button"
          variant="primary"
          onClick={primaryAction.onClick}
          disabled={isPrimaryDisabled}
        >
          {primaryAction.label}
        </Button>
      ) : null}
    </div>
  );
}
