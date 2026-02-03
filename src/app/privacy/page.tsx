import Link from "next/link";
import { Card } from "@/src/components/ui/Card";
import { landingRoot } from "@/src/config/routes";

export default function PrivacyPage() {
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
        <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Privacy
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Privacy overview
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            This demo experience stores authentication state locally in your browser. When the
            production backend is connected, replace this placeholder with your official privacy
            policy.
          </p>
          <ul className="mt-6 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>No real credentials are collected in this demo.</li>
            <li>All data shown is mocked and stored client-side.</li>
            <li>Replace this section with legal language before launch.</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
