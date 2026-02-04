import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import type { CodeLine } from "@/src/components/ui/CodePreview";
import { modules } from "@/src/config/modules";
import { roleMeta } from "@/src/config/rbac";
import { LandingHeaderActions } from "@/src/components/landing/LandingHeaderActions";
import { WorkspaceLink } from "@/src/components/landing/WorkspaceLink";

// Load the client-only code preview lazily to keep the above-the-fold bundle lean.
const CodePreview = dynamic(() => import("@/src/components/ui/CodePreview").then((mod) => mod.CodePreview), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 text-sm text-slate-500 dark:border-slate-800/70 dark:bg-slate-900/70">
      Loading code preview...
    </div>
  )
});

const heroHighlights = [
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

const featureCards = [
  {
    title: "Launch-ready navigation",
    description: "Dedicated landing and workspace routes keep stakeholders oriented.",
    image: "/images/landing/feature-navigation.png",
    alt: "Navigation preview showing a structured workspace layout"
  },
  {
    title: "RBAC-aware modules",
    description: "Modules surface access levels and stay locked for unauthorized roles.",
    image: "/images/landing/feature-access.png",
    alt: "Role cards highlighting employee, HR, and admin access"
  },
  {
    title: "Future-proof data",
    description: "Dummy data can be replaced by a real database without UI rewrites.",
    image: "/images/landing/feature-data.png",
    alt: "Chart preview representing stable data pipelines"
  }
];

const codeLines: CodeLine[] = [
  [
    { text: "import ", className: "text-sky-300" },
    { text: "{ ", className: "text-slate-200" },
    { text: "defineRoles", className: "text-emerald-300" },
    { text: ", ", className: "text-slate-200" },
    { text: "buildWorkspace", className: "text-emerald-300" },
    { text: " } ", className: "text-slate-200" },
    { text: "from ", className: "text-sky-300" },
    { text: '"@/src/config/rbac"', className: "text-amber-200" },
    { text: ";", className: "text-slate-200" }
  ],
  [{ text: "" }],
  [
    { text: "type ", className: "text-sky-300" },
    { text: "DemoRole", className: "text-emerald-300" },
    { text: " = ", className: "text-slate-200" },
    { text: '"employee"', className: "text-amber-200" },
    { text: " | ", className: "text-slate-200" },
    { text: '"hr"', className: "text-amber-200" },
    { text: " | ", className: "text-slate-200" },
    { text: '"admin"', className: "text-amber-200" },
    { text: ";", className: "text-slate-200" }
  ],
  [{ text: "" }],
  [
    { text: "const ", className: "text-sky-300" },
    { text: "demoRoles", className: "text-slate-100" },
    { text: " = ", className: "text-slate-200" },
    { text: "defineRoles", className: "text-emerald-300" },
    { text: "<", className: "text-slate-200" },
    { text: "DemoRole", className: "text-emerald-300" },
    { text: ">({", className: "text-slate-200" }
  ],
  [
    { text: "  employee", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: "[", className: "text-slate-200" },
    { text: '"profile"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"time"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"expenses"', className: "text-amber-200" },
    { text: "],", className: "text-slate-200" }
  ],
  [
    { text: "  hr", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: "[", className: "text-slate-200" },
    { text: '"people"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"contracts"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"payroll"', className: "text-amber-200" },
    { text: "],", className: "text-slate-200" }
  ],
  [
    { text: "  admin", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: "[", className: "text-slate-200" },
    { text: '"audit"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"permissions"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"billing"', className: "text-amber-200" },
    { text: "]", className: "text-slate-200" }
  ],
  [{ text: "});", className: "text-slate-200" }],
  [{ text: "" }],
  [
    { text: "export ", className: "text-sky-300" },
    { text: "const ", className: "text-sky-300" },
    { text: "workspace", className: "text-slate-100" },
    { text: " = ", className: "text-slate-200" },
    { text: "buildWorkspace", className: "text-emerald-300" },
    { text: "({", className: "text-slate-200" }
  ],
  [
    { text: "  roles", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: "demoRoles", className: "text-slate-100" },
    { text: ",", className: "text-slate-200" }
  ],
  [
    { text: "  defaultRole", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: '"employee"', className: "text-amber-200" },
    { text: ",", className: "text-slate-200" }
  ],
  [
    { text: "  features", className: "text-slate-100" },
    { text: ": ", className: "text-slate-200" },
    { text: "[", className: "text-slate-200" },
    { text: '"secure-handoff"', className: "text-amber-200" },
    { text: ", ", className: "text-slate-200" },
    { text: '"mock-data"', className: "text-amber-200" },
    { text: "]", className: "text-slate-200" }
  ],
  [{ text: "});", className: "text-slate-200" }]
];

export default function LandingPage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-emerald-50 pb-16 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
    >
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
          <LandingHeaderActions />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-6 pt-12">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge tone="info" className="motion-safe:animate-fade-up">New demo experience</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl motion-safe:animate-fade-up motion-safe:[animation-delay:120ms]">
              A dedicated landing hub for{" "}
              <span className="text-brand-600 dark:text-brand-300">HRMS role-based previews.</span>
            </h1>
            <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
              Give stakeholders a polished starting point, then guide them into a protected
              workspace that adapts to employees, HR teams, and admins.
            </p>
            <div className="flex flex-wrap items-center gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:260ms]">
              <WorkspaceLink className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                Launch workspace
              </WorkspaceLink>
              <Link
                href="#roles"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Explore roles
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 motion-safe:animate-fade-up motion-safe:[animation-delay:340ms]">
              {heroHighlights.map((item) => (
                <Card
                  key={item.title}
                  className="border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-900/70"
                >
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

          <div className="space-y-5">
            <Card className="border-slate-200/70 bg-white/90 p-6 dark:border-slate-800/70 dark:bg-slate-900/70 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
              <div className="flex items-center justify-between">
                <Badge tone="success">Role access</Badge>
                <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Protected workspace
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Built for secure handoffs
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                The dashboard is hidden behind demo authentication. Only signed-in roles can access
                workspace pages and controls.
              </p>
              <div className="mt-5 space-y-3">
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
            </Card>
          </div>
        </section>

        <section id="features" aria-labelledby="features-title" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Feature highlights
              </p>
              <h2 id="features-title" className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Built to feel production-ready
              </h2>
            </div>
            <Link
              href="/about"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              About the demo
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card
                key={feature.title}
                className="flex h-full flex-col gap-4 border-slate-200/70 bg-white/90 p-5 dark:border-slate-800/70 dark:bg-slate-900/70"
              >
                <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={720}
                    height={480}
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <Badge tone="info">Developer handoff</Badge>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Share a realistic API contract alongside the UI.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Give engineers a ready-to-wire role matrix while stakeholders explore the demo.
              The configuration below mirrors how modules will be gated once backend APIs are live.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Typed roles map directly to workspace modules.</li>
              <li>Default roles keep demos consistent across reviews.</li>
              <li>Feature flags mark experiences that are UI-only today.</li>
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <WorkspaceLink className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
                View workspace
              </WorkspaceLink>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Share feedback
              </Link>
            </div>
          </div>
          <CodePreview title="RBAC preview" lines={codeLines} className="motion-safe:animate-fade-up" />
        </section>

        <section id="roles" aria-labelledby="roles-title" className="grid gap-4 lg:grid-cols-3">
          <h2 id="roles-title" className="sr-only">
            Role experiences
          </h2>
          {Object.entries(roleMeta).map(([key, meta]) => (
            <Card
              key={key}
              className="border-slate-200/70 bg-white/90 p-5 dark:border-slate-800/70 dark:bg-slate-900/70"
            >
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

        <section id="modules" aria-labelledby="modules-title" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Workspace modules
              </p>
              <h2 id="modules-title" className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Preview the dashboard footprint
              </h2>
            </div>
            <WorkspaceLink className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              View workspace
            </WorkspaceLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="border-slate-200/70 bg-white/90 p-4 dark:border-slate-800/70 dark:bg-slate-900/70"
              >
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

        <footer className="mt-8 border-t border-white/60 pb-10 pt-8 text-sm text-slate-600 dark:border-slate-800/70 dark:text-slate-300">
          <div className="grid gap-6 md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">HRMS Studio</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A dedicated landing hub for role-based HRMS previews and secure workspace entry.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Essentials
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a className="transition hover:text-slate-900 dark:hover:text-white" href="#features">
                  Features
                </a>
                <a className="transition hover:text-slate-900 dark:hover:text-white" href="#roles">
                  Roles
                </a>
                <a className="transition hover:text-slate-900 dark:hover:text-white" href="#modules">
                  Modules
                </a>
                <WorkspaceLink className="transition hover:text-slate-900 dark:hover:text-white">
                  Workspace
                </WorkspaceLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Contact
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/contact">
                  Contact page
                </Link>
                <a className="transition hover:text-slate-900 dark:hover:text-white" href="mailto:hello@hrms.studio">
                  hello@hrms.studio
                </a>
                <a className="transition hover:text-slate-900 dark:hover:text-white" href="#top">
                  Back to top
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>© 2026 HRMS Studio. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/about">
                About
              </Link>
              <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/contact">
                Contact
              </Link>
              <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/terms">
                Terms
              </Link>
              <Link className="transition hover:text-slate-900 dark:hover:text-white" href="/support">
                Support
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
