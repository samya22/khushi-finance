"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getLoanTypeNames } from "@/lib/loanData";

// ─── Types ───────────────────────────────────────────────────────────────────

interface MonthlyAmortizationRow {
  emiNumber: number;
  emiAmount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

type TenureUnit = "years" | "months";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a Date to YYYY-MM-DD for the date input */
function toDateInputValue(d: Date): string {
  return d.toISOString().split("T")[0];
}

/** Format a Date to a human-friendly string like "10 July 2026" */
function formatDateDisplay(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** Calculate the end date by adding months to a start date */
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function EmiCalculator() {
  // ── Input States ──
  const [amount, setAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(9.2);
  const [tenureValue, setTenureValue] = useState(20);
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("years");

  // ── Customer Details ──
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [loanType, setLoanType] = useState("");
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // ── Date States ──
  const [startDate, setStartDate] = useState(toDateInputValue(new Date()));

  // ── Computed States ──
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlyAmortizationRow[]>([]);

  // ── UI States ──
  const [showSchedule, setShowSchedule] = useState(false);
  const [visibleRows, setVisibleRows] = useState(12);

  // Indian Currency Formatters
  const inrFormatter = useMemo(() => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }), []);

  const inrFormatterDetailed = useMemo(() => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }), []);

  // PDF-safe formatters — Helvetica doesn't support the ₹ glyph, so we use "Rs." prefix
  const pdfNumFmt = useMemo(() => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }), []);
  const pdfNumFmtDetailed = useMemo(() => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }), []);
  const pdfCurrency = useCallback((val: number) => `Rs. ${pdfNumFmt.format(val)}`, [pdfNumFmt]);
  const pdfCurrencyDetailed = useCallback((val: number) => `Rs. ${pdfNumFmtDetailed.format(val)}`, [pdfNumFmtDetailed]);

  // ── Loan Type Options ──
  const loanTypeOptions = useMemo(() => getLoanTypeNames(), []);

  // ── Tenure Conversion ──
  const totalMonths = tenureUnit === "years" ? tenureValue * 12 : tenureValue;
  const tenureSliderMax = tenureUnit === "years" ? 30 : 360;
  const tenureSliderMin = 1;

  // ── Calculated End Date ──
  const endDate = useMemo(() => {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return new Date();
    return addMonths(start, totalMonths);
  }, [startDate, totalMonths]);

  // ── EMI Calculation ──
  useEffect(() => {
    const P = amount;
    const r = (interestRate / 12) / 100;
    const n = totalMonths;

    let computedEmi = 0;
    let computedPayable = 0;
    let computedInterest = 0;

    if (P > 0 && n > 0) {
      if (r === 0) {
        computedEmi = P / n;
        computedPayable = P;
        computedInterest = 0;
      } else {
        computedEmi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        computedPayable = computedEmi * n;
        computedInterest = computedPayable - P;
      }
    }

    setEmi(computedEmi);
    setTotalPayable(computedPayable);
    setTotalInterest(computedInterest);

    // ── Build Monthly Amortization Schedule ──
    if (P > 0 && computedEmi > 0) {
      const schedule: MonthlyAmortizationRow[] = [];
      let currentBalance = P;
      const monthlyRate = r;

      for (let month = 1; month <= n; month++) {
        const monthlyInterest = currentBalance * monthlyRate;
        let monthlyPrincipal = computedEmi - monthlyInterest;

        if (currentBalance < monthlyPrincipal) {
          monthlyPrincipal = currentBalance;
        }

        currentBalance -= monthlyPrincipal;
        if (currentBalance < 0) currentBalance = 0;

        schedule.push({
          emiNumber: month,
          emiAmount: computedEmi,
          principal: monthlyPrincipal,
          interest: monthlyInterest,
          remainingBalance: currentBalance,
        });

        if (currentBalance <= 0) break;
      }
      setMonthlySchedule(schedule);
    } else {
      setMonthlySchedule([]);
    }

    // Reset visible rows when inputs change
    setVisibleRows(12);
  }, [amount, interestRate, totalMonths]);

  const principalPct = totalPayable > 0 ? (amount / totalPayable) * 100 : 50;
  const interestPct = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 50;

  // ── Tenure unit toggle handler ──
  const handleTenureUnitChange = useCallback((newUnit: TenureUnit) => {
    if (newUnit === tenureUnit) return;
    if (newUnit === "months") {
      setTenureValue(Math.min(tenureValue * 12, 360));
    } else {
      setTenureValue(Math.max(1, Math.round(tenureValue / 12)));
    }
    setTenureUnit(newUnit);
  }, [tenureUnit, tenureValue]);

  // ── Shared data for exports ──
  const getExportData = useCallback(() => {
    const tenureDisplay = tenureUnit === "years"
      ? `${tenureValue} Years (${totalMonths} Months)`
      : `${tenureValue} Months`;
    const startDateObj = new Date(startDate);
    const startDateFormatted = formatDateDisplay(startDateObj);
    const endDateFormatted = formatDateDisplay(endDate);
    const generatedOn = new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" });

    return { tenureDisplay, startDateFormatted, endDateFormatted, generatedOn };
  }, [tenureUnit, tenureValue, totalMonths, startDate, endDate]);

  // ── Download Excel ──
  const handleDownloadExcel = useCallback(async () => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    const { tenureDisplay, startDateFormatted, endDateFormatted, generatedOn } = getExportData();

    // ── Sheet 1: Summary ──
    const summaryData: (string | number)[][] = [
      ["Khushi Finance — EMI Summary Report"],
      [],
      ["Generated On", generatedOn],
      [],
    ];

    if (customerName || customerPhone || customerEmail || loanType) {
      summaryData.push(["── Customer Details ──"]);
      if (customerName) summaryData.push(["Customer Name", customerName]);
      if (customerPhone) summaryData.push(["Phone Number", customerPhone]);
      if (customerEmail) summaryData.push(["Email Address", customerEmail]);
      if (loanType) summaryData.push(["Loan Type", loanType]);
      summaryData.push([]);
    }

    summaryData.push(
      ["── Loan Details ──"],
      ["Loan Amount", amount],
      ["Interest Rate (% p.a.)", interestRate],
      ["Tenure", tenureDisplay],
      ["Total Months", totalMonths],
      ["EMI Start Date", startDateFormatted],
      ["EMI End Date", endDateFormatted],
      [],
      ["── EMI Summary ──"],
      ["Monthly EMI", Math.round(emi)],
      ["Total Interest Payable", Math.round(totalInterest)],
      ["Total Amount Payable", Math.round(totalPayable)],
    );

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    summarySheet["!cols"] = [{ wch: 28 }, { wch: 24 }];
    XLSX.utils.book_append_sheet(wb, summarySheet, "Loan Summary");

    // ── Sheet 2: Amortization ──
    const scheduleHeaders = ["EMI #", "EMI Amount (₹)", "Principal (₹)", "Interest (₹)", "Remaining Balance (₹)"];
    const scheduleData = monthlySchedule.map(row => [
      row.emiNumber,
      Math.round(row.emiAmount),
      Math.round(row.principal),
      Math.round(row.interest),
      Math.round(row.remainingBalance),
    ]);
    const scheduleSheet = XLSX.utils.aoa_to_sheet([scheduleHeaders, ...scheduleData]);
    scheduleSheet["!cols"] = [{ wch: 8 }, { wch: 18 }, { wch: 16 }, { wch: 16 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, scheduleSheet, "Repayment Schedule");

    const fileName = customerName
      ? `EMI_Schedule_${customerName.replace(/\s+/g, "_")}.xlsx`
      : "EMI_Repayment_Schedule.xlsx";
    XLSX.writeFile(wb, fileName);
  }, [amount, interestRate, totalMonths, emi, totalInterest, totalPayable, monthlySchedule, customerName, customerPhone, customerEmail, loanType, getExportData]);

  // ── Download PDF ──
  const handleDownloadPDF = useCallback(async () => {
    const { default: jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let y = 16;

    const { tenureDisplay, startDateFormatted, endDateFormatted, generatedOn } = getExportData();

    // ── Header: Logo ──
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(margin, y - 5, 10, 10, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("K", margin + 3.2, y + 2);

    doc.setTextColor(37, 99, 235);
    doc.setFontSize(18);
    doc.text("Khushi Finance", margin + 14, y + 2);

    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.setFont("helvetica", "normal");
    doc.text("Trusted Loan Consultancy Partner", margin + 14, y + 7);

    y += 14;
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // ── Title ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(17, 24, 39);
    doc.text("EMI Repayment Schedule", margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`Generated on: ${generatedOn}`, margin, y);
    y += 8;

    // ── Customer Details (if any provided) ──
    if (customerName || customerPhone || customerEmail || loanType) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(17, 24, 39);
      doc.text("Customer Details", margin, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      if (customerName) { doc.text(`Name: ${customerName}`, margin, y); y += 4.5; }
      if (customerPhone) { doc.text(`Phone: ${customerPhone}`, margin, y); y += 4.5; }
      if (customerEmail) { doc.text(`Email: ${customerEmail}`, margin, y); y += 4.5; }
      if (loanType) { doc.text(`Loan Type: ${loanType}`, margin, y); y += 4.5; }
      y += 4;
    }

    // ── Loan Summary Table ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text("Loan Summary", margin, y);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [["Parameter", "Value"]],
      body: [
        ["Loan Amount", pdfCurrency(amount)],
        ["Interest Rate", `${interestRate}% p.a.`],
        ["Loan Tenure", tenureDisplay],
        ["EMI Start Date", startDateFormatted],
        ["EMI End Date", endDateFormatted],
        ["Monthly EMI", pdfCurrency(emi)],
        ["Total Interest Payable", pdfCurrency(totalInterest)],
        ["Total Amount Payable", pdfCurrency(totalPayable)],
      ],
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: margin, right: margin },
      tableWidth: "auto",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 8;

    // ── Amortization Schedule ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text("Repayment Schedule", margin, y);
    y += 2;

    const scheduleBody = monthlySchedule.map(row => [
      row.emiNumber.toString(),
      pdfCurrencyDetailed(row.emiAmount),
      pdfCurrencyDetailed(row.principal),
      pdfCurrencyDetailed(row.interest),
      pdfCurrencyDetailed(row.remainingBalance),
    ]);

    autoTable(doc, {
      startY: y,
      head: [["EMI #", "EMI Amount", "Principal", "Interest", "Remaining Balance"]],
      body: scheduleBody,
      theme: "striped",
      styles: { fontSize: 7.5, cellPadding: 2.5 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold", fontSize: 8 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { halign: "center", cellWidth: 14 },
        1: { halign: "right" },
        2: { halign: "right" },
        3: { halign: "right" },
        4: { halign: "right" },
      },
    });

    // ── Disclaimer Footer (on every page) ──
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(156, 163, 175);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 14, { align: "right" });

      if (i === pageCount) {
        doc.setFontSize(6.5);
        doc.setTextColor(156, 163, 175);
        const disclaimer = "Disclaimer: This is a computer-generated document for illustrative purposes only. Actual EMI may vary based on the lender's terms, processing fees, and other charges. Khushi Finance does not guarantee loan approval or specific interest rates. Please consult your lending institution for final figures.";
        const lines = doc.splitTextToSize(disclaimer, pageWidth - margin * 2);
        doc.text(lines, margin, pageHeight - 12);
      }
    }

    const fileName = customerName
      ? `EMI_Schedule_${customerName.replace(/\s+/g, "_")}.pdf`
      : "EMI_Repayment_Schedule.pdf";
    doc.save(fileName);
  }, [amount, interestRate, emi, totalInterest, totalPayable, monthlySchedule, customerName, customerPhone, customerEmail, loanType, pdfCurrency, pdfCurrencyDetailed, getExportData]);

  // ── SVG Icons ──
  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
  );

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  );

  const TableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
  );

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  );

  return (
    <div>
      {/* ── Customer Details (Collapsible) ── */}
      <div className="mb-6">
        <button
          onClick={() => setShowCustomerDetails(!showCustomerDetails)}
          className="flex items-center gap-2 text-sm font-semibold text-text-medium hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0"
          id="toggleCustomerDetails"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Add Customer Details (Optional)
          <ChevronIcon open={showCustomerDetails} />
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: showCustomerDetails ? "300px" : "0px", opacity: showCustomerDetails ? 1 : 0 }}
        >
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div>
              <label htmlFor="customerNameInput" className="block text-xs font-semibold text-text-muted mb-1.5">Customer Name</label>
              <input
                type="text"
                id="customerNameInput"
                placeholder="Enter full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="customerPhoneInput" className="block text-xs font-semibold text-text-muted mb-1.5">Phone Number</label>
              <input
                type="tel"
                id="customerPhoneInput"
                placeholder="+91 XXXXX XXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="customerEmailInput" className="block text-xs font-semibold text-text-muted mb-1.5">Email Address</label>
              <input
                type="email"
                id="customerEmailInput"
                placeholder="email@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="loanTypeSelect" className="block text-xs font-semibold text-text-muted mb-1.5">Loan Type</label>
              <select
                id="loanTypeSelect"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="">Select Loan Type</option>
                {loanTypeOptions.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Calculator Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-8">
        {/* ── Sliders Box ── */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {/* Loan Amount */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="calcAmountInput" className="font-semibold text-[15px] text-text-dark">Required Loan Amount</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <span className="text-sm font-semibold text-text-muted mr-1">₹</span>
                <input
                  type="number"
                  id="calcAmountInput"
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={amount}
                  min="100000"
                  max="10000000"
                  step="50000"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setAmount(val);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <input
                type="range"
                id="calcAmountSlider"
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="100000"
                max="10000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="calcInterestInput" className="font-semibold text-[15px] text-text-dark">Interest Rate (p.a.)</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <input
                  type="number"
                  id="calcInterestInput"
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={interestRate}
                  min="5"
                  max="20"
                  step="0.1"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setInterestRate(val);
                  }}
                />
                <span className="text-sm font-semibold text-text-muted ml-1">%</span>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="range"
                id="calcInterestSlider"
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="5"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Tenure with Toggle */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-3">
                <label htmlFor="calcTenureInput" className="font-semibold text-[15px] text-text-dark">Loan Tenure</label>
                {/* Segmented Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200" id="tenureUnitToggle">
                  <button
                    onClick={() => handleTenureUnitChange("months")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer border-none ${
                      tenureUnit === "months"
                        ? "bg-primary text-white shadow-sm"
                        : "bg-transparent text-text-muted hover:text-text-dark"
                    }`}
                    id="tenureMonthsBtn"
                  >
                    Months
                  </button>
                  <button
                    onClick={() => handleTenureUnitChange("years")}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all duration-200 cursor-pointer border-none ${
                      tenureUnit === "years"
                        ? "bg-primary text-white shadow-sm"
                        : "bg-transparent text-text-muted hover:text-text-dark"
                    }`}
                    id="tenureYearsBtn"
                  >
                    Years
                  </button>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <input
                  type="number"
                  id="calcTenureInput"
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={tenureValue}
                  min={tenureSliderMin}
                  max={tenureSliderMax}
                  step="1"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setTenureValue(val);
                  }}
                />
                <span className="text-sm font-semibold text-text-muted ml-1">
                  {tenureUnit === "years" ? "Yrs" : "Mo"}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="range"
                id="calcTenureSlider"
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min={tenureSliderMin}
                max={tenureSliderMax}
                step="1"
                value={tenureValue}
                onChange={(e) => setTenureValue(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div>
                  <label htmlFor="startDateInput" className="font-semibold text-[15px] text-text-dark flex items-center gap-1.5">
                    <CalendarIcon />
                    EMI Start Date
                  </label>
                </div>
                <input
                  type="date"
                  id="startDateInput"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-200 bg-gray-50 rounded-lg py-1.5 px-3 font-bold text-sm text-text-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 bg-primary-light border border-primary/10 rounded-lg py-2 px-3.5">
                <span className="text-xs font-semibold text-text-muted">End Date:</span>
                <span className="text-sm font-bold text-primary">{formatDateDisplay(endDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Results Box ── */}
        <div className="lg:col-span-5 bg-primary-light rounded-2xl p-8 border border-primary/10 flex flex-col justify-between self-stretch">
          <div>
            <div className="mb-6">
              <div className="text-sm font-semibold text-text-medium mb-1">Monthly EMI Payment</div>
              <div className="text-3xl md:text-[2.25rem] font-extrabold text-primary font-heading" id="emiOutput">{inrFormatter.format(emi)}</div>
            </div>

            <div className="flex h-2 rounded-full overflow-hidden my-4 bg-gray-200">
              <div className="bg-primary h-full transition-all duration-500" style={{ width: `${principalPct}%` }} />
              <div className="bg-[#F59E0B] h-full transition-all duration-500" style={{ width: `${interestPct}%` }} />
            </div>

            <div className="flex gap-4 mb-6 text-[13px] font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-primary"></div>
                <span>Principal Amount</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B]"></div>
                <span>Total Interest</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-semibold text-text-medium">Principal Amount</div>
              <div className="text-lg md:text-[20px] font-bold text-text-dark font-heading">{inrFormatter.format(amount)}</div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-semibold text-text-medium">Interest Payable</div>
              <div className="text-lg md:text-[20px] font-bold text-[#F59E0B] font-heading">{inrFormatter.format(totalInterest)}</div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-bold text-text-dark">Total Payable Amount</div>
              <div className="text-lg md:text-[20px] font-bold text-text-dark font-heading">{inrFormatter.format(totalPayable)}</div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-semibold text-text-medium">Loan Tenure</div>
              <div className="text-lg md:text-[20px] font-bold text-text-dark font-heading">
                {tenureUnit === "years" ? `${tenureValue} Yrs (${totalMonths} Mo)` : `${tenureValue} Mo`}
              </div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <div className="text-sm font-semibold text-text-medium">EMI Period</div>
              <div className="text-xs md:text-sm font-bold text-text-dark font-heading text-right">
                {formatDateDisplay(new Date(startDate))} — {formatDateDisplay(endDate)}
              </div>
            </div>

            <a href="#callback" className="w-full inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer mt-2">Apply with these Details</a>
          </div>
        </div>
      </div>

      {/* ── Action Bar: View Schedule + Downloads ── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="inline-flex items-center gap-2 font-semibold text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm"
          id="viewScheduleBtn"
        >
          <TableIcon />
          {showSchedule ? "Hide Repayment Schedule" : "View Repayment Schedule"}
        </button>

        <button
          onClick={handleDownloadExcel}
          className="inline-flex items-center gap-2 font-semibold text-white bg-[#059669] hover:bg-[#047857] px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm border-none"
          id="downloadExcelBtn"
        >
          <DownloadIcon />
          Download Excel
        </button>

        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm border-none"
          id="downloadPdfBtn"
        >
          <DownloadIcon />
          Download PDF
        </button>
      </div>

      {/* ── Monthly Amortization Schedule ── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: showSchedule ? "9999px" : "0px",
          opacity: showSchedule ? 1 : 0,
        }}
      >
        {monthlySchedule.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="text-[22px] md:text-2xl font-bold font-heading mb-1 text-text-dark">Monthly Repayment Schedule</h2>
                <p className="text-sm text-text-muted">
                  Complete EMI-wise breakdown showing principal, interest, and remaining balance for each month.
                </p>
              </div>
              <div className="text-xs font-semibold text-text-muted bg-gray-100 rounded-lg px-3 py-1.5 whitespace-nowrap self-start">
                {Math.min(visibleRows, monthlySchedule.length)} of {monthlySchedule.length} months
              </div>
            </div>

            <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
              <table className="w-full border-collapse text-left text-sm min-w-[640px]" id="amortizationTable">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-text-dark font-bold p-3.5 px-5 text-center w-[70px]">EMI #</th>
                    <th className="text-text-dark font-bold p-3.5 px-5 text-right">EMI Amount</th>
                    <th className="text-text-dark font-bold p-3.5 px-5 text-right">Principal</th>
                    <th className="text-text-dark font-bold p-3.5 px-5 text-right">Interest</th>
                    <th className="text-text-dark font-bold p-3.5 px-5 text-right">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {monthlySchedule.slice(0, visibleRows).map((row) => (
                    <tr key={row.emiNumber} className="hover:bg-primary-light/40 transition-colors odd:bg-white even:bg-gray-50/50">
                      <td className="p-3.5 px-5 font-semibold text-text-dark text-center">{row.emiNumber}</td>
                      <td className="p-3.5 px-5 text-text-medium text-right font-medium">{inrFormatterDetailed.format(row.emiAmount)}</td>
                      <td className="p-3.5 px-5 text-accent-green font-semibold text-right">{inrFormatterDetailed.format(row.principal)}</td>
                      <td className="p-3.5 px-5 text-[#F59E0B] text-right">{inrFormatterDetailed.format(row.interest)}</td>
                      <td className="p-3.5 px-5 text-text-medium font-semibold text-right">{inrFormatterDetailed.format(row.remainingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {visibleRows < monthlySchedule.length && (
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={() => setVisibleRows(prev => Math.min(prev + 12, monthlySchedule.length))}
                  className="inline-flex items-center gap-1.5 font-semibold text-primary bg-white border border-primary/30 hover:border-primary hover:bg-primary-light px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                  id="loadMoreBtn"
                >
                  Show More
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <button
                  onClick={() => setVisibleRows(monthlySchedule.length)}
                  className="inline-flex items-center gap-1.5 font-semibold text-text-muted bg-white border border-gray-200 hover:border-gray-300 hover:text-text-dark px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                  id="showAllBtn"
                >
                  Show All ({monthlySchedule.length})
                </button>
              </div>
            )}

            {visibleRows >= monthlySchedule.length && monthlySchedule.length > 12 && (
              <div className="flex items-center justify-center mt-5">
                <button
                  onClick={() => setVisibleRows(12)}
                  className="inline-flex items-center gap-1.5 font-semibold text-text-muted bg-white border border-gray-200 hover:border-gray-300 hover:text-text-dark px-5 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                  id="collapseBtn"
                >
                  Collapse
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
