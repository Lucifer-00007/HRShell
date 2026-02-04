"use client";

import { useMemo, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/cn";

export type CodeToken = {
  text: string;
  className?: string;
};

export type CodeLine = CodeToken[];

type CodePreviewProps = {
  title: string;
  language?: string;
  lines: CodeLine[];
  className?: string;
};

export function CodePreview({ title, language = "TypeScript", lines, className }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(
    () => lines.map((line) => line.map((token) => token.text).join("")).join("\n"),
    [lines]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200/80 bg-slate-950 text-slate-100 shadow-sm dark:border-slate-800",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
          <p className="text-[11px] text-slate-500">{language}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={handleCopy}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 hover:text-white"
          aria-label="Copy code to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Code copied to clipboard." : ""}
        </span>
      </div>
      <div className="overflow-x-auto px-4 pb-5 pt-4">
        <pre className="text-xs leading-6 sm:text-sm" aria-label="Code preview">
          <code>
            {lines.map((line, lineIndex) => (
              <div key={`line-${lineIndex}`} className="flex">
                <span className="w-6 flex-none pr-4 text-right text-[11px] text-slate-500 sm:w-8">
                  {lineIndex + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map((token, tokenIndex) => (
                    <span key={`token-${lineIndex}-${tokenIndex}`} className={token.className}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
