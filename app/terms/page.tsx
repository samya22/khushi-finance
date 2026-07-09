import React from "react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">Terms & Conditions</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Terms & Conditions</h1>
          <p className="text-base text-text-medium max-w-2xl">Last updated: July 1, 2026. Review rules for using the Khushi Finance consultancy platform and services.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-6 mb-4 border-b border-gray-100 pb-2 first:mt-0">1. Consultancy Role</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">Khushi Finance acts as an independent loan consultancy facilitator. We analyze your credit files and provide matches against participating banks and NBFC schedules. We are not a direct lender, bank, or NBFC, and we do not issue loans ourselves.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">2. Loan Approval Disclaimer</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">All loan approvals, processing times, interest rates, and loan disbursal limits are subject solely to the credit assessment parameters and approval guidelines of the lending banks. Khushi Finance does not guarantee loan approval or specific interest rates.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">3. Accuracy of Customer Data</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">Customers are responsible for providing authentic, accurate, and valid identity and financial information. Any discrepancies or misleading declarations in your submissions may lead to application rejection by the partnering bank.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">4. Commission Disclosures</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">We receive nominal commissions or sourcing fees from partner financial institutions upon successful loan disbursals. Sourcing fee parameters do not impact our commitment to helping you find the lowest rates for your profile.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">5. Limitation of Liability</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5 font-semibold">Khushi Finance is not liable for any financial losses, property disputes, or delay-related damages arising from loan rejections or processing lag times at the lending bank's end.</p>
          </div>
        </div>
      </section>
    </>
  );
}
