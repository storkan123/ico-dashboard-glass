"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { WorkOrder } from "@/app/lib/types";
import { deriveSteps } from "@/app/lib/deriveSteps";
import StepTracker from "@/app/components/StepTracker";
import DetailCard from "@/app/components/DetailCard";

interface ApiMeta {
  executionId: string;
  workflowId: string;
  n8nUrl: string;
}

export default function WorkOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/workorders");
      const json = await res.json();
      if (json.success) {
        const found = json.data.find(
          (wo: WorkOrder) => wo.work_request_number === id
        );
        if (found) {
          setWorkOrder(found);
          setMeta(json.meta || null);
          setError(null);
        } else {
          setError(`Work order #${id} not found`);
        }
      } else {
        setError(json.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30_000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div
            className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderColor: "var(--accent-blue)", borderTopColor: "transparent" }}
          />
          <p style={{ color: "var(--text-muted)" }}>Loading work order...</p>
        </div>
      </div>
    );
  }

  if (error || !workOrder) {
    return (
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm mb-6 transition-colors"
          style={{ color: "var(--accent-emerald)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Active Work Orders
        </Link>
        <div
          className="rounded-xl p-6 text-center border"
          style={{
            background: "var(--stage-emergency-bg)",
            borderColor: "var(--stage-emergency-border)",
          }}
        >
          <p className="font-medium" style={{ color: "var(--stage-emergency-text)" }}>
            {error || "Work order not found"}
          </p>
        </div>
      </div>
    );
  }

  const steps = deriveSteps(workOrder);
  const n8nWorkflowUrl = meta
    ? `${meta.n8nUrl}/workflow/${meta.workflowId}/executions`
    : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm transition-colors"
          style={{ color: "var(--accent-emerald)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Active Work Orders
        </Link>

        {n8nWorkflowUrl && (
          <a
            href={n8nWorkflowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors glass-card"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              color: "var(--text-muted)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View in n8n
          </a>
        )}
      </div>

      <StepTracker steps={steps} />
      <DetailCard wo={workOrder} />
    </div>
  );
}
