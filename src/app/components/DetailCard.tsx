import { WorkOrder, STAGE_CONFIG } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";
import CollapsibleSection from "./CollapsibleSection";

function Field({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <div className="flex gap-2 text-sm mb-1.5">
      <span className="font-medium min-w-[140px]" style={{ color: "var(--text-muted)" }}>
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
      className="rounded-lg p-4 text-sm whitespace-pre-wrap leading-relaxed"
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
    <div className="space-y-4">
      {/* Header */}
      <div
        className="rounded-xl border p-6 glass-card"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-card)",
          boxShadow: `var(--shadow-card), 0 0 40px var(--stage-${stageKey}-bg)`,
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              WR# {wo.work_request_number} — {wo.property_name}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Created: {formatDate(wo.work_request_date) || "Unknown"}
            </p>
          </div>
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
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
            className="mt-3 px-3 py-2 rounded-lg text-sm font-medium"
            style={{
              background: "var(--stage-emergency-bg)",
              color: "var(--stage-emergency-text)",
              border: "1px solid var(--stage-emergency-border)",
            }}
          >
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
