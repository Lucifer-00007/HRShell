import { ModulePage } from "@/src/components/layout/ModulePage";

export default function ExpensesPage() {
  return (
    <ModulePage
      title="Expenses"
      description="Capture reimbursements, approvals, and finance reviews."
      highlights={[
        "Expense submission form",
        "Approval queue layout",
        "Policy validation placeholders",
        "Receipts and notes UI"
      ]}
      moduleId="expenses"
    />
  );
}
