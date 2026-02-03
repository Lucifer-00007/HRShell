import { EmployeesClient } from "@/src/components/employees/EmployeesClient";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { RoleGate } from "@/src/components/auth/RoleGate";

export default function EmployeesPage() {
  return (
    <RoleGate moduleId="employees">
      <div className="space-y-6">
        <PageHeader
          title="Employees"
          description="Search and manage employee records backed by MSW mocks. Swap in real APIs when the backend is ready."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employees" }]}
        />
        <EmployeesClient />
      </div>
    </RoleGate>
  );
}
