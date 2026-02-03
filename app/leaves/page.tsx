import { ModulePage } from "@/src/components/layout/ModulePage";

export default function LeavesPage() {
  return (
    <ModulePage
      title="Leaves"
      description="Submit, approve, and track time off requests across teams."
      highlights={[
        "Leave request flow with calendars",
        "Approval inbox and bulk actions",
        "Leave balance summary cards",
        "Policy-aware validation placeholders"
      ]}
    />
  );
}
