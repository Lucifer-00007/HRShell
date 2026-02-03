import type { Role } from "@/src/config/rbac";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  team: string;
  password: string;
};

export const demoPassword = "demo1234";

export const authUsers: AuthUser[] = [
  {
    id: "employee-avery",
    name: "Avery Chen",
    email: "avery.chen@acmehr.com",
    role: "employee",
    title: "Customer Success Associate",
    team: "Support",
    password: demoPassword
  },
  {
    id: "hr-mia",
    name: "Mia Patel",
    email: "mia.patel@acmehr.com",
    role: "hr",
    title: "HR Business Partner",
    team: "People Ops",
    password: demoPassword
  },
  {
    id: "admin-jordan",
    name: "Jordan Kim",
    email: "jordan.kim@acmehr.com",
    role: "admin",
    title: "HR Systems Admin",
    team: "Operations",
    password: demoPassword
  }
];

export const authStorageKey = "hrms.auth.user";
