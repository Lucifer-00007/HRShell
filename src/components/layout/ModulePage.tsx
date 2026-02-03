import { PageHeader } from "@/src/components/layout/PageHeader";
import { ModulePlaceholder } from "@/src/components/layout/ModulePlaceholder";
import { RoleGate } from "@/src/components/auth/RoleGate";
import type { ModuleId } from "@/src/config/modules";

export function ModulePage({
  title,
  description,
  highlights,
  moduleId
}: {
  title: string;
  description: string;
  highlights: string[];
  moduleId: ModuleId;
}) {
  return (
    <RoleGate moduleId={moduleId}>
      <div className="space-y-6">
        <PageHeader
          title={title}
          description={description}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        />
        <ModulePlaceholder title={title} description={description} highlights={highlights} />
      </div>
    </RoleGate>
  );
}
