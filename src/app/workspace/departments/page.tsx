import { DepartmentsClient } from "@/src/components/departments/DepartmentsClient";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { RoleGate } from "@/src/components/auth/RoleGate";
import { workspaceRoot } from "@/src/config/routes";

export default function DepartmentsPage() {
  return (
    <RoleGate moduleId="departments">
      <div className="space-y-6">
        <PageHeader
          title="Departments"
          description="Define org structures, managers, and reporting lines with mocked data."
          breadcrumbs={[{ label: "Workspace", href: workspaceRoot }, { label: "Departments" }]}
        />
        <DepartmentsClient />
      </div>
    </RoleGate>
  );
}
