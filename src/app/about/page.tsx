import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/src/components/ui/Card";
import { landingRoot, signInRoot } from "@/src/config/routes";

export const metadata: Metadata = {
  title: "About | HRMS Studio",
  description: "Learn how HRMS Studio delivers role-based HRMS demos with a production-style workspace."
};

const principles = [
  "Role-first navigation that mirrors real HR operations.",
  "Clear separation between public landing content and protected workspace flows.",
  "Mocked data that can be replaced by APIs without a UI rewrite.",
  "Fast iteration loops for stakeholders, HR teams, and designers."
];

const highlights = [
  {
    title: "What we build",
    description:
      "A demo-ready HRMS front end with role-based access, dense modules, and realistic workflows."
  },
  {
    title: "Who it is for",
    description:
      "Product teams, HR leaders, and stakeholders who need a safe environment to evaluate the experience."
  }
];

const demoSteps = [
  "Choose a role from the sign-in flow.",
  "Explore modules tailored to employee, HR, and admin personas.",
  "Share feedback while the UI stays production-ready."
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_45%)]">
      <header className="border-b border-white/60 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-[960px] items-center justify-between px-6 py-4">
          <Link href={landingRoot} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            HRMS Studio
          </Link>
          <Link href={landingRoot} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Back to home
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[960px] px-6 py-12">
        <div className="space-y-6">
          <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              About
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
              HRMS Studio is a demo-first HRMS experience.
            </h1>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              We help teams preview role-based HR workflows without exposing real employee data. The
              landing hub and protected workspace give stakeholders a realistic view of how the
              HRMS will feel once production integrations are in place.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {highlights.map((item) => (
                <Card
                  key={item.title}
                  className="border-slate-200/70 bg-white/80 p-5 dark:border-slate-800/70 dark:bg-slate-900/70"
                >
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Product principles
            </h2>
            <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              How the demo works
            </h2>
            <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
              {demoSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={signInRoot}
                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Start the demo
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Contact us
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
