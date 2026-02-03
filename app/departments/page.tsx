import { DepartmentsClient } from "@/src/components/departments/DepartmentsClient";
import { PageHeader } from "@/src/components/layout/PageHeader";

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments"
        description="Define org structures, managers, and reporting lines with mocked data."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]}
      />
      <DepartmentsClient />
    </div>
  );
}
