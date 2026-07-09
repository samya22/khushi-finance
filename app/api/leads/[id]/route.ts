import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { requireAuth } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/leads/[id] — Get a single lead.
 */
export async function GET(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await context.params;
    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] GET /api/leads/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/leads/[id] — Update a lead's fields.
 */
export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await requireAuth();
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();
    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const timelineEntries: Array<{ action: string; details: string; createdAt: Date; createdBy: string }> = [];

    // Update status
    if (body.status && body.status !== lead.status) {
      timelineEntries.push({
        action: "Status Changed",
        details: `Status changed from "${lead.status}" to "${body.status}"`,
        createdAt: new Date(),
        createdBy: session.username,
      });
      lead.status = body.status;
    }

    // Update priority
    if (body.priority && body.priority !== lead.priority) {
      timelineEntries.push({
        action: "Priority Changed",
        details: `Priority changed from "${lead.priority}" to "${body.priority}"`,
        createdAt: new Date(),
        createdBy: session.username,
      });
      lead.priority = body.priority;
    }

    // Update assignment
    if (body.assignedTo !== undefined && body.assignedTo !== lead.assignedTo) {
      timelineEntries.push({
        action: "Lead Assigned",
        details: body.assignedTo
          ? `Assigned to ${body.assignedTo}`
          : "Assignment removed",
        createdAt: new Date(),
        createdBy: session.username,
      });
      lead.assignedTo = body.assignedTo;
    }

    // Update follow-up date
    if (body.nextFollowUp !== undefined) {
      const newDate = body.nextFollowUp ? new Date(body.nextFollowUp) : null;
      timelineEntries.push({
        action: "Follow-up Scheduled",
        details: newDate
          ? `Follow-up scheduled for ${newDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} at ${newDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`
          : "Follow-up removed",
        createdAt: new Date(),
        createdBy: session.username,
      });
      lead.nextFollowUp = newDate;
    }

    // Add timeline entries
    if (timelineEntries.length > 0) {
      lead.timeline.push(...timelineEntries);
    }

    await lead.save();

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] PATCH /api/leads/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/leads/[id] — Delete a lead.
 */
export async function DELETE(request: Request, context: RouteContext) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await context.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] DELETE /api/leads/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
