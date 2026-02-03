import { EmployeesClient } from "@/src/components/employees/EmployeesClient";
import { PageHeader } from "@/src/components/layout/PageHeader";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Search and manage employee records backed by MSW mocks. Swap in real APIs when the backend is ready."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Employees" }]}
      />
      <EmployeesClient />
    </div>
  );
}
