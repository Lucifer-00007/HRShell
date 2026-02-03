"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchEmployee } from "@/src/lib/api/employees";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";

export function EmployeeDetail({ employeeId }: { employeeId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => fetchEmployee(employeeId),
    staleTime: 30_000
  });

  if (isLoading) {
    return (
      <Card className="p-6 text-sm text-slate-600">
        Loading employee details…
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="border-red-200 bg-red-50 p-6 text-sm text-red-700">
        We could not load this employee. Try again.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge tone="info">Profile</Badge>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {data.firstName} {data.lastName}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {data.employeeCode}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            Active
          </div>
        </div>
        <div className="mt-6 grid gap-4 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Email</p>
            <p className="font-medium">{data.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Department</p>
            <p className="font-medium">{data.department}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Manager ID</p>
            <p className="font-medium">{data.managerId ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Hired On</p>
            <p className="font-medium">{data.hiredOn}</p>
          </div>
        </div>
      </Card>
      <Card className="p-5 text-sm text-slate-600 dark:text-slate-300">
        Payroll, leave, and performance sections will appear here once mocked flows
        are expanded.
      </Card>
    </div>
  );
}
