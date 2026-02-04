import Link from "next/link";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";
import { modules } from "@/src/config/modules";
import { roleMeta } from "@/src/config/rbac";
import { LandingHeaderActions } from "@/src/components/landing/LandingHeaderActions";
import { WorkspaceLink } from "@/src/components/landing/WorkspaceLink";
import { RocketIcon, LockIcon, DatabaseIcon } from "@/src/components/icons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 font-sans">
      {/* Navigation */}
      <nav className="fixed z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-card-dark/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                HR
              </div>
              <div>
                <h1 className="text-sm font-bold leading-none text-text-light dark:text-white">
                  HRMS Studio
                </h1>
                <p className="mt-0.5 text-xs text-text-muted-light dark:text-text-muted-dark">
                  Demo-ready workspace
                </p>
              </div>
            </div>
            <div className="hidden space-x-8 md:flex">
              <a
                className="text-sm font-medium text-text-light transition-colors hover:text-primary dark:text-text-dark"
                href="#features"
              >
                Features
              </a>
              <a
                className="text-sm font-medium text-text-light transition-colors hover:text-primary dark:text-text-dark"
                href="#roles"
              >
                Roles
              </a>
              <a
                className="text-sm font-medium text-text-light transition-colors hover:text-primary dark:text-text-dark"
                href="#modules"
              >
                Modules
              </a>
            </div>
            <LandingHeaderActions />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
        {/* Gradient Background & Blobs */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background-light to-indigo-50 dark:from-background-dark dark:to-indigo-950/30" />
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/10"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Text & Buttons */}
            <div className="space-y-8 lg:col-span-7">
              <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-xs font-bold tracking-wide uppercase text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                New Demo Experience
              </span>
              <h1 className="text-5xl font-extrabold tracking-tight text-text-light leading-[1.1] dark:text-white lg:text-6xl">
                A dedicated landing hub for{" "}
                <span className="text-primary">HRMS role-based</span> previews.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                Give stakeholders a polished starting point, then guide them into a protected
                workspace that adapts to employees, HR teams, and admins.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <WorkspaceLink className="transform rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover">
                  Launch workspace
                </WorkspaceLink>
                <Link
                  href="#roles"
                  className="rounded-full border border-gray-200 bg-white px-8 py-3.5 font-semibold text-text-light shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-card-dark dark:text-white"
                >
                  Explore roles
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
                <div className="rounded-xl border border-white/20 bg-white/60 p-6 shadow-soft backdrop-blur-sm dark:border-gray-700 dark:bg-card-dark/40">
                  <h3 className="mb-2 text-sm font-bold text-text-light dark:text-white">
                    Instant role switching
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                    Preview employee, HR, and admin experiences without a backend.
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/60 p-6 shadow-soft backdrop-blur-sm dark:border-gray-700 dark:bg-card-dark/40">
                  <h3 className="mb-2 text-sm font-bold text-text-light dark:text-white">
                    Workspace-first UX
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                    Dense navigation and module previews mirror production flows.
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/60 p-6 shadow-soft backdrop-blur-sm dark:border-gray-700 dark:bg-card-dark/40">
                  <h3 className="mb-2 text-sm font-bold text-text-light dark:text-white">
                    Mock-ready data
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                    Swap in real APIs later while keeping the frontend stable.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Secure Handoffs Card */}
            <div className="relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-card-dark">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-400 to-emerald-600"></div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Role Access
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark">
                    Protected Workspace
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-text-light dark:text-white">
                  Built for secure handoffs
                </h2>
                <p className="mb-8 text-sm text-text-muted-light dark:text-text-muted-dark">
                  The dashboard is now hidden behind demo authentication. Only signed-in roles can
                  access workspace pages.
                </p>
                <div className="relative space-y-6">
                  <div className="absolute bottom-4 left-4 top-4 -z-10 w-0.5 bg-gray-100 dark:bg-gray-700"></div>
                  <div className="group flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-light text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 dark:bg-white dark:text-background-dark">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-light dark:text-white">
                        Choose a demo role
                      </h4>
                      <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                        Sign in from the header to unlock the workspace for that role.
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-light text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 dark:bg-white dark:text-background-dark">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-light dark:text-white">
                        Open the workspace
                      </h4>
                      <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                        Jump into the launchpad to explore modules and flows.
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-light text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 dark:bg-white dark:text-background-dark">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-light dark:text-white">
                        Validate access
                      </h4>
                      <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                        RBAC gates show what each role can view or manage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {/* Features Section */}
        <section id="features" className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-hover dark:border-gray-800 dark:bg-card-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-primary dark:bg-indigo-900/20">
              <RocketIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-text-light dark:text-white">
              Launch-ready navigation
            </h3>
            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              Dedicated landing and workspace routes keep stakeholders oriented with clear pathways.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-hover dark:border-gray-800 dark:bg-card-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <LockIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-text-light dark:text-white">
              RBAC-aware modules
            </h3>
            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              Modules surface access levels and stay locked for unauthorized roles automatically.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft transition-all duration-300 hover:shadow-hover dark:border-gray-800 dark:bg-card-dark">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <DatabaseIcon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-lg font-bold text-text-light dark:text-white">
              Future-proof data
            </h3>
            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              Dummy data can be replaced by a real database without UI rewrites.
            </p>
          </div>
        </section>

        {/* Roles Section */}
        <section id="roles" aria-labelledby="roles-title" className="grid gap-4 lg:grid-cols-3">
          <h2 id="roles-title" className="sr-only">
            Role experiences
          </h2>
          {Object.entries(roleMeta).map(([key, meta]) => (
            <Card
              key={key}
              className="border-gray-200/70 bg-white/90 p-5 dark:border-gray-800/70 dark:bg-card-dark/70"
            >
              <Badge tone={meta.badgeTone}>{meta.label}</Badge>
              <h3 className="mt-3 text-lg font-semibold text-text-light dark:text-white">
                {meta.label} experience
              </h3>
              <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                {meta.description}
              </p>
            </Card>
          ))}
        </section>

        {/* Modules Section */}
        <section id="modules" aria-labelledby="modules-title" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted-light dark:text-text-muted-dark">
                Workspace modules
              </p>
              <h2
                id="modules-title"
                className="mt-2 text-2xl font-semibold text-text-light dark:text-white"
              >
                Preview the dashboard footprint
              </h2>
            </div>
            <WorkspaceLink className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-gray-800 dark:bg-card-dark dark:text-slate-200">
              View workspace
            </WorkspaceLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="border-gray-200/70 bg-white/90 p-4 dark:border-gray-800/70 dark:bg-card-dark/70"
              >
                <div className="flex items-start justify-between">
                  <module.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                  <Badge tone={module.status === "mocked" ? "success" : "warning"}>
                    {module.status === "mocked" ? "Mocked" : "UI only"}
                  </Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-text-light dark:text-white">
                  {module.name}
                </p>
                <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                  {module.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white py-10 text-sm text-slate-600 dark:border-gray-800 dark:bg-slate-950 dark:text-slate-400 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">HRMS Studio</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A dedicated landing hub for role-based HRMS previews and secure workspace entry.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Essentials
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="#roles"
                  >
                    Roles
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="#modules"
                  >
                    Modules
                  </a>
                </li>
                <li>
                  <WorkspaceLink className="transition hover:text-slate-900 dark:hover:text-white">
                    Workspace
                  </WorkspaceLink>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Contact
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <Link
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="/contact"
                  >
                    Contact page
                  </Link>
                </li>
                <li>
                  <a
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="mailto:hello@hrms.studio"
                  >
                    hello@hrms.studio
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-slate-900 dark:hover:text-white"
                    href="#top"
                  >
                    Back to top
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted-light dark:text-text-muted-dark">
            <span>© 2026 HRMS Studio. All rights reserved.</span>
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  className="transition hover:text-text-light dark:hover:text-white"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-text-light dark:hover:text-white"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-text-light dark:hover:text-white"
                  href="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-text-light dark:hover:text-white"
                  href="/terms"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-text-light dark:hover:text-white"
                  href="/support"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}