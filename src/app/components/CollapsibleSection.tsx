"use client";

import { useState } from "react";
import { SectionTheme, SECTION_THEMES } from "@/app/lib/types";

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  isEmpty = false,
  theme,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isEmpty?: boolean;
  theme?: SectionTheme;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const colors = theme ? SECTION_THEMES[theme] : null;

  return (
    <div
      className="rounded-lg border glass-card overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-card)",
        borderLeft: colors ? `3px solid ${colors.accent}` : undefined,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          {colors && (
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: colors.accent }}
            />
          )}
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isEmpty && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: colors ? colors.bg : "var(--bg-secondary)",
                color: colors ? colors.accent : "var(--text-dim)",
                border: colors ? `1px solid ${colors.border}` : "none",
              }}
            >
              Pending
            </span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            style={{ color: "var(--text-muted)" }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {open && (
        <div
          className="px-4 pb-4 border-t"
          style={{ borderColor: "var(--border-primary)" }}
        >
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
