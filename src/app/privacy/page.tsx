import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/src/components/ui/Card";
import { landingRoot } from "@/src/config/routes";

export const metadata: Metadata = {
  title: "Privacy Policy | HRMS Studio",
  description: "Understand how HRMS Studio handles data in the demo environment."
};

const collectionPoints = [
  "Role selections, UI preferences, and demo state stored locally in your browser.",
  "Information you choose to share when you contact us by email."
];

const usagePoints = [
  "Provide access to the demo workspace and role-based flows.",
  "Respond to questions, support requests, and feedback.",
  "Improve the demo experience before production integrations."
];

const choicePoints = [
  "Clear browser storage to remove demo state.",
  "Sign out to reset role access.",
  "Contact us to request access, correction, or deletion of any information you shared by email."
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(90,111,255,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_45%)]">
      <header className="border-b border-white/60 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-[960px] items-center justify-between px-6 py-4">
          <Link href={landingRoot} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            HRMS Studio
          </Link>
          <Link href={landingRoot} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Back to home
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[960px] px-6 py-12">
        <Card className="border-slate-200/70 bg-white/90 p-8 dark:border-slate-800/70 dark:bg-slate-900/70">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Privacy Policy
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Privacy policy
          </h1>
          <p className="mt-3 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Last updated: February 4, 2026
          </p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            HRMS Studio is a demo environment. The experience stores demo state locally in your
            browser and does not connect to a production backend. Please do not submit real
            employee data.
          </p>

          <div className="mt-8 space-y-6">
            <section aria-labelledby="privacy-collection">
              <h2
                id="privacy-collection"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Information we collect
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                {collectionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="privacy-usage">
              <h2
                id="privacy-usage"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                How we use information
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                {usagePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="privacy-storage">
              <h2
                id="privacy-storage"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Cookies and local storage
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                The demo relies on browser storage to remember role selection and UI state. We do
                not use advertising cookies or sell personal information. If you clear your browser
                storage, the demo state will reset.
              </p>
            </section>

            <section aria-labelledby="privacy-sharing">
              <h2
                id="privacy-sharing"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Sharing and disclosure
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                We do not sell personal information. Information is shared only when required to
                comply with the law or to protect the rights and safety of HRMS Studio and its
                users.
              </p>
            </section>

            <section aria-labelledby="privacy-retention">
              <h2
                id="privacy-retention"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Data retention
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Demo data remains in your browser until you clear it. Messages sent to our team are
                retained only as long as needed to respond and follow up on your request.
              </p>
            </section>

            <section aria-labelledby="privacy-choices">
              <h2
                id="privacy-choices"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Your choices
              </h2>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                {choicePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="privacy-security">
              <h2
                id="privacy-security"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Security
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                We use reasonable safeguards to protect demo data, but no system is completely
                secure. Avoid sharing sensitive personal information in the demo environment.
              </p>
            </section>

            <section aria-labelledby="privacy-updates">
              <h2
                id="privacy-updates"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Updates to this policy
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                We will update this policy as the product evolves. The latest version will always be
                posted on this page.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2
                id="privacy-contact"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Contact us
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Email privacy questions to{" "}
                <a
                  href="mailto:hello@hrms.studio"
                  className="text-slate-900 underline-offset-4 hover:underline dark:text-slate-100"
                >
                  hello@hrms.studio
                </a>
                {" "}or visit the{" "}
                <Link className="underline-offset-4 hover:underline" href="/contact">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
}
