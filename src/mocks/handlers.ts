import { http, HttpResponse } from "msw";
import { employees } from "./data/employees";
import { departments } from "./data/departments";

export const handlers = [
  http.get("/api/employees", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";

    const filtered = employees.filter((employee) => {
      const name = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return (
        name.includes(q) ||
        employee.employeeCode.toLowerCase().includes(q) ||
        employee.email.toLowerCase().includes(q)
      );
    });

    return HttpResponse.json({
      data: filtered,
      total: filtered.length
    });
  }),

  http.get("/api/employees/:id", ({ params }) => {
    const id = String(params.id);
    const employee = employees.find((item) => item.id === id);

    if (!employee) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(employee);
  }),

  http.post("/api/employees", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const created = {
      id: `e${Math.random().toString(36).slice(2, 9)}`,
      ...body
    };

    return HttpResponse.json(created, { status: 201 });
  }),

  http.get("/api/departments", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";

    const filtered = departments.filter((department) => {
      return (
        department.name.toLowerCase().includes(q) ||
        department.managerName.toLowerCase().includes(q) ||
        department.location.toLowerCase().includes(q)
      );
    });

    return HttpResponse.json({
      data: filtered,
      total: filtered.length
    });
  }),

  http.get("/api/departments/:id", ({ params }) => {
    const id = String(params.id);
    const department = departments.find((item) => item.id === id);

    if (!department) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(department);
  }),

  http.post("/api/departments", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const created = {
      id: `d${Math.random().toString(36).slice(2, 9)}`,
      ...body
    };

    return HttpResponse.json(created, { status: 201 });
  })
];
