import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { requireAuth } from "@/lib/auth";
import { sendAdminNotification, sendCustomerConfirmation } from "@/lib/email";

/**
 * GET /api/leads — Fetch leads with pagination, search, and filters.
 * Requires authentication.
 */
export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const loanType = searchParams.get("loanType") || "";
    const priority = searchParams.get("priority") || "";
    const assignedTo = searchParams.get("assignedTo") || "";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build query
    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (loanType) query.loanType = loanType;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) (query.createdAt as Record<string, unknown>).$gte = new Date(dateFrom);
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        (query.createdAt as Record<string, unknown>).$lte = endDate;
      }
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [leads, total] = await Promise.all([
      Lead.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Lead.countDocuments(query),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] GET /api/leads error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/leads — Create a new lead.
 * Public endpoint (used by website forms).
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validation
    const { fullName, mobile, loanType } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }

    if (!mobile || !mobile.trim()) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    // Sanitize mobile: remove spaces and non-digit characters except +
    const cleanMobile = mobile.replace(/[^\d]/g, "").slice(-10);
    if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      return NextResponse.json({ error: "Please enter a valid 10-digit Indian mobile number" }, { status: 400 });
    }

    if (!loanType) {
      return NextResponse.json({ error: "Loan type is required" }, { status: 400 });
    }

    // Sanitize inputs
    const sanitize = (str: string) =>
      str ? str.replace(/[<>]/g, "").trim() : "";

    const leadData = {
      fullName: sanitize(fullName),
      mobile: cleanMobile,
      email: sanitize(body.email || ""),
      loanType: sanitize(loanType),
      loanAmount: sanitize(body.loanAmount || ""),
      message: sanitize(body.message || ""),
      sourcePage: sanitize(body.sourcePage || "Website"),
      city: sanitize(body.city || ""),
      employment: sanitize(body.employment || ""),
      income: sanitize(body.income || ""),
      status: "New" as const,
      priority: "Medium" as const,
      timeline: [
        {
          action: "Lead Created",
          details: `New enquiry received from ${sanitize(body.sourcePage || "Website")} page`,
          createdAt: new Date(),
          createdBy: "System",
        },
      ],
    };

    const lead = await Lead.create(leadData);

    // Send emails (non-blocking)
    const emailData = {
      fullName: leadData.fullName,
      mobile: leadData.mobile,
      email: leadData.email,
      loanType: leadData.loanType,
      loanAmount: leadData.loanAmount,
      message: leadData.message,
      sourcePage: leadData.sourcePage,
    };

    // Fire and forget — don't block response for email delivery
    sendAdminNotification(emailData).catch(console.error);
    if (leadData.email) {
      sendCustomerConfirmation(emailData).catch(console.error);
    }

    return NextResponse.json(
      { success: true, leadId: lead._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API] POST /api/leads error:", error);
    return NextResponse.json({ error: "Failed to save enquiry. Please try again." }, { status: 500 });
  }
}
