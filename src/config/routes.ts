export const landingRoot = "/";
export const signInRoot = "/signin";
export const workspaceRoot = "/workspace";
export const employeeDetailQueryKey = "employeeId";

export function getWorkspacePath(path: string) {
  if (!path) {
    return workspaceRoot;
  }
  if (path.startsWith("/")) {
    return `${workspaceRoot}${path}`;
  }
  return `${workspaceRoot}/${path}`;
}

export function getEmployeeDetailPath(employeeId: string) {
  const base = getWorkspacePath("employees");
  return `${base}?${employeeDetailQueryKey}=${encodeURIComponent(employeeId)}`;
}
