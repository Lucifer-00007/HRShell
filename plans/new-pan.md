# HRMS Frontend-First Master Plan (Odoo-Inspired)

## Summary
Build a modular, Odoo-style HRMS frontend with a strong app shell, multi-module navigation, reusable view system (list, kanban, form, calendar), and mock API layer. Backend is explicitly deferred. The goal is to ship a production-quality UI and workflows that can later swap from MSW mocks to real APIs with minimal refactoring.

## Objectives
- Deliver a feature-rich, Odoo-like UI/UX with module launcher, global search, and workspace-style views.
- Establish a scalable design system, component library, and view engine for list/kanban/form/calendar.
- Implement robust mock data and API contracts to drive real UI behavior.
- Achieve strong accessibility, testing coverage, and performance benchmarks.

## Scope (Frontend-First)
- App shell, navigation, and module switching.
- HR modules UI: Employees, Departments, Contracts, Leaves, Attendance, Payroll (UI-only), Recruitment (UI-only), Expenses (UI-only).
- Shared UI patterns: list, form, kanban, calendar, modal workflows.
- Mock API with realistic data volumes and latency simulation.
- Storybook, unit/integration tests, E2E flows against mocks.

## Non-Goals (for now)
- Real backend, database, auth, and file storage.
- Production deployments and infra.
- Real payroll calculations or integrations.

## Guiding Principles
- Frontend-first with strict API contracts using Zod.
- UI parity with Odoo-style workflows and information density.
- Consistent, accessible UX with keyboard-first navigation.
- Replaceable backend: all data access behind a typed client layer.

## Architecture Overview
- Framework: Next.js App Router, TypeScript (strict)
- Styling: Tailwind CSS + custom design tokens
- State/Data: TanStack Query + typed API client
- Forms: React Hook Form + Zod
- Mocks: MSW with fixture-driven handlers
- Storybook for components and view templates
- Tests: Jest + Testing Library + Playwright

## UX & IA (Odoo-Inspired)
- App launcher with module tiles
- Global search and command palette
- Left nav per module with submenus
- View switcher for list/kanban/form/calendar
- Header actions bar with filters, group by, export
- Breadcrumbs and contextual quick actions
- Activity feed and audit panel (UI-only)

## Module Map (Phase 1)
- Core shell and shared UI
- Employees
- Departments
- Contracts
- Leaves
- Attendance
- Payroll (UI-only)
- Recruitment (UI-only)
- Expenses (UI-only)

## Data & Mocking Strategy
- Define domain schemas in `src/lib/schemas/*`
- Mock datasets in `src/mocks/data/*` with realistic volume
- MSW handlers in `src/mocks/handlers/*` using filters, pagination, sorting
- Simulate latency, errors, and permission states
- Use a common API client wrapper for all fetches

## Milestones

### Milestone 0: Foundations
- Build app shell, layout, theming, and typography
- Setup design tokens and core UI primitives
- Establish page layout grid and spacing system
- Implement mock API bootstrap + fixtures

### Milestone 1: Odoo-Style View System
- List view with search, filters, sort, pagination
- Kanban view with columns and drag affordances
- Form view with inline sections and tabs
- Calendar view for leaves and attendance

### Milestone 2: HR Core Workflows
- Employees: list, create, edit, profile
- Departments: list, create, manage
- Contracts: list, form, status tracking
- Leaves: request flow, approvals UI

### Milestone 3: Workforce Operations
- Attendance: daily logs UI, calendar
- Payroll: payslip UI, export, approval flows
- Recruitment: pipeline UI, candidate profile
- Expenses: submission UI, approvals UI

### Milestone 4: Quality & Polish
- Accessibility audit and fixes
- Performance profiling and optimization
- Visual regression tests and snapshots
- Documentation and onboarding pages

## Detailed TODOs

### TODO: Foundation & Shell
- [ ] Create Odoo-style app launcher grid on home
- [ ] Build top app bar with global search and quick actions
- [ ] Build left sidebar with module navigation
- [ ] Add breadcrumb + view switcher
- [ ] Create reusable page layout wrappers
- [ ] Add dark/light theme tokens (optional toggle)

### TODO: View Engine
- [ ] Build list view component with configurable columns
- [ ] Add server-style pagination simulation
- [ ] Add filter builder (field, operator, value)
- [ ] Add group-by + sort panel
- [ ] Build kanban view with column rendering
- [ ] Build form view with tabbed sections
- [ ] Build calendar view with month/week switch

### TODO: Employees Module
- [ ] Employee list view with filters + search
- [ ] Employee create/edit form with validation
- [ ] Profile detail view with tabs
- [ ] Mock role-based UI states (HR, Manager, Employee)

### TODO: Departments Module
- [ ] Department list and create/edit form
- [ ] Department summary panel and manager assignment

### TODO: Contracts Module
- [ ] Contract list, status chips, and form
- [ ] Contract history timeline (UI-only)

### TODO: Leaves Module
- [ ] Leave request form with calendar picker
- [ ] Approval inbox UI with bulk actions
- [ ] Leave balances summary cards

### TODO: Attendance Module
- [ ] Daily attendance log table
- [ ] Attendance calendar view
- [ ] Timesheet UI (UI-only)

### TODO: Payroll Module (UI)
- [ ] Payslip list and detail layout
- [ ] Payroll run wizard UI
- [ ] Export actions and progress UI (mock)

### TODO: Recruitment Module (UI)
- [ ] Pipeline kanban for candidates
- [ ] Candidate detail form and notes
- [ ] Stage transition UI (mock)

### TODO: Expenses Module (UI)
- [ ] Expense list and submit form
- [ ] Approval queue UI

### TODO: Mocking & Data
- [ ] Add realistic fixtures for each module
- [ ] Add error/empty/loading states
- [ ] Add latency simulation per endpoint
- [ ] Add pagination and filters in handlers

### TODO: Testing & Quality
- [ ] Component stories for core views
- [ ] Jest tests for API client + forms
- [ ] Playwright tests for main flows
- [ ] Accessibility checks using axe

## Definition of Done
- UI parity for planned modules
- All screens render against mocks
- Forms validated with Zod and RHF
- No major accessibility issues
- Basic test coverage for workflows

## Future Backend Handoff (Post-Frontend)
- Replace MSW bootstrap with real API base URL
- Keep Zod schemas as validation layer
- Use same query keys and API client calls
- Add server-backed auth + RBAC
