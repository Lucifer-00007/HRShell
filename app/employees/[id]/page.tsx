import Link from "next/link";
import { EmployeeDetail } from "@/src/components/EmployeeDetail";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { RoleGate } from "@/src/components/auth/RoleGate";

export default function EmployeeProfilePage({
  params
}: {
  params: { id: string };
}) {
  return (
    <RoleGate moduleId="employees">
      <div className="space-y-6">
        <PageHeader
          title="Employee Profile"
          description="Profile details, role, and lifecycle data."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Employees", href: "/employees" },
            { label: params.id }
          ]}
          actions={
            <Link
              href="/employees"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700"
            >
              Back to Employees
            </Link>
          }
        />
        <EmployeeDetail employeeId={params.id} />
      </div>
    </RoleGate>
  );
}
