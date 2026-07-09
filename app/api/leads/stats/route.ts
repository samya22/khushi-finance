import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/leads/stats — Dashboard statistics.
 */
export async function GET() {
  try {
    await requireAuth();
    await connectDB();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrowStart);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      total,
      today,
      thisWeek,
      thisMonth,
      statusCounts,
      priorityCounts,
      todayFollowUps,
      tomorrowFollowUps,
      overdueFollowUps,
      recentLeads,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: todayStart } }),
      Lead.countDocuments({ createdAt: { $gte: weekStart } }),
      Lead.countDocuments({ createdAt: { $gte: monthStart } }),
      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $group: { _id: "$priority", count: { $sum: 1 } } },
      ]),
      Lead.find({
        nextFollowUp: { $gte: todayStart, $lt: tomorrowStart },
      })
        .select("fullName mobile loanType nextFollowUp assignedTo status")
        .sort({ nextFollowUp: 1 })
        .limit(20)
        .lean(),
      Lead.find({
        nextFollowUp: { $gte: tomorrowStart, $lt: dayAfterTomorrow },
      })
        .select("fullName mobile loanType nextFollowUp assignedTo status")
        .sort({ nextFollowUp: 1 })
        .limit(20)
        .lean(),
      Lead.find({
        nextFollowUp: { $lt: todayStart, $ne: null },
        status: { $nin: ["Closed", "Rejected", "Approved"] },
      })
        .select("fullName mobile loanType nextFollowUp assignedTo status")
        .sort({ nextFollowUp: 1 })
        .limit(20)
        .lean(),
      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("fullName mobile loanType status priority createdAt assignedTo")
        .lean(),
    ]);

    // Convert status aggregation to a map
    const statusMap: Record<string, number> = {};
    statusCounts.forEach((s: { _id: string; count: number }) => {
      statusMap[s._id] = s.count;
    });

    const priorityMap: Record<string, number> = {};
    priorityCounts.forEach((p: { _id: string; count: number }) => {
      priorityMap[p._id] = p.count;
    });

    return NextResponse.json({
      total,
      today,
      thisWeek,
      thisMonth,
      byStatus: {
        new: statusMap["New"] || 0,
        contacted: statusMap["Contacted"] || 0,
        interested: statusMap["Interested"] || 0,
        followUp: statusMap["Follow Up"] || 0,
        approved: statusMap["Approved"] || 0,
        rejected: statusMap["Rejected"] || 0,
        closed: statusMap["Closed"] || 0,
      },
      byPriority: {
        high: priorityMap["High"] || 0,
        medium: priorityMap["Medium"] || 0,
        low: priorityMap["Low"] || 0,
      },
      followUps: {
        today: todayFollowUps,
        tomorrow: tomorrowFollowUps,
        overdue: overdueFollowUps,
      },
      recentLeads,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API] GET /api/leads/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
