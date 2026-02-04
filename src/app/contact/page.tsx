import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/src/components/ui/Card";
import { landingRoot, signInRoot } from "@/src/config/routes";

export const metadata: Metadata = {
  title: "Contact | HRMS Studio",
  description: "Reach the HRMS Studio team for demo feedback, support, or partnership inquiries."
};

const contactChecklist = [
  "Your name and company.",
  "The role you are evaluating in the demo.",
  "Any workflows you want to see next.",
  "Your preferred response timeline."
];

export default function ContactPage() {
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
              Contact
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
              Reach the HRMS Studio team.
            </h1>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Share feedback, request a walkthrough, or ask about integrating the demo with your
              production HRIS stack. We respond within one business day.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Contact details
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Email is the fastest way to reach the team. Include the role you are testing so we
                can route your request.
              </p>
              <address className="mt-5 not-italic text-sm text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Email</span>:
                  {" "}
                  <a
                    href="mailto:hello@hrms.studio"
                    className="text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
                  >
                    hello@hrms.studio
                  </a>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Support</span>:
                  {" "}
                  <Link className="underline-offset-4 hover:underline" href="/support">
                    Visit the support page
                  </Link>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Privacy</span>:
                  {" "}
                  <Link className="underline-offset-4 hover:underline" href="/privacy">
                    Privacy policy
                  </Link>
                </div>
              </address>
            </Card>

            <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                What to include
              </h2>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                {contactChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Already exploring the demo?
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Sign in to validate role access, then share any feedback directly with the team.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={signInRoot}
                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Sign in
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Learn about the demo
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
