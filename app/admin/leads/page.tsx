"use client";

import React, { useEffect, useState, useCallback } from "react";
import LeadTable from "../components/LeadTable";
import LeadFilters from "../components/LeadFilters";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AllLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1, limit: 20, total: 0, totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loanType, setLoanType] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Delete modal
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Export loading
  const [isExporting, setIsExporting] = useState(false);

  const fetchLeads = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      if (loanType) params.set("loanType", loanType);
      if (priority) params.set("priority", priority);
      if (assignedTo) params.set("assignedTo", assignedTo);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);

      const res = await fetch(`/api/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    }
    setIsLoading(false);
  }, [search, status, loanType, priority, assignedTo, dateFrom, dateTo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads(1);
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [fetchLeads]);

  function resetFilters() {
    setSearch("");
    setStatus("");
    setLoanType("");
    setPriority("");
    setAssignedTo("");
    setDateFrom("");
    setDateTo("");
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/leads/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter((l) => l._id !== deleteTarget.id));
        setPagination((p) => ({ ...p, total: p.total - 1 }));
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }

    setIsDeleting(false);
    setDeleteTarget(null);
  }

  async function handleExport(range: string) {
    setIsExporting(true);
    try {
      const res = await fetch(`/api/leads/export?range=${range}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "KhushiFinance-Leads.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
    setIsExporting(false);
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-dark font-heading">All Leads</h1>
          <p className="text-sm text-text-muted mt-1">
            {pagination.total} total lead{pagination.total !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleExport("today")}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-medium bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Today
          </button>
          <button
            onClick={() => handleExport("month")}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-medium bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            This Month
          </button>
          <button
            onClick={() => handleExport("all")}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-accent-green hover:bg-accent-green/90 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Export All (.xlsx)
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <LeadFilters
          search={search} onSearchChange={setSearch}
          status={status} onStatusChange={setStatus}
          loanType={loanType} onLoanTypeChange={setLoanType}
          priority={priority} onPriorityChange={setPriority}
          assignedTo={assignedTo} onAssignedToChange={setAssignedTo}
          dateFrom={dateFrom} onDateFromChange={setDateFrom}
          dateTo={dateTo} onDateToChange={setDateTo}
          onReset={resetFilters}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <LeadTable leads={leads} onDeleteClick={(id, name) => setDeleteTarget({ id, name })} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-text-muted">
                Showing {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchLeads(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-2 text-sm font-semibold text-text-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => fetchLeads(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-3 py-2 text-sm font-semibold text-text-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        leadName={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </>
  );
}
