import mongoose, { Schema, Document, Model } from "mongoose";
import {
  LEAD_STATUSES,
  LEAD_PRIORITIES,
  LOAN_TYPES,
  TEAM_MEMBERS,
  type LeadStatus,
  type LeadPriority,
  type LoanType,
} from "@/lib/constants";
export type { LeadStatus, LeadPriority, LoanType };
export { LEAD_STATUSES, LEAD_PRIORITIES, LOAN_TYPES, TEAM_MEMBERS };

export interface INote {
  text: string;
  createdAt: Date;
  createdBy: string;
}

export interface ITimelineEntry {
  action: string;
  details: string;
  createdAt: Date;
  createdBy: string;
}

export interface ILead extends Document {
  fullName: string;
  mobile: string;
  email: string;
  loanType: string;
  loanAmount: string;
  message: string;
  sourcePage: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string;
  notes: INote[];
  timeline: ITimelineEntry[];
  nextFollowUp: Date | null;
  city: string;
  employment: string;
  income: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Schema ---
const NoteSchema = new Schema<INote>(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "Admin" },
  },
  { _id: true }
);

const TimelineSchema = new Schema<ITimelineEntry>(
  {
    action: { type: String, required: true },
    details: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "System" },
  },
  { _id: true }
);

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    loanType: { type: String, required: true, default: "Home Loan" },
    loanAmount: { type: String, default: "" },
    message: { type: String, default: "" },
    sourcePage: { type: String, default: "Website" },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
    },
    priority: {
      type: String,
      enum: LEAD_PRIORITIES,
      default: "Medium",
    },
    assignedTo: { type: String, default: "" },
    notes: [NoteSchema],
    timeline: [TimelineSchema],
    nextFollowUp: { type: Date, default: null },
    city: { type: String, default: "" },
    employment: { type: String, default: "" },
    income: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Indexes for search performance
LeadSchema.index({ fullName: "text", mobile: "text", email: "text" });
LeadSchema.index({ status: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ nextFollowUp: 1 });

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
