import type { Employee } from "@/src/lib/schemas/employee";
import { EmployeeCard } from "@/src/components/EmployeeCard";
import { EmptyState } from "@/src/components/views/EmptyState";

export function EmployeeKanbanView({ employees }: { employees: Employee[] }) {
  const groups = employees.reduce<Record<string, Employee[]>>((acc, employee) => {
    acc[employee.department] = acc[employee.department] ?? [];
    acc[employee.department].push(employee);
    return acc;
  }, {});

  const departments = Object.keys(groups);

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {departments.length === 0 ? (
        <div className="xl:col-span-3">
          <EmptyState
            title="No employees to group"
            description="Create a new employee to populate the kanban board."
          />
        </div>
      ) : (
        departments.map((department) => (
          <div key={department} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {department}
              </h3>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {groups[department].length}
              </span>
            </div>
            <div className="space-y-3">
              {groups[department].map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
