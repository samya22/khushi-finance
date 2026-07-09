"use client";

import React from "react";
import { LEAD_STATUSES, LOAN_TYPES, LEAD_PRIORITIES, TEAM_MEMBERS } from "@/lib/constants";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  loanType: string;
  onLoanTypeChange: (val: string) => void;
  priority: string;
  onPriorityChange: (val: string) => void;
  assignedTo: string;
  onAssignedToChange: (val: string) => void;
  dateFrom: string;
  onDateFromChange: (val: string) => void;
  dateTo: string;
  onDateToChange: (val: string) => void;
  onReset: () => void;
}

export default function LeadFilters({
  search, onSearchChange,
  status, onStatusChange,
  loanType, onLoanTypeChange,
  priority, onPriorityChange,
  assignedTo, onAssignedToChange,
  dateFrom, onDateFromChange,
  dateTo, onDateToChange,
  onReset,
}: LeadFiltersProps) {
  const hasFilters = status || loanType || priority || assignedTo || dateFrom || dateTo;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
      {/* Search */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          placeholder="Search by name, mobile, or email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        />
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        >
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={loanType}
          onChange={(e) => onLoanTypeChange(e.target.value)}
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        >
          <option value="">All Loan Types</option>
          {LOAN_TYPES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        >
          <option value="">All Priorities</option>
          {LEAD_PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={assignedTo}
          onChange={(e) => onAssignedToChange(e.target.value)}
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        >
          <option value="">All Assignees</option>
          {TEAM_MEMBERS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          placeholder="From Date"
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          placeholder="To Date"
          className="border border-gray-200 rounded-lg py-2 px-3 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
        />
      </div>

      {hasFilters && (
        <button
          onClick={onReset}
          className="text-xs font-semibold text-primary hover:text-primary-dark cursor-pointer"
        >
          ✕ Clear all filters
        </button>
      )}
    </div>
  );
}
