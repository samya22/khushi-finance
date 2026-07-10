import React from "react";
import Link from "next/link";
import EmiCalculator from "../components/EmiCalculator";
import CallbackForm from "../components/CallbackForm";

export default function EmiCalculatorPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">EMI Calculator</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Interactive EMI Calculator</h1>
          <p className="text-base text-text-medium max-w-2xl">Calculate your monthly EMI, view a detailed month-by-month repayment schedule, and download professional reports in Excel or PDF format.</p>
        </div>
      </section>

      {/* Main interactive section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <EmiCalculator />
        </div>
      </section>

      {/* Callback request block */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100" id="callback">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-dark mb-2">Ready to Consult a Loan Expert?</h2>
            <p className="text-sm text-text-muted">Submit your details and we will verify your eligibility against 15+ banks' credit metrics.</p>
          </div>
          <CallbackForm defaultLoanType="Home Loan" sourcePage="EMI Calculator" />
        </div>
      </section>

      {/* Formula guide section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-2xl font-bold font-heading text-text-dark mb-4">How is Loan EMI Computed?</h2>
          <p className="text-sm md:text-base text-text-medium leading-relaxed mb-6">EMI (Equated Monthly Installment) represents the fixed monthly payment you make to a bank/lender to clear off a loan over a defined tenure. The calculation relies on the formula:</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center text-lg md:text-xl font-bold text-primary mb-6 font-heading">
            EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
          </div>
          <p className="text-sm md:text-base text-text-medium leading-relaxed mb-4 font-semibold">Where:</p>
          <ul className="list-none p-0 flex flex-col gap-3 text-sm md:text-base text-text-medium pl-4 mb-6 border-l-2 border-primary/30">
            <li><strong>P (Principal):</strong> The starting amount borrowed from the bank.</li>
            <li><strong>R (Rate of Interest):</strong> Monthly interest rate (Annual Rate / 12 / 100).</li>
            <li><strong>N (Tenure):</strong> Loan repayment period measured in months.</li>
          </ul>
          <p className="text-sm md:text-base text-text-medium leading-relaxed">A higher tenure reduces the monthly EMI payment but results in a higher cumulative interest payout over the loan lifetime.</p>
        </div>
      </section>
    </>
  );
}
