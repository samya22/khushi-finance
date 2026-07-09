"use client";

import React from "react";
import Link from "next/link";
import LeadStatusBadge from "./LeadStatusBadge";
import LeadPriorityBadge from "./LeadPriorityBadge";

interface Lead {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  loanType: string;
  loanAmount: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdAt: string;
}

interface LeadTableProps {
  leads: Lead[];
  onDeleteClick: (id: string, name: string) => void;
}

export default function LeadTable({ leads, onDeleteClick }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h3 className="text-lg font-bold text-text-dark font-heading mb-1">No leads found</h3>
        <p className="text-sm text-text-muted">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Name</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Mobile</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Email</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Loan Type</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Amount</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Status</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Priority</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5 hidden xl:table-cell">Assigned</th>
              <th className="text-left text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Date</th>
              <th className="text-right text-[11px] font-bold text-text-muted uppercase tracking-wider px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => {
              const date = new Date(lead.createdAt);
              return (
                <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-text-medium">+91 {lead.mobile}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-sm text-text-muted truncate max-w-[180px]">{lead.email || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-text-medium">{lead.loanType}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <p className="text-sm text-text-muted">{lead.loanAmount || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <LeadPriorityBadge priority={lead.priority} />
                  </td>
                  <td className="px-5 py-3.5 hidden xl:table-cell">
                    <p className="text-sm text-text-muted">{lead.assignedTo || "—"}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-xs text-text-muted">
                      {date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                    </p>
                    <p className="text-xs text-text-muted">
                      {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/leads/${lead._id}`}
                        className="p-2 rounded-lg text-primary hover:bg-primary-light transition-all duration-200"
                        title="View Lead"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </Link>
                      <button
                        onClick={() => onDeleteClick(lead._id, lead.fullName)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        title="Delete Lead"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
