import type { Role } from "@/src/config/rbac";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  team: string;
};

export const authUsers: AuthUser[] = [
  {
    id: "employee-avery",
    name: "Avery Chen",
    email: "avery.chen@acmehr.com",
    role: "employee",
    title: "Customer Success Associate",
    team: "Support"
  },
  {
    id: "hr-mia",
    name: "Mia Patel",
    email: "mia.patel@acmehr.com",
    role: "hr",
    title: "HR Business Partner",
    team: "People Ops"
  },
  {
    id: "admin-jordan",
    name: "Jordan Kim",
    email: "jordan.kim@acmehr.com",
    role: "admin",
    title: "HR Systems Admin",
    team: "Operations"
  }
];

export const authStorageKey = "hrms.auth.user";
