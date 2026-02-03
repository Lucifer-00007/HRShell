export const landingRoot = "/";
export const signInRoot = "/signin";
export const workspaceRoot = "/workspace";

export function getWorkspacePath(path: string) {
  if (!path) {
    return workspaceRoot;
  }
  if (path.startsWith("/")) {
    return `${workspaceRoot}${path}`;
  }
  return `${workspaceRoot}/${path}`;
}
