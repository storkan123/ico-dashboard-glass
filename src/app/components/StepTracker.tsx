import { Step, STEP_COLORS } from "@/app/lib/types";

export default function StepTracker({ steps }: { steps: Step[] }) {
  return (
    <div className="w-full mb-8">
      {/* Desktop horizontal stepper */}
      <div className="hidden md:flex items-start justify-between relative">
        {steps.map((step, i) => {
          const colors = STEP_COLORS[step.color];
          return (
            <div key={step.label} className="flex flex-col items-center flex-1 relative">
              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-4 left-1/2 w-full h-0.5"
                  style={{
                    background: step.completed
                      ? colors.accent
                      : "var(--border-primary)",
                  }}
                />
              )}
              {/* Circle */}
              <div
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all glass-card"
                style={{
                  background: step.completed
                    ? colors.accent
                    : step.current
                    ? colors.bg
                    : step.skipped
                    ? "transparent"
                    : "var(--bg-secondary)",
                  color: step.completed
                    ? "#ffffff"
                    : step.current
                    ? colors.accent
                    : step.skipped
                    ? "var(--accent-amber)"
                    : "var(--text-dim)",
                  border: step.completed
                    ? `2px solid ${colors.accent}`
                    : step.current
                    ? `2px solid ${colors.accent}`
                    : step.skipped
                    ? "2px dashed var(--accent-amber)"
                    : "2px solid var(--border-primary)",
                  boxShadow: step.current
                    ? colors.glow
                    : step.completed
                    ? `0 0 8px ${colors.accent.replace("var(", "").replace(")", "")}33`
                    : "none",
                }}
              >
                {step.completed ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : step.skipped ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7H11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {/* Label */}
              <p
                className="text-xs font-medium mt-2 text-center"
                style={{
                  color: step.completed || step.current
                    ? "var(--text-primary)"
                    : step.skipped
                    ? "var(--text-muted)"
                    : "var(--text-dim)",
                }}
              >
                {step.label}
              </p>
              {/* Current badge */}
              {step.current && (
                <span
                  className="text-[10px] mt-0.5 px-2 py-0.5 rounded-full"
                  style={{
                    background: colors.bg,
                    color: colors.accent,
                  }}
                >
                  Current
                </span>
              )}
              {/* Skipped badge */}
              {step.skipped && (
                <span
                  className="text-[10px] mt-0.5 px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--stage-awaiting-bg)",
                    color: "var(--accent-amber)",
                  }}
                >
                  Skipped
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile vertical stepper */}
      <div className="md:hidden flex flex-col gap-0">
        {steps.map((step, i) => {
          const colors = STEP_COLORS[step.color];
          return (
            <div key={step.label} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: step.completed
                      ? colors.accent
                      : step.current
                      ? colors.bg
                      : step.skipped
                      ? "transparent"
                      : "var(--bg-secondary)",
                    color: step.completed
                      ? "#ffffff"
                      : step.current
                      ? colors.accent
                      : step.skipped
                      ? "var(--accent-amber)"
                      : "var(--text-dim)",
                    border: step.completed
                      ? `2px solid ${colors.accent}`
                      : step.current
                      ? `2px solid ${colors.accent}`
                      : step.skipped
                      ? "2px dashed var(--accent-amber)"
                      : "2px solid var(--border-primary)",
                  }}
                >
                  {step.completed ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : step.skipped ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-0.5 h-6"
                    style={{
                      background: step.completed ? colors.accent : "var(--border-primary)",
                    }}
                  />
                )}
              </div>
              <div className="pb-4">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: step.completed || step.current
                      ? "var(--text-primary)"
                      : step.skipped
                      ? "var(--text-muted)"
                      : "var(--text-dim)",
                  }}
                >
                  {step.label}
                  {step.current && (
                    <span
                      className="ml-2 text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: colors.bg,
                        color: colors.accent,
                      }}
                    >
                      Current
                    </span>
                  )}
                  {step.skipped && (
                    <span
                      className="ml-2 text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--stage-awaiting-bg)",
                        color: "var(--accent-amber)",
                      }}
                    >
                      Skipped
                    </span>
                  )}
                </p>
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
