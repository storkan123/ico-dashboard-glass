import { WorkOrder, STAGE_CONFIG } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import CollapsibleSection from "./CollapsibleSection";

function Field({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <div className="flex gap-3 text-sm mb-2">
      <span
        className="font-medium min-w-[140px] text-xs uppercase tracking-wider"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>
      <span style={{ color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}

function EmailBlock({ content }: { content: string }) {
  if (!content.trim()) {
    return (
      <p className="text-sm italic" style={{ color: "var(--text-dim)" }}>
        No content yet...
      </p>
    );
  }
  return (
    <div
      className="rounded-xl p-4 text-sm whitespace-pre-wrap leading-relaxed glass-card"
      style={{
        background: "var(--bg-secondary)",
        color: "var(--text-secondary)",
        border: "1px solid var(--border-primary)",
      }}
    >
      {content}
    </div>
  );
}

export default function DetailCard({ wo }: { wo: WorkOrder }) {
  const stageMeta = STAGE_CONFIG[wo.stage];
  const stageKey = wo.stage === "awaiting_reply" ? "awaiting" : wo.stage;

  return (
    <div className="space-y-4 stagger-children">
      {/* Header */}
      <div
        className="rounded-xl border p-6 glass-card relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--stage-${stageKey}-bg) 0%, var(--bg-card) 30%, var(--bg-card) 100%)`,
          borderColor: `var(--stage-${stageKey}-border)`,
          boxShadow: `var(--shadow-card), 0 0 60px -10px var(--stage-${stageKey}-bg)`,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              WR# {wo.work_request_number}
            </h2>
            <p
              className="text-base mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {wo.property_name}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Created: {formatDate(wo.work_request_date) || "Unknown"}
            </p>
          </div>
          <span
            className="text-sm font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: `var(--stage-${stageKey}-bg)`,
              color: `var(--stage-${stageKey}-text)`,
              border: `1px solid var(--stage-${stageKey}-border)`,
            }}
          >
            {stageMeta.label}
          </span>
        </div>
        {wo.is_emergency.trim().toLowerCase() === "true" && (
          <div
            className="mt-3 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 emergency-glow"
            style={{
              background: "var(--stage-emergency-bg)",
              color: "var(--stage-emergency-text)",
              border: "1px solid var(--stage-emergency-border)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            EMERGENCY — Immediate action required
          </div>
        )}
      </div>

      {/* Property Info */}
      <CollapsibleSection title="Property Info" theme="blue">
        <Field label="Property" value={wo.property_name} />
        <Field label="Address" value={wo.property_address} />
        <Field label="Unit" value={wo.unit} />
      </CollapsibleSection>

      {/* Resident Info */}
      <CollapsibleSection title="Resident Info" theme="violet">
        <Field label="Name" value={wo.resident_name} />
        <Field label="Phone" value={wo.resident_phone} />
        <Field label="Email" value={wo.resident_email} />
      </CollapsibleSection>

      {/* Work Request */}
      <CollapsibleSection title="Work Request" theme="amber">
        <Field label="Description" value={wo.work_request_description} />
        <Field
          label="Emergency"
          value={wo.is_emergency.trim() ? wo.is_emergency : "No"}
        />
        <Field label="Permission to Enter" value={wo.permission_to_enter} />
        <Field label="Access Notes" value={wo.access_notes} />
      </CollapsibleSection>

      {/* Email Sent to Tenant */}
      <CollapsibleSection
        title="Email Sent to Tenant"
        theme="blue"
        defaultOpen={false}
        isEmpty={!wo.Initial_Reachout.trim()}
      >
        <EmailBlock content={wo.Initial_Reachout} />
      </CollapsibleSection>

      {/* Tenant Response */}
      <CollapsibleSection
        title="Tenant Response"
        theme="emerald"
        defaultOpen={false}
        isEmpty={!wo["Initial Tenet Email Response"].trim()}
      >
        <EmailBlock content={wo["Initial Tenet Email Response"]} />
      </CollapsibleSection>

      {/* Assignment */}
      <CollapsibleSection
        title="Assignment"
        theme="rose"
        isEmpty={!wo.Vendor.trim()}
      >
        <Field label="Vendor" value={wo.Vendor || "Not yet assigned"} />
        <Field label="Job Date" value={wo["Date of Job"] || "Not yet scheduled"} />
      </CollapsibleSection>

      {/* Status */}
      <CollapsibleSection title="Status" theme="emerald">
        <Field
          label="Completed"
          value={wo["Completed?"].trim() || "Pending..."}
        />
      </CollapsibleSection>
    </div>
  );
}
