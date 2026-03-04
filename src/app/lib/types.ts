export type Stage =
  | "awaiting_reply"
  | "emergency"
  | "triaged"
  | "scheduled"
  | "complete"
  | "incomplete";

export interface WorkOrder {
  work_request_number: string;
  work_request_date: string;
  work_request_description: string;
  property_name: string;
  property_address: string;
  unit: string;
  resident_name: string;
  resident_phone: string;
  resident_email: string;
  permission_to_enter: string;
  access_notes: string;
  is_emergency: string;
  Initial_Reachout: string;
  "Initial Tenet Email Response": string;
  Vendor: string;
  "Date of Job": string;
  "Completed?": string;
  stage: Stage;
}

export type StepColor = "amber" | "red" | "blue" | "violet" | "rose" | "emerald";

export interface Step {
  label: string;
  description: string;
  completed: boolean;
  current: boolean;
  skipped?: boolean;
  color: StepColor;
  detail?: string;
}

export const STEP_COLORS: Record<StepColor, { accent: string; bg: string; glow: string; border: string }> = {
  amber:   { accent: "var(--accent-amber)",   bg: "var(--stage-awaiting-bg)",    glow: "0 0 12px rgba(251, 191, 36, 0.4)",  border: "var(--stage-awaiting-border)" },
  red:     { accent: "var(--accent-red)",     bg: "var(--stage-emergency-bg)",   glow: "0 0 12px rgba(248, 113, 113, 0.4)", border: "var(--stage-emergency-border)" },
  blue:    { accent: "var(--accent-blue)",    bg: "var(--stage-triaged-bg)",     glow: "0 0 12px rgba(96, 165, 250, 0.4)",  border: "var(--stage-triaged-border)" },
  violet:  { accent: "var(--accent-violet)",  bg: "var(--stage-scheduled-bg)",   glow: "0 0 12px rgba(167, 139, 250, 0.4)", border: "var(--stage-scheduled-border)" },
  rose:    { accent: "var(--accent-rose)",    bg: "var(--stage-incomplete-bg)",  glow: "0 0 12px rgba(251, 113, 133, 0.4)", border: "var(--stage-incomplete-border)" },
  emerald: { accent: "var(--accent-emerald)", bg: "var(--stage-complete-bg)",    glow: "0 0 12px rgba(52, 211, 153, 0.4)",  border: "var(--stage-complete-border)" },
};

export type SectionTheme = "blue" | "violet" | "amber" | "emerald" | "red" | "rose";

export const SECTION_THEMES: Record<SectionTheme, { accent: string; bg: string; border: string }> = {
  blue:    { accent: "var(--accent-blue)",    bg: "var(--stage-triaged-bg)",    border: "var(--stage-triaged-border)" },
  violet:  { accent: "var(--accent-violet)",  bg: "var(--stage-scheduled-bg)",  border: "var(--stage-scheduled-border)" },
  amber:   { accent: "var(--accent-amber)",   bg: "var(--stage-awaiting-bg)",   border: "var(--stage-awaiting-border)" },
  emerald: { accent: "var(--accent-emerald)", bg: "var(--stage-complete-bg)",   border: "var(--stage-complete-border)" },
  red:     { accent: "var(--accent-red)",     bg: "var(--stage-emergency-bg)",  border: "var(--stage-emergency-border)" },
  rose:    { accent: "var(--accent-rose)",    bg: "var(--stage-incomplete-bg)", border: "var(--stage-incomplete-border)" },
};

export const STAGE_CONFIG: Record<
  Stage,
  { label: string; order: number }
> = {
  awaiting_reply: { label: "Awaiting Reply", order: 0 },
  emergency: { label: "Emergency", order: 1 },
  triaged: { label: "Triaged", order: 2 },
  scheduled: { label: "Scheduled", order: 3 },
  complete: { label: "Complete", order: 4 },
  incomplete: { label: "Incomplete", order: 5 },
};

export const ACTIVE_STAGES: Stage[] = [
  "awaiting_reply",
  "emergency",
  "triaged",
  "scheduled",
];
