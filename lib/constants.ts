/**
 * Shared constants for lead data.
 * This file does NOT import mongoose, so it's safe to use in client components.
 */

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Interested",
  "Follow Up",
  "Approved",
  "Rejected",
  "Closed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_PRIORITIES = ["High", "Medium", "Low"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export const LOAN_TYPES = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Education Loan",
  "New Car Loan",
  "Used Car Loan",
  "Loan Against Property",
  "MSME Loan",
  "Working Capital",
  "Machinery Loan",
  "Other",
] as const;
export type LoanType = (typeof LOAN_TYPES)[number];

export const TEAM_MEMBERS = ["Admin", "Rahul", "Priya", "Amit"] as const;
