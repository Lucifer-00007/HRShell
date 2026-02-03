Nice — I updated the original implementation plan so it **temporarily ignores the backend** and focuses entirely on a robust, production-quality **frontend-first** workflow that uses **dummy data / mocks**. Below you’ll find:

* a short summary of the change,
* an updated milestone plan that’s frontend-only,
* recommended mocking strategies (pick one),
* a suggested dev stack and testing approach,
* folder structure focused on frontend + mocks,
* practical, copy-pasteable example code (Next.js App Router + TypeScript) that shows how to wire **MSW** (Mock Service Worker) + **TanStack Query** with dummy data and a sample Employee list page,
* notes on how to swap-in a real backend later.

I kept the code neat, fully commented, TypeScript-first, and using current best-practice libraries so you can later plug in the real backend with minimal changes.

---

# Dev Note:

We will **pause backend work entirely** for now. Build the full frontend experience (UI, flows, validations, client state, offline behavior, interactions, E2E flows) using **mocked APIs / dummy data** and component-driven development (Storybook). Use Mock Service Worker (MSW) as the primary mocking strategy (recommended), with options for local JSON fixtures or MirageJS if you prefer. Everything is structured so replacing mocks with real endpoints later is straightforward.

---

# Frontend-first objectives (high-level)

* Fully-built UI and UX for employees, payroll (UI only), leave workflows, ESS pages, admin dashboard.
* Type-safe inputs and forms using **React Hook Form + Zod**.
* Data fetching & caching using **TanStack Query (React Query)** — still useful with mocked fetches.
* Mock API layer using **MSW** that mirrors the real API contract (Zod schemas shared).
* Component-driven development with **Storybook** and isolated component tests.
* Client-only background jobs can be simulated (e.g., PDF generation UI that downloads a prebuilt dummy PDF).
* Accessibility (axe), responsive design (Tailwind + shadcn/ui), and strong test coverage (Jest + Testing Library + Playwright for E2E using MSW).

---

# Recommended mocking strategy (pick one)

1. **MSW (recommended)** — intercepts fetch/XHR at the browser/network level. Great for E2E + dev. Keeps real code paths unchanged.
2. **Local JSON fixtures / next route handlers** — create `/app/api/mock/*` route handlers that return static JSON (good for simple setups).
3. **MirageJS** — client-side in-memory server with DSL for relationships (also good, but MSW is more flexible and realistic).

I’ll give MSW-based code below because it's the most flexible and widely used for front-end-first workflows.

---

# Updated milestone breakdown (frontend-only)

**MVP (Frontend)**

* Project scaffold, design tokens, shadcn/ui wrapper.
* Employee Directory UI: list, search, sort, filter, profile drawer.
* Employee Create/Edit forms (React Hook Form + Zod) with client-side validation.
* ESS pages: payslip viewer (UI), leave request flow (UI + mock approval).
* Admin Dashboard UI: key metrics, export UI (mock CSV).
* Storybook for all shared components.
* Mock API layer (MSW) implementing returns similar to planned backend.
* Unit and integration tests for component and flows.

**Phase 2 (UX polish & offline)**

* Advanced tables: virtualization, server-side pagination simulation, filters.
* Client-side caching and offline experiences (service worker skeleton).
* i18n plumbing and form translations.
* Role-based UI mocks (admin, HR, manager, employee).

**Phase 3 (handoff to backend)**

* Replace MSW handlers with real endpoints (change only mock bootstrap).
* Add API client wrapper and integration tests against staging backend.
* Migrate seeds -> production fixtures and enable real file upload to S3.

---

# Dev stack (frontend-only)

* Framework: **Next.js (App Router)** + TypeScript (strict)
* Styling: **Tailwind CSS** + **shadcn/ui**
* UI components: shadcn/ui, custom tokens
* Data fetching: **TanStack Query (v5)** (React Query)
* Form: **React Hook Form** + **Zod** for validation
* Mocks: **msw**
* Component-driven dev: **Storybook**
* Testing: **Jest + Testing Library** for unit; **Playwright** for E2E (use MSW during Playwright tests or mock network)
* Bundling/format: ESLint, Prettier, Husky (pre-commit)
* Optional: Storybook + Chromatic for visual regression

---

# Folder structure (frontend-first + mocks)

```
/repo
├─ app/
│  ├─ layout.tsx
│  ├─ providers.tsx
│  ├─ employees/
│  │  ├─ page.tsx
│  │  └─ [id]/page.tsx
│  └─ ...
├─ src/
│  ├─ components/
│  │  ├─ EmployeeList.tsx
│  │  └─ EmployeeForm.tsx
│  ├─ hooks/
│  ├─ lib/
│  │  ├─ fetcher.ts
│  │  └─ schemas/ (zod)
│  ├─ mocks/
│  │  ├─ browser.ts
│  │  ├─ handlers.ts
│  │  └─ data/
│  │     └─ employees.ts
│  └─ styles/
├─ .storybook/
├─ prisma/ (kept for later)
├─ package.json
└─ playwright.config.ts
```

---

# How MSW fits (quick)

* MSW runs in the browser during `next dev` (development) and intercepts network calls (fetch/XHR).
* Your code still calls `fetch('/api/employees')`, but MSW returns realistic JSON. When you later connect to a real backend, stop starting MSW in production/dev and real calls go through unchanged.
* MSW also supports node test environments (Playwright/Jest) so E2E tests can run without backend.

---

# Example: MSW + TanStack Query + Next.js (copy/paste)

Below are minimal example files to get an Employees page working with dummy data via MSW.

1. `src/mocks/data/employees.ts` — dummy dataset

```ts
// src/mocks/data/employees.ts
// A small list of dummy employees (exported as TypeScript types too).
export const employees = [
  {
    id: "e1",
    employeeCode: "EMP-001",
    firstName: "Asha",
    lastName: "Sharma",
    email: "asha.sharma@example.com",
    department: "Engineering",
    managerId: "e3",
    hiredOn: "2023-04-01",
  },
  {
    id: "e2",
    employeeCode: "EMP-002",
    firstName: "Rahul",
    lastName: "Kumar",
    email: "rahul.kumar@example.com",
    department: "HR",
    managerId: "e3",
    hiredOn: "2022-08-15",
  },
  {
    id: "e3",
    employeeCode: "EMP-003",
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya.reddy@example.com",
    department: "Management",
    managerId: null,
    hiredOn: "2020-11-20",
  }
];

export type Employee = typeof employees[number];
```

2. `src/mocks/handlers.ts` — MSW handlers

```ts
// src/mocks/handlers.ts
import { rest } from "msw";
import { employees } from "./data/employees";

export const handlers = [
  // GET /api/employees -> returns list of employees (supports ?q= search)
  rest.get("/api/employees", (req, res, ctx) => {
    const q = req.url.searchParams.get("q")?.toLowerCase() ?? "";
    // simple search by name or code
    const filtered = employees.filter((e) => {
      const name = `${e.firstName} ${e.lastName}`.toLowerCase();
      return (
        name.includes(q) ||
        e.employeeCode.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    });
    return res(
      ctx.status(200),
      ctx.json({
        data: filtered,
        total: filtered.length,
      })
    );
  }),

  // GET /api/employees/:id -> single employee
  rest.get("/api/employees/:id", (req, res, ctx) => {
    const { id } = req.params;
    const employee = employees.find((e) => e.id === id);
    if (!employee) return res(ctx.status(404), ctx.json({ error: "Not found" }));
    return res(ctx.status(200), ctx.json(employee));
  }),

  // POST /api/employees -> pretend to create (echo back with id)
  rest.post("/api/employees", async (req, res, ctx) => {
    const body = await req.json();
    // create fake id and return
    const created = { id: `e${Math.random().toString(36).slice(2, 9)}`, ...body };
    return res(ctx.status(201), ctx.json(created));
  }),
];
```

3. `src/mocks/browser.ts` — start worker (dev only)

```ts
// src/mocks/browser.ts
import { setupWorker } from "msw";
import { handlers } from "./handlers";

// This file is only executed in the browser. We export a function to start the worker.
export const worker = setupWorker(...handlers);
```

4. `app/providers.tsx` — bootstrap MSW in dev and wire React Query

```tsx
// app/providers.tsx
"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Start MSW only in development
async function startMockServiceWorker() {
  if (process.env.NODE_ENV === "development") {
    // dynamic import so MSW isn't included in production builds
    const { worker } = await import("../src/mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass", // helps when only mocking a subset of routes
    });
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startMockServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Add the `<Providers>` wrapper in `app/layout.tsx` so the whole app sees React Query and MSW is started.

5. `src/components/EmployeeList.tsx` — fetch using React Query

```tsx
// src/components/EmployeeList.tsx
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Employee = {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
};

async function fetchEmployees(q = "") {
  // fetch is intercepted by MSW in dev and returns the dummy data
  const res = await fetch(`/api/employees?q=${encodeURIComponent(q)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }
  const payload = await res.json();
  return payload.data as Employee[];
}

export function EmployeeList() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", query],
    queryFn: () => fetchEmployees(query),
  });

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search employees by name or code"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>

      {isLoading && <div>Loading employees…</div>}
      {isError && <div className="text-red-600">Error loading employees.</div>}

      <ul className="space-y-2">
        {data?.length === 0 && <li>No employees found.</li>}
        {data?.map((emp) => (
          <li
            key={emp.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-medium">
                {emp.firstName} {emp.lastName} <span className="text-sm text-gray-500">({emp.employeeCode})</span>
              </div>
              <div className="text-sm text-gray-600">{emp.department} · {emp.email}</div>
            </div>
            <div>
              <button className="px-3 py-1 rounded border">View</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

6. `app/employees/page.tsx` — page that uses EmployeeList

```tsx
// app/employees/page.tsx
import { EmployeeList } from "@/src/components/EmployeeList";
import { Providers } from "../providers";

export default function EmployeesPage() {
  return (
    <Providers>
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Employees</h1>
        <EmployeeList />
      </main>
    </Providers>
  );
}
```

---

# How to run locally (dev)

1. `npm install` (include dependencies: msw, @tanstack/react-query, react-hook-form, zod, tailwind, shadcn/ui, etc.)
2. `npm run dev` — MSW will start automatically in development via the `Providers` startup code above.
3. Open `http://localhost:3000/employees` and try search/create flows — responses come from MSW.

---

# Testing approach with mocks

* **Unit tests**: Jest + Testing Library, mock out fetch with MSW in the test environment (msw/node).
* **E2E**: Playwright can run with MSW started in the browser or intercept network. This keeps E2E stable without backend dependency.
* **Storybook**: Use the same mock handlers to render components in isolation; Storybook stories can call the same fetch endpoints (MSW for Storybook is supported).

---

# Notes for swapping to real backend later

* MSW is started only in development. For real backend:

  * Remove / disable `startMockServiceWorker` call (or guard with env var).
  * Update fetch URL base if needed (`/api/...` to `https://api.yourdomain.com/...`) or provide a small `fetcher.ts` wrapper that uses env var `NEXT_PUBLIC_API_BASE`.
  * Keep the same Zod schemas and React Query cache keys — client code will not change.
  * Update tests to point to staging environment (or keep MSW for test isolation).

---
