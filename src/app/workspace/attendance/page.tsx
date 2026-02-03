import { ModulePage } from "@/src/components/layout/ModulePage";

export default function AttendancePage() {
  return (
    <ModulePage
      title="Attendance"
      description="Monitor check-ins, shifts, and time logging across the workforce."
      highlights={[
        "Daily attendance logs",
        "Shift scheduling placeholders",
        "Timesheet and overtime summaries",
        "Calendar view for time tracking"
      ]}
      moduleId="attendance"
    />
  );
}
