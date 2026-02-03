import Link from "next/link";
import { modules, moduleGroups } from "@/src/config/modules";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/cn";

export function ModuleLauncher() {
  return (
    <div className="space-y-8">
      {(Object.keys(moduleGroups) as Array<keyof typeof moduleGroups>).map((groupKey) => {
        const group = moduleGroups[groupKey];
        const groupModules = modules.filter((module) => module.group === groupKey);
        return (
          <section key={groupKey} className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {group.label}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {group.description}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groupModules.map((module) => (
                <Link key={module.id} href={module.href} className="group">
                  <Card
                    className={cn(
                      "h-full border-slate-200/80 bg-gradient-to-br p-5 transition group-hover:-translate-y-1 group-hover:shadow-lg dark:border-slate-800/80",
                      module.accent
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="rounded-2xl bg-white/80 p-2 text-slate-800 shadow-sm dark:bg-slate-950/70 dark:text-slate-200">
                        <module.icon className="h-5 w-5" />
                      </div>
                      <Badge tone={module.status === "mocked" ? "success" : "warning"}>
                        {module.status === "mocked" ? "Mocked" : "UI only"}
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {module.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {module.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
