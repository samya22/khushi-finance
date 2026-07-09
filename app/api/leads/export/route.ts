import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { requireAuth } from "@/lib/auth";
import * as XLSX from "xlsx";

/**
 * GET /api/leads/export — Export leads as Excel file.
 * Supports range query param: today | week | month | all
 */
export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const range = request.nextUrl.searchParams.get("range") || "all";

    const now = new Date();
    const query: Record<string, unknown> = {};

    if (range === "today") {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      query.createdAt = { $gte: todayStart };
    } else if (range === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - 7);
      query.createdAt = { $gte: weekStart };
    } else if (range === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      query.createdAt = { $gte: monthStart };
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Prepare data for Excel
    const excelData = leads.map((lead) => {
      const created = new Date(lead.createdAt);
      return {
        Name: lead.fullName,
        Mobile: lead.mobile,
        Email: lead.email || "—",
        "Loan Type": lead.loanType,
        "Loan Amount": lead.loanAmount || "—",
        Message: lead.message || "—",
        Status: lead.status,
        Priority: lead.priority,
        "Assigned To": lead.assignedTo || "—",
        "Source Page": lead.sourcePage || "—",
        Date: created.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        Time: created.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    ws["!cols"] = [
      { wch: 22 }, // Name
      { wch: 14 }, // Mobile
      { wch: 28 }, // Email
      { wch: 22 }, // Loan Type
      { wch: 16 }, // Loan Amount
      { wch: 40 }, // Message
      { wch: 14 }, // Status
      { wch: 10 }, // Priority
      { wch: 14 }, // Assigned To
      { wch: 16 }, // Source Page
      { wch: 14 }, // Date
      { wch: 12 }, // Time
    ];

    const sheetName =
      range === "today"
        ? "Today's Leads"
        : range === "week"
        ? "This Week"
        : range === "month"
        ? "This Month"
        : "All Leads";

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generate buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="KhushiFinance-Leads.xlsx"`,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] GET /api/leads/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
