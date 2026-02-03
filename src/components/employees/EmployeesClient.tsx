"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/src/lib/api/employees";
import { ViewSwitcher, type ViewMode } from "@/src/components/views/ViewSwitcher";
import { ViewToolbar } from "@/src/components/views/ViewToolbar";
import { EmployeeListView } from "@/src/components/employees/EmployeeListView";
import { EmployeeKanbanView } from "@/src/components/employees/EmployeeKanbanView";
import { EmployeeForm } from "@/src/components/EmployeeForm";
import { EmployeeDetail } from "@/src/components/EmployeeDetail";
import { Card } from "@/src/components/ui/Card";
import { StatCard } from "@/src/components/ui/StatCard";
import { UsersIcon, BuildingIcon, CalendarIcon } from "@/src/components/icons";
import { employeeDetailQueryKey, getWorkspacePath } from "@/src/config/routes";

export function EmployeesClient() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const selectedEmployeeId = searchParams.get(employeeDetailQueryKey);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["employees", deferredQuery],
    queryFn: () => fetchEmployees(deferredQuery),
    staleTime: 30_000
  });

  const departmentCount = new Set(data.map((employee) => employee.department)).size;
  const recentHireCutoff = new Date();
  recentHireCutoff.setDate(recentHireCutoff.getDate() - 90);
  const recentHires = data.filter((employee) => new Date(employee.hiredOn) > recentHireCutoff)
    .length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Headcount"
          value={isLoading ? "—" : String(data.length)}
          helper="Active employees"
          icon={<UsersIcon className="h-4 w-4" />}
        />
        <StatCard
          label="Departments"
          value={isLoading ? "—" : String(departmentCount)}
          helper="Distinct teams"
          icon={<BuildingIcon className="h-4 w-4" />}
        />
        <StatCard
          label="Recent Hires"
          value={isLoading ? "—" : String(recentHires)}
          helper="Last 90 days"
          icon={<CalendarIcon className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <ViewSwitcher value={view} onChange={setView} />
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {isLoading ? "Loading" : `${data.length} records`}
        </div>
      </div>

      <ViewToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search employees, codes, emails"
        primaryAction={{ label: "New Employee", onClick: () => setView("form") }}
      />

      {isError && (
        <Card className="border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-200">
          We could not load employees right now. Please try again.
        </Card>
      )}

      {!isError && view === "list" && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <EmployeeListView employees={data} isLoading={isLoading} />
          {selectedEmployeeId ? (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Employee detail
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Selected record
                    </p>
                  </div>
                  <Link
                    href={getWorkspacePath("employees")}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700"
                  >
                    Clear
                  </Link>
                </div>
              </Card>
              <EmployeeDetail employeeId={selectedEmployeeId} />
            </div>
          ) : (
            <EmployeeForm />
          )}
        </div>
      )}

      {!isError && view === "kanban" && <EmployeeKanbanView employees={data} />}

      {!isError && view === "form" && (
        <div className="max-w-3xl">
          <EmployeeForm />
        </div>
      )}

      {!isError && view === "calendar" && (
        <Card className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Calendar view is best suited for Leaves and Attendance. We’ll add it once
          scheduling data is in place.
        </Card>
      )}
    </div>
  );
}
