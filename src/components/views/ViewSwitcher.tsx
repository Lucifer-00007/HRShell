import { cn } from "@/src/lib/cn";
import { CalendarIcon, FormIcon, KanbanIcon, ListIcon } from "@/src/components/icons";

export type ViewMode = "list" | "kanban" | "form" | "calendar";

const viewOptions: Array<{ value: ViewMode; label: string; icon: typeof ListIcon }> = [
  { value: "list", label: "List", icon: ListIcon },
  { value: "kanban", label: "Kanban", icon: KanbanIcon },
  { value: "form", label: "Form", icon: FormIcon },
  { value: "calendar", label: "Calendar", icon: CalendarIcon }
];

export function ViewSwitcher({
  value,
  onChange
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {viewOptions.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
              isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            )}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
