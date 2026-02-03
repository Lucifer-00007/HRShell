import type { HTMLAttributes } from "react";
import { cn } from "@/src/lib/cn";

type IconProps = HTMLAttributes<SVGSVGElement> & { title?: string };

function BaseIcon({ className, title, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </BaseIcon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z" />
      <path d="M8 13c2.2 0 4-1.8 4-4S10.2 5 8 5 4 6.8 4 9s1.8 4 4 4z" />
      <path d="M2.5 20c.7-2.4 3.1-4 5.5-4" />
      <path d="M14 16c2.2 0 4.2 1.2 5 3" />
    </BaseIcon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="3" width="16" height="18" />
      <path d="M9 7h2" />
      <path d="M13 7h2" />
      <path d="M9 11h2" />
      <path d="M13 11h2" />
      <path d="M9 15h2" />
      <path d="M13 15h2" />
    </BaseIcon>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </BaseIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 10h18" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M16 10h3" />
      <path d="M3 9h14" />
    </BaseIcon>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </BaseIcon>
  );
}

export function ReceiptIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 3h10a2 2 0 0 1 2 2v15l-2-1-2 1-2-1-2 1-2-1-2 1V5a2 2 0 0 1 2-2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </BaseIcon>
  );
}

export function KanbanIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="7" height="16" rx="1" />
      <rect x="14" y="4" width="7" height="8" rx="1" />
      <rect x="14" y="14" width="7" height="6" rx="1" />
    </BaseIcon>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </BaseIcon>
  );
}

export function FormIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </BaseIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
    </BaseIcon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="M17.7 17.7l1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.9 19.1l1.4-1.4" />
      <path d="M17.7 6.3l1.4-1.4" />
    </BaseIcon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20.6 14.5A8 8 0 1 1 9.5 3.4a6 6 0 1 0 11.1 11.1z" />
    </BaseIcon>
  );
}
