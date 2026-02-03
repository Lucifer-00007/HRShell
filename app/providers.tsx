"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/src/components/theme/ThemeProvider";
import { AuthProvider } from "@/src/components/auth/AuthProvider";

declare global {
  interface Window {
    __mswStarted?: boolean;
  }
}

async function startMockServiceWorker() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  if (window.__mswStarted) {
    return;
  }

  const { worker } = await import("@/src/mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass"
  });
  window.__mswStarted = true;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1
          }
        }
      })
  );

  useEffect(() => {
    startMockServiceWorker();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
