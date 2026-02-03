# HRMS Frontend (Frontend-First)

This project implements a frontend-first HRMS workflow using mocked APIs. The backend is intentionally paused. Mock Service Worker (MSW) intercepts network requests in development so the UI behaves like it has real endpoints.

## What’s Included

- Next.js App Router + TypeScript
- Odoo-inspired app shell with sidebar navigation, module launcher, and dark mode
- Tailwind CSS styling and design tokens
- Shared view system (list/kanban/form/calendar switcher)
- TanStack Query for data fetching/caching
- MSW mock API handlers for employee endpoints
- Zod schemas for runtime validation and type safety
- Storybook scaffolding
- Jest and Playwright scaffolding

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Initialize the MSW service worker (first run only):

```bash
npm run msw:init
```

3. Run the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000` to see the module launcher.
5. Toggle dark mode from the top bar.
6. Open `http://localhost:3000/employees` to see the mocked employee directory.

## Mocked API Endpoints

- `GET /api/employees?q=` returns a filtered list
- `GET /api/employees/:id` returns a single employee
- `POST /api/employees` returns a created employee
- `GET /api/departments?q=` returns a filtered list
- `GET /api/departments/:id` returns a single department
- `POST /api/departments` returns a created department

Handlers live in `src/mocks/handlers.ts`. Data lives in `src/mocks/data/employees.ts`.

## Modules (UI-first)

- Employees (mocked)
- Departments (mocked)
- Contracts (UI only)
- Leaves (UI only)
- Attendance (UI only)
- Payroll (UI only)
- Recruitment (UI only)
- Expenses (UI only)

## Storybook

```bash
npm run storybook
```

Stories live in `src/**/*.stories.tsx`.

## Testing

```bash
npm test
npm run test:e2e
```

## Swapping to a Real Backend

- Stop MSW bootstrapping in `app/providers.tsx` or guard it behind an env flag.
- Replace `/api/*` paths with your real API base URL (or update `fetchEmployees` in `src/lib/api/employees.ts`).
- Keep Zod schemas and React Query cache keys; the client code should stay stable.
