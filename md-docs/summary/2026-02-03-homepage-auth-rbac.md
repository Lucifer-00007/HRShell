# Homepage Login + Role-Based Access Summary

## Overview
Added a header-driven demo authentication flow with three user types (Employee, HR, Admin), introduced role-based module access, and enhanced the homepage to surface role-specific controls and access visibility. All data is dummy and stored locally for now; no backend integration is required.

## Auth + RBAC Additions
- Implemented a client-side auth context with demo users and localStorage persistence to emulate login and role switching.
- Added role metadata, access levels, and module permissions to centralize RBAC configuration.
- Created a RoleGate component that blocks unauthorized modules and displays guidance on how to gain access.

## UI/UX Updates
- Top header now includes a login menu for switching between Employee, HR, and Admin accounts.
- Module cards display access badges (Full, Read only, No access) and disable navigation when restricted.
- Sidebar reflects RBAC by disabling links the active role cannot access.
- Homepage includes a role overview panel for signed-in users and a role summary for signed-out visitors.

## Module Access Behavior
- Unauthorized roles see a restricted access card instead of module content.
- Read-only roles see a banner calling out limited control access.
- All modules remain visible to demonstrate which areas are locked per role.

## Dummy Data
- Demo users live in `src/config/auth.ts` and can be replaced with real DB-backed users later.
- RBAC rules (module access + role controls) live in `src/config/rbac.ts` and are currently hard-coded.

## Files Added
- `src/config/auth.ts`
- `src/config/rbac.ts`
- `src/components/auth/AuthProvider.tsx`
- `src/components/auth/AuthMenu.tsx`
- `src/components/auth/RoleGate.tsx`
- `src/components/home/HomeAuthOverview.tsx`

## Files Updated
- `app/providers.tsx` (inject AuthProvider)
- `app/page.tsx` (homepage role overview)
- `app/attendance/page.tsx` (RBAC gate via ModulePage)
- `app/contracts/page.tsx` (RBAC gate via ModulePage)
- `app/departments/page.tsx` (RBAC gate)
- `app/employees/page.tsx` (RBAC gate)
- `app/employees/[id]/page.tsx` (RBAC gate)
- `app/expenses/page.tsx` (RBAC gate via ModulePage)
- `app/leaves/page.tsx` (RBAC gate via ModulePage)
- `app/payroll/page.tsx` (RBAC gate via ModulePage)
- `app/recruitment/page.tsx` (RBAC gate via ModulePage)
- `src/components/layout/ModuleLauncher.tsx` (access badges + disabled cards)
- `src/components/layout/ModulePage.tsx` (role gate integration)
- `src/components/layout/Sidebar.tsx` (role-based nav visibility)
- `src/components/layout/TopBar.tsx` (header login + role action)
- `src/config/modules.ts` (export ModuleId type for RBAC mapping)

## Notes For Future DB Integration
- Replace localStorage-backed demo auth with real session or token state.
- Populate `authUsers` and `moduleAccessByRole` from API data.
- Swap the RoleGate logic to use backend permissions to avoid client-only enforcement.
