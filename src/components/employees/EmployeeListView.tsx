import Link from "next/link";
import type { Employee } from "@/src/lib/schemas/employee";
import { ListView, type ColumnDef } from "@/src/components/views/ListView";
import { Badge } from "@/src/components/ui/Badge";
import { getWorkspacePath } from "@/src/config/routes";

const columns: ColumnDef<Employee>[] = [
  {
    key: "name",
    header: "Employee",
    cell: (employee) => (
      <div className="space-y-1">
        <Link
          href={getWorkspacePath(`employees/${employee.id}`)}
          className="text-sm font-semibold text-slate-900 hover:text-brand-600 dark:text-slate-100"
        >
          {employee.firstName} {employee.lastName}
        </Link>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {employee.employeeCode}
        </div>
      </div>
    )
  },
  {
    key: "department",
    header: "Department",
    cell: (employee) => <Badge tone="info">{employee.department}</Badge>
  },
  {
    key: "email",
    header: "Email",
    cell: (employee) => (
      <span className="text-sm text-slate-600 dark:text-slate-300">{employee.email}</span>
    )
  },
  {
    key: "manager",
    header: "Manager",
    cell: (employee) => (
      <span className="text-sm text-slate-600 dark:text-slate-300">
        {employee.managerId ? `Manager ${employee.managerId.toUpperCase()}` : "Executive"}
      </span>
    )
  },
  {
    key: "hiredOn",
    header: "Hired",
    cell: (employee) => (
      <span className="text-sm text-slate-600 dark:text-slate-300">{employee.hiredOn}</span>
    )
  }
];

export function EmployeeListView({
  employees,
  isLoading
}: {
  employees: Employee[];
  isLoading?: boolean;
}) {
  return (
    <ListView
      columns={columns}
      rows={employees}
      rowKey={(employee) => employee.id}
      isLoading={isLoading}
      emptyState={{
        title: "No employees found",
        description: "Try adjusting your filters or create a new employee."
      }}
    />
  );
}
