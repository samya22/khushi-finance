import React from "react";

const priorityConfig: Record<string, { bg: string; text: string; dot: string }> = {
  High: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  Low: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
};

interface LeadPriorityBadgeProps {
  priority: string;
}

export default function LeadPriorityBadge({ priority }: LeadPriorityBadgeProps) {
  const config = priorityConfig[priority] || priorityConfig["Medium"];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-2.5 py-1 ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {priority}
    </span>
  );
}
