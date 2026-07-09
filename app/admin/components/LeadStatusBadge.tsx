import React from "react";

const statusConfig: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-blue-100", text: "text-blue-700" },
  Contacted: { bg: "bg-cyan-100", text: "text-cyan-700" },
  Interested: { bg: "bg-purple-100", text: "text-purple-700" },
  "Follow Up": { bg: "bg-amber-100", text: "text-amber-700" },
  Approved: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Rejected: { bg: "bg-red-100", text: "text-red-700" },
  Closed: { bg: "bg-gray-100", text: "text-gray-700" },
};

interface LeadStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export default function LeadStatusBadge({ status, size = "sm" }: LeadStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig["New"];
  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5";

  return (
    <span className={`inline-flex items-center font-bold rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      {status}
    </span>
  );
}
