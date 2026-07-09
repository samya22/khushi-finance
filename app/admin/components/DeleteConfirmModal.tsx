"use client";

import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  leadName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  leadName,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-dark font-heading">Delete Lead</h3>
            <p className="text-sm text-text-muted">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-text-medium mb-6">
          Are you sure you want to permanently delete the lead for{" "}
          <strong>{leadName}</strong>? All associated notes, timeline entries, and data will be lost.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2.5 text-sm font-semibold text-text-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            {isDeleting ? "Deleting…" : "Delete Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}
