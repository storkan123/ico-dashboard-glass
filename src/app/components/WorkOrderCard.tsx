import Link from "next/link";
import { WorkOrder, STAGE_CONFIG } from "@/app/lib/types";
import { timeAgo } from "@/app/lib/utils";

export default function WorkOrderCard({ wo }: { wo: WorkOrder }) {
  const stageMeta = STAGE_CONFIG[wo.stage];
  const isEmergency = wo.stage === "emergency";

  return (
    <Link href={`/work-order/${wo.work_request_number}`}>
      <div
        className={`rounded-xl border p-4 cursor-pointer glass-card card-hover gradient-border-hover ${
          isEmergency ? "emergency-glow" : ""
        }`}
        style={{
          background: "var(--bg-card)",
          borderColor: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-border)`,
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-md"
              style={{
                background: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-bg)`,
                color: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-text)`,
              }}
            >
              #{wo.work_request_number}
            </span>
            <span className="text-xs" style={{ color: "var(--text-dim)" }}>
              {timeAgo(wo.work_request_date)}
            </span>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
            style={{
              background: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-bg)`,
              color: `var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-text)`,
              border: `1px solid var(--stage-${wo.stage === "awaiting_reply" ? "awaiting" : wo.stage}-border)`,
            }}
          >
            {stageMeta.label}
          </span>
        </div>

        {/* Property & Resident */}
        <p className="text-sm font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>
          {wo.property_name}
          {wo.unit ? ` — Unit ${wo.unit}` : ""}
        </p>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {wo.resident_name}
        </p>

        {/* Description */}
        <p
          className="text-xs leading-relaxed"
          style={{
            color: "var(--text-dim)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {wo.work_request_description}
        </p>

        {/* Vendor footer */}
        {wo.Vendor && (
          <div
            className="mt-3 pt-3 flex items-center gap-2 text-xs"
            style={{
              borderTop: "1px solid var(--border-primary)",
              color: "var(--text-muted)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{wo.Vendor}</span>
            {wo["Date of Job"] && (
              <>
                <span style={{ color: "var(--text-dim)" }}>·</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                <span>{wo["Date of Job"]}</span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
