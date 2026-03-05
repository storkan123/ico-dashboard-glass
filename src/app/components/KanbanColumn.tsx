import { WorkOrder, Stage, STAGE_CONFIG } from "@/app/lib/types";
import WorkOrderCard from "./WorkOrderCard";

const STAGE_CSS_KEY: Record<Stage, string> = {
  awaiting_reply: "awaiting",
  emergency: "emergency",
  triaged: "triaged",
  scheduled: "scheduled",
  complete: "complete",
  incomplete: "incomplete",
};

const STAGE_ICON: Record<Stage, string> = {
  awaiting_reply: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  emergency: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  triaged: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
  scheduled: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
  complete: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  incomplete: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
};

export default function KanbanColumn({
  stage,
  workOrders,
}: {
  stage: Stage;
  workOrders: WorkOrder[];
}) {
  const meta = STAGE_CONFIG[stage];
  const cssKey = STAGE_CSS_KEY[stage];

  return (
    <div className="flex flex-col min-w-[280px] max-w-[340px] flex-1 animate-fade-in-up">
      {/* Column header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 rounded-t-xl border border-b-0"
        style={{
          background: `linear-gradient(135deg, var(--stage-${cssKey}-bg) 0%, var(--bg-card) 100%)`,
          borderColor: `var(--stage-${cssKey}-border)`,
        }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: `var(--stage-${cssKey}-bg)` }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`var(--stage-${cssKey}-text)`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={STAGE_ICON[stage]} />
          </svg>
        </div>
        <span
          className="text-sm font-semibold"
          style={{ color: `var(--stage-${cssKey}-text)` }}
        >
          {meta.label}
        </span>
        <span
          className="text-xs font-bold ml-auto w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: `var(--stage-${cssKey}-border)`,
            color: `var(--stage-${cssKey}-text)`,
          }}
        >
          {workOrders.length}
        </span>
      </div>

      {/* Column body */}
      <div
        className="flex flex-col gap-3 p-3 rounded-b-xl border border-t-0 min-h-[140px] kanban-scroll"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-primary)",
          maxHeight: "calc(100vh - 320px)",
          overflowY: "auto",
        }}
      >
        {workOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--bg-card)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-dim)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              No work orders
            </p>
          </div>
        ) : (
          <div className="stagger-children">
            {workOrders.map((wo) => (
              <WorkOrderCard key={wo.work_request_number} wo={wo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
