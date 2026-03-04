"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkOrder, STAGE_CONFIG } from "@/app/lib/types";
import { formatDate } from "@/app/lib/utils";

type SortKey =
  | "work_request_number"
  | "property_name"
  | "resident_name"
  | "Vendor"
  | "Date of Job"
  | "Completed?";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "work_request_number", label: "WR#" },
  { key: "property_name", label: "Property" },
  { key: "resident_name", label: "Resident" },
  { key: "Vendor", label: "Vendor" },
  { key: "Date of Job", label: "Job Date" },
  { key: "Completed?", label: "Status" },
];

export default function HistoryTable({
  workOrders,
}: {
  workOrders: WorkOrder[];
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("work_request_number");
  const [sortAsc, setSortAsc] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = workOrders.filter((wo) => {
    if (statusFilter !== "all") {
      const completed = wo["Completed?"].trim().toLowerCase();
      if (statusFilter === "complete" && completed !== "complete") return false;
      if (statusFilter === "incomplete" && completed !== "incomplete")
        return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      wo.work_request_number.toLowerCase().includes(q) ||
      wo.property_name.toLowerCase().includes(q) ||
      wo.resident_name.toLowerCase().includes(q) ||
      wo.Vendor.toLowerCase().includes(q) ||
      wo.work_request_description.toLowerCase().includes(q) ||
      wo.property_address.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
    const cmp = aVal.localeCompare(bVal, undefined, { numeric: true });
    return sortAsc ? cmp : -cmp;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const totalComplete = workOrders.filter(
    (wo) => wo["Completed?"].trim().toLowerCase() === "complete"
  ).length;
  const totalIncomplete = workOrders.filter(
    (wo) => wo["Completed?"].trim().toLowerCase() === "incomplete"
  ).length;
  const rate =
    workOrders.length > 0
      ? Math.round((totalComplete / workOrders.length) * 100)
      : 0;

  return (
    <div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="rounded-xl border-l-4 px-4 py-3 glass-card"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-card)",
            borderLeftColor: "var(--accent-emerald)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Completed
          </p>
          <p className="text-2xl font-bold" style={{ color: "var(--accent-emerald)" }}>
            {totalComplete}
          </p>
        </div>
        <div
          className="rounded-xl border-l-4 px-4 py-3 glass-card"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-card)",
            borderLeftColor: "var(--accent-rose)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Incomplete
          </p>
          <p className="text-2xl font-bold" style={{ color: "var(--accent-rose)" }}>
            {totalIncomplete}
          </p>
        </div>
        <div
          className="rounded-xl border-l-4 px-4 py-3 glass-card"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-card)",
            borderLeftColor: "var(--accent-blue)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            Completion Rate
          </p>
          <p className="text-2xl font-bold" style={{ color: "var(--accent-blue)" }}>
            {rate}%
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search work orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{
            background: "var(--bg-input)",
            borderColor: "var(--border-primary)",
            color: "var(--text-primary)",
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
          style={{
            background: "var(--bg-input)",
            borderColor: "var(--border-primary)",
            color: "var(--text-primary)",
          }}
        >
          <option value="all">All Status</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden glass-card"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-card)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {col.label}
                    {sortKey === col.key && (
                      <span className="ml-1">{sortAsc ? "\u2191" : "\u2193"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="text-center py-12"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {search || statusFilter !== "all"
                      ? "No matching work orders"
                      : "No completed work orders yet"}
                  </td>
                </tr>
              ) : (
                sorted.map((wo) => {
                  const isComplete =
                    wo["Completed?"].trim().toLowerCase() === "complete";
                  const stageKey = isComplete ? "complete" : "incomplete";
                  return (
                    <tr
                      key={wo.work_request_number}
                      className="border-b cursor-pointer transition-colors"
                      style={{ borderColor: "var(--border-primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--bg-card-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/work-order/${wo.work_request_number}`}
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {wo.work_request_number}
                        </Link>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                        {wo.property_name}
                        {wo.unit ? ` (${wo.unit})` : ""}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                        {wo.resident_name}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                        {wo.Vendor || "—"}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>
                        {wo["Date of Job"] ? formatDate(wo["Date of Job"]) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            background: `var(--stage-${stageKey}-bg)`,
                            color: `var(--stage-${stageKey}-text)`,
                          }}
                        >
                          {isComplete ? "Complete" : "Incomplete"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {sorted.length > 0 && (
        <p className="text-xs mt-3" style={{ color: "var(--text-dim)" }}>
          Showing {sorted.length} of {workOrders.length} work orders
        </p>
      )}
    </div>
  );
}
