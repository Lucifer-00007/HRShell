import Link from "next/link";
import type { Employee } from "@/src/lib/schemas/employee";
import { Card } from "@/src/components/ui/Card";
import { getEmployeeDetailPath } from "@/src/config/routes";

type EmployeeCardProps = {
  employee: Employee;
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {employee.employeeCode}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {employee.department}
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        {employee.email}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Hired {employee.hiredOn}</span>
        <Link
          href={getEmployeeDetailPath(employee.id)}
          className="font-semibold text-brand-600 hover:text-brand-500"
        >
          View
        </Link>
      </div>
    </Card>
  );
}
