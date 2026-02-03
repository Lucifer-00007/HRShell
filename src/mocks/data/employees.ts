import type { Employee } from "@/src/lib/schemas/employee";

export const employees = [
  {
    id: "e1",
    employeeCode: "EMP-001",
    firstName: "Asha",
    lastName: "Sharma",
    email: "asha.sharma@example.com",
    department: "Engineering",
    managerId: "e3",
    hiredOn: "2023-04-01"
  },
  {
    id: "e2",
    employeeCode: "EMP-002",
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul.kumar@example.com",
    department: "People Ops",
    managerId: "e3",
    hiredOn: "2022-08-15"
  },
  {
    id: "e3",
    employeeCode: "EMP-003",
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya.reddy@example.com",
    department: "Executive",
    managerId: null,
    hiredOn: "2020-11-20"
  },
  {
    id: "e4",
    employeeCode: "EMP-004",
    firstName: "Marcus",
    lastName: "Nguyen",
    email: "marcus.nguyen@example.com",
    department: "Finance",
    managerId: "e3",
    hiredOn: "2021-02-12"
  },
  {
    id: "e5",
    employeeCode: "EMP-005",
    firstName: "Sara",
    lastName: "Ibrahim",
    email: "sara.ibrahim@example.com",
    department: "Design",
    managerId: "e1",
    hiredOn: "2023-09-05"
  }
] satisfies Employee[];
