import type { ReactNode } from "react";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { TopBar } from "@/src/components/layout/TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.08),_transparent_45%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.08),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.15),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_45%)]">
      <TopBar />
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16">
        <div className="grid gap-6 pt-6 lg:grid-cols-[240px_1fr]">
          <Sidebar />
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
