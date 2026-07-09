"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import StatsCard from "./components/StatsCard";
import LeadStatusBadge from "./components/LeadStatusBadge";

interface FollowUpLead {
  _id: string;
  fullName: string;
  mobile: string;
  loanType: string;
  nextFollowUp: string;
  assignedTo: string;
  status: string;
}

interface RecentLead {
  _id: string;
  fullName: string;
  mobile: string;
  loanType: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byStatus: {
    new: number;
    contacted: number;
    interested: number;
    followUp: number;
    approved: number;
    rejected: number;
    closed: number;
  };
  followUps: {
    today: FollowUpLead[];
    tomorrow: FollowUpLead[];
    overdue: FollowUpLead[];
  };
  recentLeads: RecentLead[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/leads/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Failed to load dashboard data. Please refresh.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark font-heading">Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Lead Management Overview</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-lg transition-all duration-200 text-sm cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            View All Leads
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total Leads"
          value={stats.total}
          color="blue"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatsCard
          label="Today's Leads"
          value={stats.today}
          color="green"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <StatsCard
          label="This Week"
          value={stats.thisWeek}
          color="purple"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>}
        />
        <StatsCard
          label="This Month"
          value={stats.thisMonth}
          color="orange"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        <StatsCard label="New" value={stats.byStatus.new} color="blue"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>}
        />
        <StatsCard label="Contacted" value={stats.byStatus.contacted} color="blue"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
        />
        <StatsCard label="Interested" value={stats.byStatus.interested} color="purple"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
        />
        <StatsCard label="Follow Up" value={stats.byStatus.followUp} color="yellow"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>}
        />
        <StatsCard label="Approved" value={stats.byStatus.approved} color="green"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        />
        <StatsCard label="Rejected" value={stats.byStatus.rejected} color="red"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>}
        />
        <StatsCard label="Closed" value={stats.byStatus.closed} color="slate"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
      </div>

      {/* Follow-ups & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follow-ups Section */}
        <div className="space-y-4">
          {/* Overdue Follow-ups */}
          {stats.followUps.overdue.length > 0 && (
            <div className="bg-white border border-red-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                Overdue Follow-ups ({stats.followUps.overdue.length})
              </h3>
              <div className="space-y-2">
                {stats.followUps.overdue.map((lead) => (
                  <Link
                    key={lead._id}
                    href={`/admin/leads/${lead._id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
                      <p className="text-xs text-text-muted">{lead.loanType} · {lead.assignedTo || "Unassigned"}</p>
                    </div>
                    <span className="text-xs font-bold text-red-600">
                      {new Date(lead.nextFollowUp).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Today's Follow-ups */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Today&apos;s Follow-ups ({stats.followUps.today.length})
            </h3>
            {stats.followUps.today.length === 0 ? (
              <p className="text-sm text-text-muted italic py-2">No follow-ups scheduled for today.</p>
            ) : (
              <div className="space-y-2">
                {stats.followUps.today.map((lead) => (
                  <Link
                    key={lead._id}
                    href={`/admin/leads/${lead._id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
                      <p className="text-xs text-text-muted">{lead.loanType} · {lead.assignedTo || "Unassigned"}</p>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tomorrow's Follow-ups */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-3">
              Tomorrow&apos;s Follow-ups ({stats.followUps.tomorrow.length})
            </h3>
            {stats.followUps.tomorrow.length === 0 ? (
              <p className="text-sm text-text-muted italic py-2">No follow-ups scheduled for tomorrow.</p>
            ) : (
              <div className="space-y-2">
                {stats.followUps.tomorrow.map((lead) => (
                  <Link
                    key={lead._id}
                    href={`/admin/leads/${lead._id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
                      <p className="text-xs text-text-muted">{lead.loanType}</p>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider">Recent Leads</h3>
            <Link href="/admin/leads" className="text-xs font-bold text-primary hover:text-primary-dark">
              View All →
            </Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <p className="text-sm text-text-muted italic py-4">No leads yet. They will appear here when customers submit enquiry forms.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => {
                const date = new Date(lead.createdAt);
                return (
                  <Link
                    key={lead._id}
                    href={`/admin/leads/${lead._id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-light text-primary rounded-full flex items-center justify-center font-bold text-sm uppercase">
                        {lead.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
                        <p className="text-xs text-text-muted">{lead.loanType} · +91 {lead.mobile}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <LeadStatusBadge status={lead.status} />
                      <p className="text-[10px] text-text-muted mt-1">
                        {date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
