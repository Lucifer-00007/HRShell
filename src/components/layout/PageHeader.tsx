import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/src/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  breadcrumbs = [],
  actions,
  children
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {breadcrumbs.length > 0 && (
        <nav
          className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  className="transition hover:text-slate-900 dark:hover:text-slate-100"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-700 dark:text-slate-300">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1
            className={cn(
              "text-2xl font-semibold text-slate-900 dark:text-slate-100",
              !description && "mt-1"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              {description}
            </p>
          )}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
