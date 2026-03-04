import { WorkOrder, Step } from "./types";

export function deriveSteps(wo: WorkOrder): Step[] {
  const steps: Step[] = [
    {
      label: "Email Received",
      description: "Work order submitted via email",
      completed: !!wo.work_request_date.trim(),
      current: false,
      color: "amber",
      detail: wo.work_request_date,
    },
    {
      label: "AI Classified",
      description: "AI analyzed and classified the request",
      completed: wo.is_emergency.trim() !== "",
      current: false,
      color: "red",
      detail: wo.is_emergency.trim()
        ? `Emergency: ${wo.is_emergency}`
        : undefined,
    },
    {
      label: "Tenant Contacted",
      description: "Initial outreach email sent to tenant",
      completed: !!wo.Initial_Reachout.trim(),
      current: false,
      color: "blue",
      detail: wo["Initial Tenet Email Response"].trim() || undefined,
    },
    {
      label: "Vendor Assigned",
      description: "Maintenance vendor assigned to the job",
      completed: !!wo.Vendor.trim(),
      current: false,
      color: "violet",
      detail: wo.Vendor.trim() || undefined,
    },
    {
      label: "Job Scheduled",
      description: "Job date and time confirmed",
      completed: !!wo["Date of Job"].trim(),
      current: false,
      color: "rose",
      detail: wo["Date of Job"].trim() || undefined,
    },
    {
      label: "Completed",
      description: "Follow-up sent, tenant confirmed resolution",
      completed:
        wo["Completed?"].trim().toLowerCase() === "complete" ||
        wo["Completed?"].trim().toLowerCase() === "incomplete",
      current: false,
      color: "emerald",
      detail: wo["Completed?"].trim() || undefined,
    },
  ];

  // Find the last completed step
  let lastCompletedIndex = -1;
  for (let i = steps.length - 1; i >= 0; i--) {
    if (steps[i].completed) {
      lastCompletedIndex = i;
      break;
    }
  }

  // Mark incomplete steps before the last completed as "skipped"
  for (let i = 0; i < lastCompletedIndex; i++) {
    if (!steps[i].completed) {
      steps[i].skipped = true;
    }
  }

  // Mark current = first incomplete step after last completed
  let foundCurrent = false;
  for (let i = lastCompletedIndex + 1; i < steps.length; i++) {
    if (!steps[i].completed) {
      steps[i].current = true;
      foundCurrent = true;
      break;
    }
  }

  // If all completed, mark the last step as current
  if (!foundCurrent && steps.length > 0) {
    steps[steps.length - 1].current = true;
  }

  return steps;
}
