import { ModulePage } from "@/src/components/layout/ModulePage";

export default function PayrollPage() {
  return (
    <ModulePage
      title="Payroll"
      description="Run payroll cycles, review payslips, and export reports (UI only)."
      highlights={[
        "Payroll run wizard UI",
        "Payslip list and detail layout",
        "Approval checkpoints",
        "Export & filing placeholders"
      ]}
      moduleId="payroll"
    />
  );
}
