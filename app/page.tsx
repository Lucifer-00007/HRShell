import Link from "next/link";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";
import { AuthMenu } from "@/src/components/auth/AuthMenu";
import { modules } from "@/src/config/modules";
import { roleMeta } from "@/src/config/rbac";
import { workspaceRoot } from "@/src/config/routes";

const highlights = [
  {
    title: "Instant role switching",
    description: "Preview employee, HR, and admin experiences without a backend."
  },
  {
    title: "Workspace-first UX",
    description: "Dense navigation, quick actions, and module previews mirror production flows."
  },
  {
    title: "Mock-ready data",
    description: "Swap in real APIs later while keeping the frontend stable."
  }
];

const experienceSteps = [
  {
    title: "Choose a demo role",
    description: "Sign in from the header to unlock the workspace for that role."
  },
  {
    title: "Open the workspace",
    description: "Jump into the launchpad to explore modules and flows."
  },
  {
    title: "Validate access",
    description: "RBAC gates show what each role can view or manage."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.2),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_45%)] pb-16">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-100 dark:text-slate-900">
              HR
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">HRMS Studio</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Demo-ready workspace</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
            <a className="transition hover:text-slate-900 dark:hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-slate-900 dark:hover:text-white" href="#roles">
              Roles
            </a>
            <a className="transition hover:text-slate-900 dark:hover:text-white" href="#modules">
              Modules
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <AuthMenu />
            <Link
              href={workspaceRoot}
              className="hidden rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 md:inline-flex dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Enter Workspace
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-6 pt-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge tone="info">New demo experience</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
              A dedicated landing hub for HRMS role-based previews.
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
              Give stakeholders a polished starting point, then guide them into a protected
              workspace that adapts to employees, HR teams, and admins.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={workspaceRoot}
                className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Launch workspace
              </Link>
              <a
                href="#roles"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Explore roles
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <Card key={item.title} className="border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/70">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="border-slate-200/70 bg-white/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/70">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge tone="success">Role access</Badge>
                <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Protected workspace
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Built for secure handoffs
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The dashboard is now hidden behind demo authentication. Only signed-in roles can
                access workspace pages and controls.
              </p>
              <div className="space-y-3">
                {experienceSteps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section id="features" className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Launch-ready navigation",
              description: "Dedicated landing and workspace routes keep stakeholders oriented."
            },
            {
              title: "RBAC-aware modules",
              description: "Modules surface access levels and stay locked for unauthorized roles."
            },
            {
              title: "Future-proof data",
              description: "Dummy data can be replaced by a real database without UI rewrites."
            }
          ].map((feature) => (
            <Card key={feature.title} className="border-slate-200/70 bg-white/80 p-5 dark:border-slate-800/70 dark:bg-slate-900/70">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </section>

        <section id="roles" className="grid gap-4 lg:grid-cols-3">
          {Object.entries(roleMeta).map(([key, meta]) => (
            <Card key={key} className="border-slate-200/70 bg-white/90 p-5 dark:border-slate-800/70 dark:bg-slate-900/70">
              <Badge tone={meta.badgeTone}>{meta.label}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {meta.label} experience
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {meta.description}
              </p>
            </Card>
          ))}
        </section>

        <section id="modules" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Workspace modules
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Preview the dashboard footprint
              </h2>
            </div>
            <Link
              href={workspaceRoot}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              View workspace
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <Card key={module.id} className="border-slate-200/70 bg-white/90 p-4 dark:border-slate-800/70 dark:bg-slate-900/70">
                <div className="flex items-start justify-between">
                  <module.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <Badge tone={module.status === "mocked" ? "success" : "warning"}>
                    {module.status === "mocked" ? "Mocked" : "UI only"}
                  </Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {module.name}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {module.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
