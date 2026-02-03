import { ModuleLauncher } from "@/src/components/layout/ModuleLauncher";
import { PageHeader } from "@/src/components/layout/PageHeader";
import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { HomeAuthOverview } from "@/src/components/home/HomeAuthOverview";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Odoo-inspired HRMS workspace"
        description="Launch modules, explore workflows, and refine UX with mocked data. Backend services stay paused until the UI is production-ready."
        breadcrumbs={[{ label: "Home" }]}
        actions={<Badge tone="success">Frontend only</Badge>}
      />

      <HomeAuthOverview />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Unified app shell",
            body: "Global search, quick actions, and module navigation mirror Odoo’s workflow density."
          },
          {
            title: "View engine",
            body: "List, kanban, form, and calendar views share a single design system."
          },
          {
            title: "Mocked workflows",
            body: "MSW drives realistic data, errors, and latency to simulate production behavior."
          }
        ].map((card) => (
          <Card key={card.title} className="p-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.body}</p>
          </Card>
        ))}
      </section>

      <ModuleLauncher />
    </div>
  );
}
