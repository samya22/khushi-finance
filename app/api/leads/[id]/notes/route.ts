import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { requireAuth } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/leads/[id]/notes — Add a note to a lead.
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    const session = await requireAuth();
    await connectDB();

    const { id } = await context.params;
    const { text } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Note text is required" }, { status: 400 });
    }

    const lead = await Lead.findById(id);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const sanitizedText = text.replace(/[<>]/g, "").trim();

    lead.notes.push({
      text: sanitizedText,
      createdAt: new Date(),
      createdBy: session.username,
    });

    lead.timeline.push({
      action: "Note Added",
      details: sanitizedText.length > 80
        ? sanitizedText.substring(0, 80) + "…"
        : sanitizedText,
      createdAt: new Date(),
      createdBy: session.username,
    });

    await lead.save();

    return NextResponse.json({ success: true, notes: lead.notes });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] POST /api/leads/[id]/notes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
