import type { ComponentProps } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/src/app/page";
import { AuthProvider } from "@/src/components/auth/AuthProvider";
import { ThemeProvider } from "@/src/components/theme/ThemeProvider";

jest.mock("next/dynamic", () =>
  (_importer: unknown, options: { loading?: () => JSX.Element }) => {
    const DynamicComponent = () => (options?.loading ? options.loading() : null);
    return DynamicComponent;
  }
);

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ComponentProps<"img">) => <img {...props} />
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

const renderLanding = () =>
  render(
    <ThemeProvider>
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </ThemeProvider>
  );

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
});

describe("LandingPage", () => {
  it("renders the hero content and calls to action", () => {
    renderLanding();

    expect(
      screen.getByRole("heading", {
        name: /a dedicated landing hub for hrms role-based previews/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /launch workspace/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore roles/i })).toBeInTheDocument();
  });
});
