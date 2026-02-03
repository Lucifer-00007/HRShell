import type { Department } from "@/src/lib/schemas/department";

export const departments = [
  {
    id: "d1",
    name: "Engineering",
    managerName: "Priya Reddy",
    location: "San Francisco",
    headcount: 42
  },
  {
    id: "d2",
    name: "People Ops",
    managerName: "Rahul Kumar",
    location: "New York",
    headcount: 14
  },
  {
    id: "d3",
    name: "Design",
    managerName: "Sara Ibrahim",
    location: "Austin",
    headcount: 9
  },
  {
    id: "d4",
    name: "Finance",
    managerName: "Marcus Nguyen",
    location: "Chicago",
    headcount: 11
  },
  {
    id: "d5",
    name: "Operations",
    managerName: "Jordan Lee",
    location: "Remote",
    headcount: 18
  }
] satisfies Department[];
