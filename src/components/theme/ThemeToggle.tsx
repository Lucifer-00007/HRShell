"use client";

import { useTheme } from "@/src/components/theme/ThemeProvider";
import { Button } from "@/src/components/ui/Button";
import { MoonIcon, SunIcon } from "@/src/components/icons";
import { cn } from "@/src/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={toggleTheme}
      className={cn("text-xs", className)}
      aria-label="Toggle dark mode"
      title={`Theme: ${theme}`}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
      {resolvedTheme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
