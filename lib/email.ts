import nodemailer from "nodemailer";

interface LeadEmailData {
  fullName: string;
  mobile: string;
  email?: string;
  loanType: string;
  loanAmount?: string;
  message?: string;
  sourcePage?: string;
}

/**
 * Create a reusable transporter.
 * Falls back gracefully if SMTP is not configured.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[Email] SMTP not configured. Skipping email.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Send new lead notification to admin.
 */
export async function sendAdminNotification(lead: LeadEmailData): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #2563EB; color: white; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">🔔 New Lead Received — Khushi Finance</h2>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; width: 140px;">Name</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.fullName}</td>
          </tr>
          <tr style="background: white;">
            <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Mobile</td>
            <td style="padding: 8px 12px; color: #111827;">+91 ${lead.mobile}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Email</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.email || "—"}</td>
          </tr>
          <tr style="background: white;">
            <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Loan Type</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.loanType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Loan Amount</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.loanAmount || "—"}</td>
          </tr>
          <tr style="background: white;">
            <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Source Page</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.sourcePage || "Website"}</td>
          </tr>
          ${lead.message ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
            <td style="padding: 8px 12px; color: #111827;">${lead.message}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin" 
             style="display: inline-block; background: #2563EB; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View in Dashboard →
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Khushi Finance" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New Lead: ${lead.fullName} — ${lead.loanType}`,
      html,
    });
    console.log("[Email] Admin notification sent successfully");
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
  }
}

/**
 * Send confirmation email to customer.
 */
export async function sendCustomerConfirmation(lead: LeadEmailData): Promise<void> {
  if (!lead.email) return;

  const transporter = createTransporter();
  if (!transporter) return;

  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #2563EB; color: white; padding: 20px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">Khushi Finance</h2>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Your Trusted Loan Consultancy Partner</p>
      </div>
      <div style="background: white; padding: 28px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <h3 style="color: #111827; margin: 0 0 12px; font-size: 18px;">Thank You, ${lead.fullName}! 🎉</h3>
        <p style="color: #374151; line-height: 1.6; margin: 0 0 16px;">
          We have received your enquiry for <strong>${lead.loanType}</strong>. One of our certified loan advisors will review your profile and connect with you on <strong>+91 ${lead.mobile}</strong> within the next few hours.
        </p>
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="color: #1E40AF; margin: 0; font-size: 14px; font-weight: 600;">What happens next?</p>
          <ul style="color: #374151; margin: 8px 0 0; padding-left: 18px; font-size: 14px; line-height: 1.8;">
            <li>Our advisor reviews your loan eligibility</li>
            <li>We compare rates from 15+ partner banks</li>
            <li>You receive the best offer with transparent terms</li>
          </ul>
        </div>
        <p style="color: #6B7280; font-size: 13px; margin: 20px 0 0; line-height: 1.5;">
          If you have any urgent queries, feel free to call us at <strong>+91 89999 79539</strong> (Mon–Sat, 9:30 AM – 6:30 PM).
        </p>
      </div>
      <div style="text-align: center; margin-top: 16px;">
        <p style="color: #9CA3AF; font-size: 12px;">© 2026 Khushi Finance. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Khushi Finance" <${process.env.SMTP_USER}>`,
      to: lead.email,
      subject: `Thank you for your enquiry, ${lead.fullName}! — Khushi Finance`,
      html,
    });
    console.log("[Email] Customer confirmation sent to", lead.email);
  } catch (error) {
    console.error("[Email] Failed to send customer confirmation:", error);
  }
}
