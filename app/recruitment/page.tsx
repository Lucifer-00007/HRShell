import { ModulePage } from "@/src/components/layout/ModulePage";

export default function RecruitmentPage() {
  return (
    <ModulePage
      title="Recruitment"
      description="Manage candidate pipelines, interviews, and hiring decisions."
      highlights={[
        "Pipeline kanban with stages",
        "Candidate profile forms",
        "Interview scheduling placeholders",
        "Offer workflow preview"
      ]}
    />
  );
}
