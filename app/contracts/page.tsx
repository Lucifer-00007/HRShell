import { ModulePage } from "@/src/components/layout/ModulePage";

export default function ContractsPage() {
  return (
    <ModulePage
      title="Contracts"
      description="Track employment agreements, renewals, and compliance data."
      highlights={[
        "Contract list with status chips",
        "Renewal and end-date reminders",
        "Salary & benefits placeholders",
        "Audit-ready contract timeline"
      ]}
      moduleId="contracts"
    />
  );
}
