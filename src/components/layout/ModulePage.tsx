import { PageHeader } from "@/src/components/layout/PageHeader";
import { ModulePlaceholder } from "@/src/components/layout/ModulePlaceholder";

export function ModulePage({
  title,
  description,
  highlights
}: {
  title: string;
  description: string;
  highlights: string[];
}) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <ModulePlaceholder title={title} description={description} highlights={highlights} />
    </div>
  );
}
