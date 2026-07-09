import React from "react";

interface TimelineEntry {
  _id?: string;
  action: string;
  details: string;
  createdAt: string;
  createdBy: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

const actionIcons: Record<string, React.ReactNode> = {
  "Lead Created": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
  ),
  "Status Changed": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  "Lead Assigned": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="23 6 13 6"/></svg>
  ),
  "Note Added": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  ),
  "Follow-up Scheduled": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  "Priority Changed": (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
  ),
};

const defaultIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default function Timeline({ entries }: TimelineProps) {
  if (!entries || entries.length === 0) {
    return (
      <p className="text-sm text-text-muted italic py-4">No activity recorded yet.</p>
    );
  }

  // Sort newest first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-0">
      {sorted.map((entry, index) => {
        const date = new Date(entry.createdAt);
        const icon = actionIcons[entry.action] || defaultIcon;

        return (
          <div key={entry._id || index} className="flex gap-4 relative">
            {/* Connector line */}
            {index < sorted.length - 1 && (
              <div className="absolute left-[15px] top-9 bottom-0 w-[2px] bg-gray-200" />
            )}

            {/* Icon */}
            <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 z-10">
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <p className="text-sm font-bold text-text-dark">{entry.action}</p>
              {entry.details && (
                <p className="text-sm text-text-muted mt-0.5">{entry.details}</p>
              )}
              <p className="text-xs text-text-muted mt-1">
                {date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                at{" "}
                {date.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                {entry.createdBy && (
                  <span className="text-text-muted"> · by {entry.createdBy}</span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
