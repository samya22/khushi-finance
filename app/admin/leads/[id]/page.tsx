"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LeadStatusBadge from "../../components/LeadStatusBadge";
import LeadPriorityBadge from "../../components/LeadPriorityBadge";
import Timeline from "../../components/Timeline";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { LEAD_STATUSES, LEAD_PRIORITIES, TEAM_MEMBERS } from "@/lib/constants";

interface Note {
  _id?: string;
  text: string;
  createdAt: string;
  createdBy: string;
}

interface TimelineEntry {
  _id?: string;
  action: string;
  details: string;
  createdAt: string;
  createdBy: string;
}

interface LeadDetail {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  loanType: string;
  loanAmount: string;
  message: string;
  sourcePage: string;
  status: string;
  priority: string;
  assignedTo: string;
  notes: Note[];
  timeline: TimelineEntry[];
  nextFollowUp: string | null;
  city: string;
  employment: string;
  income: string;
  createdAt: string;
  updatedAt: string;
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  async function fetchLead() {
    try {
      const res = await fetch(`/api/leads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
      } else {
        router.replace("/admin/leads");
      }
    } catch {
      router.replace("/admin/leads");
    }
    setIsLoading(false);
  }

  async function updateField(field: string, value: string | null) {
    if (!lead) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
      }
    } catch (error) {
      console.error("Failed to update:", error);
    }

    setIsSaving(false);
  }

  async function handleAddNote() {
    if (!newNote.trim()) return;
    setIsAddingNote(true);

    try {
      const res = await fetch(`/api/leads/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNote }),
      });

      if (res.ok) {
        setNewNote("");
        fetchLead(); // Refresh to get updated timeline too
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    }

    setIsAddingNote(false);
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.replace("/admin/leads");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
    setIsDeleting(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted">Lead not found.</p>
      </div>
    );
  }

  const createdDate = new Date(lead.createdAt);

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/admin/leads" className="hover:text-primary transition-colors">Leads</Link>
        <span>/</span>
        <span className="text-text-dark font-semibold">{lead.fullName}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-light text-primary rounded-xl flex items-center justify-center font-bold text-xl uppercase font-heading">
            {lead.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-dark font-heading">{lead.fullName}</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Lead created on {createdDate.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} at{" "}
              {createdDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-white border border-red-200 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Lead Info + Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-text-dark font-heading mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-sm font-semibold text-text-dark">{lead.fullName}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Mobile Number</p>
                <p className="text-sm font-semibold text-text-dark">+91 {lead.mobile}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-text-medium">{lead.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">City</p>
                <p className="text-sm text-text-medium">{lead.city || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-text-dark font-heading mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Loan Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Loan Type</p>
                <p className="text-sm font-semibold text-text-dark">{lead.loanType}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Loan Amount</p>
                <p className="text-sm text-text-medium">{lead.loanAmount || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Employment Type</p>
                <p className="text-sm text-text-medium">{lead.employment || "Not specified"}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Monthly Income</p>
                <p className="text-sm text-text-medium">{lead.income || "Not specified"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Source Page</p>
                <p className="text-sm text-text-medium">{lead.sourcePage}</p>
              </div>
            </div>

            {lead.message && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Customer Message</p>
                <p className="text-sm text-text-medium leading-relaxed bg-gray-50 p-3 rounded-lg">{lead.message}</p>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-text-dark font-heading mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Internal Notes
              <span className="text-xs font-normal text-text-muted">(only visible to admin)</span>
            </h2>

            {/* Add Note */}
            <div className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this lead…"
                className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all resize-none"
                rows={3}
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim() || isAddingNote}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingNote ? "Adding…" : "Add Note"}
              </button>
            </div>

            {/* Notes List */}
            {lead.notes.length === 0 ? (
              <p className="text-sm text-text-muted italic">No notes yet.</p>
            ) : (
              <div className="space-y-3">
                {[...lead.notes].reverse().map((note, i) => {
                  const date = new Date(note.createdAt);
                  return (
                    <div key={note._id || i} className="bg-amber-50 border border-amber-200 rounded-lg p-3.5">
                      <p className="text-sm text-text-dark leading-relaxed">{note.text}</p>
                      <p className="text-[11px] text-text-muted mt-2">
                        by {note.createdBy} · {date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} at{" "}
                        {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-text-dark font-heading mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Activity Timeline
            </h2>
            <Timeline entries={lead.timeline} />
          </div>
        </div>

        {/* Right Column — Quick Actions */}
        <div className="space-y-4">
          {/* Status & Priority Badges */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <LeadStatusBadge status={lead.status} size="md" />
              <LeadPriorityBadge priority={lead.priority} />
            </div>
            {lead.assignedTo && (
              <p className="text-xs text-text-muted">
                Assigned to <strong>{lead.assignedTo}</strong>
              </p>
            )}
            {isSaving && (
              <p className="text-xs text-primary mt-2 font-semibold">Saving changes…</p>
            )}
          </div>

          {/* Update Status */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Update Status</h3>
            <select
              value={lead.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Priority</h3>
            <select
              value={lead.priority}
              onChange={(e) => updateField("priority", e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
            >
              {LEAD_PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Assign To */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Assign To</h3>
            <select
              value={lead.assignedTo}
              onChange={(e) => updateField("assignedTo", e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
            >
              <option value="">Unassigned</option>
              {TEAM_MEMBERS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Follow-up Date */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Next Follow-up</h3>
            <input
              type="datetime-local"
              value={lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().slice(0, 16) : ""}
              onChange={(e) => updateField("nextFollowUp", e.target.value || null)}
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
            />
            {lead.nextFollowUp && (
              <button
                onClick={() => updateField("nextFollowUp", null)}
                className="text-xs font-semibold text-red-500 hover:text-red-700 mt-2 cursor-pointer"
              >
                Remove follow-up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        leadName={lead.fullName}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isDeleting={isDeleting}
      />
    </>
  );
}
