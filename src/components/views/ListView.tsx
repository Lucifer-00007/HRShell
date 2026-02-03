import type { ReactNode } from "react";
import { Card } from "@/src/components/ui/Card";
import { EmptyState } from "@/src/components/views/EmptyState";
import { cn } from "@/src/lib/cn";

export type ColumnDef<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export function ListView<T>({
  columns,
  rows,
  rowKey,
  isLoading,
  emptyState
}: {
  columns: ColumnDef<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyState?: { title: string; description: string };
}) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left font-semibold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  Loading data…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8">
                  {emptyState ? (
                    <EmptyState title={emptyState.title} description={emptyState.description} />
                  ) : (
                    <div className="text-center text-slate-500 dark:text-slate-400">
                      No records found.
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-4 text-slate-700 dark:text-slate-200",
                        column.className
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
