import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import { SparkIcon } from "@/src/components/icons";
import { ThemeToggle } from "@/src/components/theme/ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          HRMS Studio
        </Link>
        <div className="hidden h-5 w-px bg-slate-200 md:block dark:bg-slate-800" />
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1">
            <input
              placeholder="Search employees, modules, or actions"
              aria-label="Global search"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-brand-400"
            />
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            <SparkIcon className="h-4 w-4" />
            Quick Create
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden text-xs font-semibold uppercase tracking-wide text-slate-500 lg:block dark:text-slate-400">
            Workspace: HR
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-200 dark:to-slate-400" />
        </div>
      </div>
    </header>
  );
}
