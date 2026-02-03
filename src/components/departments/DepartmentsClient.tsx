"use client";

import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/src/lib/api/departments";
import { ViewSwitcher, type ViewMode } from "@/src/components/views/ViewSwitcher";
import { ViewToolbar } from "@/src/components/views/ViewToolbar";
import { DepartmentListView } from "@/src/components/departments/DepartmentListView";
import { DepartmentForm } from "@/src/components/departments/DepartmentForm";
import { Card } from "@/src/components/ui/Card";
import { StatCard } from "@/src/components/ui/StatCard";
import { BuildingIcon, UsersIcon } from "@/src/components/icons";

export function DepartmentsClient() {
  const [view, setView] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["departments", deferredQuery],
    queryFn: () => fetchDepartments(deferredQuery),
    staleTime: 30_000
  });

  const totalHeadcount = data.reduce((sum, department) => sum + department.headcount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          label="Departments"
          value={isLoading ? "—" : String(data.length)}
          helper="Active teams"
          icon={<BuildingIcon className="h-4 w-4" />}
        />
        <StatCard
          label="Headcount"
          value={isLoading ? "—" : String(totalHeadcount)}
          helper="Total team members"
          icon={<UsersIcon className="h-4 w-4" />}
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
        searchPlaceholder="Search departments, managers, locations"
        primaryAction={{ label: "New Department", onClick: () => setView("form") }}
      />

      {isError && (
        <Card className="border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-200">
          We could not load departments right now. Please try again.
        </Card>
      )}

      {!isError && view === "list" && (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <DepartmentListView departments={data} isLoading={isLoading} />
          <DepartmentForm />
        </div>
      )}

      {!isError && view === "form" && (
        <div className="max-w-2xl">
          <DepartmentForm />
        </div>
      )}

      {!isError && view === "kanban" && (
        <Card className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Kanban view for departments will highlight team clusters and workload.
        </Card>
      )}

      {!isError && view === "calendar" && (
        <Card className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Calendar view will surface department events and reviews.
        </Card>
      )}
    </div>
  );
}
