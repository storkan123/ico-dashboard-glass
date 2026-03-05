import { WorkOrder, ACTIVE_STAGES } from "@/app/lib/types";

const STAT_CONFIGS: {
  key: string;
  label: string;
  filter: (wo: WorkOrder) => boolean;
  accentVar: string;
  glowRgb: string;
  icon: string;
}[] = [
  {
    key: "total",
    label: "Total Active",
    filter: (wo) => ACTIVE_STAGES.includes(wo.stage),
    accentVar: "--accent-blue",
    glowRgb: "96, 165, 250",
    icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2",
  },
  {
    key: "awaiting",
    label: "Awaiting Reply",
    filter: (wo) => wo.stage === "awaiting_reply",
    accentVar: "--accent-amber",
    glowRgb: "251, 191, 36",
    icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    key: "emergency",
    label: "Emergency",
    filter: (wo) => wo.stage === "emergency",
    accentVar: "--accent-red",
    glowRgb: "248, 113, 113",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
  {
    key: "triaged",
    label: "Triaged",
    filter: (wo) => wo.stage === "triaged",
    accentVar: "--accent-blue",
    glowRgb: "96, 165, 250",
    icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
  },
  {
    key: "scheduled",
    label: "Scheduled",
    filter: (wo) => wo.stage === "scheduled",
    accentVar: "--accent-violet",
    glowRgb: "167, 139, 250",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
  },
];

export default function StatsBar({
  workOrders,
}: {
  workOrders: WorkOrder[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 stagger-children">
      {STAT_CONFIGS.map((stat) => {
        const count = workOrders.filter(stat.filter).length;
        const isEmergency = stat.key === "emergency" && count > 0;
        return (
          <div
            key={stat.key}
            className={`stat-glow rounded-xl p-4 border glass-card card-hover ${
              isEmergency ? "emergency-glow" : ""
            }`}
            style={{
              background: `linear-gradient(135deg, rgba(${stat.glowRgb}, 0.08) 0%, var(--bg-card) 60%)`,
              borderColor: count > 0 ? `rgba(${stat.glowRgb}, 0.2)` : "var(--border-card)",
              ["--glow-color" as string]: `rgba(${stat.glowRgb}, 0.5)`,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `rgba(${stat.glowRgb}, 0.1)`,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={`var(${stat.accentVar})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={stat.icon} />
                </svg>
              </div>
            </div>
            <p
              className="text-3xl font-bold tracking-tight"
              style={{ color: `var(${stat.accentVar})` }}
            >
              {count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
