import React from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "orange" | "slate";
  subtitle?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: "bg-blue-100 text-blue-600",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "bg-emerald-100 text-emerald-600",
  },
  yellow: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    icon: "bg-amber-100 text-amber-600",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    icon: "bg-red-100 text-red-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: "bg-purple-100 text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    icon: "bg-orange-100 text-orange-600",
  },
  slate: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    icon: "bg-slate-100 text-slate-600",
  },
};

export default function StatsCard({
  label,
  value,
  icon,
  color = "blue",
  subtitle,
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div>
        <p className={`text-2xl font-extrabold font-heading ${colors.text}`}>{value}</p>
        <p className="text-sm font-semibold text-text-muted mt-1">{label}</p>
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
