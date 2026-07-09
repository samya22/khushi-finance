import React from "react";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">Legal Disclaimer</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Legal Disclaimer</h1>
          <p className="text-base text-text-medium max-w-2xl">Last updated: July 1, 2026. Important credit approval disclosures for users of Khushi Finance consultancy services.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-6 mb-4 border-b border-gray-100 pb-2 first:mt-0">1. Sourcing Partner Status</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">Khushi Finance is an independent sourcing partner and credit advisory service. We are not a bank, non-banking financial company (NBFC), microfinance institution, or primary lender. We assist in structuring customer files and comparing packages from partnering Indian banking corporations.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">2. No Guarantee of Credit Approval</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5 font-semibold">All loan applications are assessed against criteria defined solely by the lending banks and NBFCs. Sourcing support, pre-approvals, or eligibility calculations provided by Khushi Finance do not guarantee ultimate loan approval or interest rate freezes. Credit sanctions depend on credit score histories, property verifications, and individual income check clearances conducted by the bank's underwriting teams.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">3. Mathematical Approximations</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">The calculators on our website, including the interactive EMI slider tools and amortization schedule generators, provide approximate estimates based on formulas. Actual EMI amounts, processing charges, interest compounding rules, and loan parameters are determined by the bank's final sanction letter.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">4. Third-Party Links and Names</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">References to logos, brand names (such as HDFC Bank, SBI, ICICI Bank, Tata Capital, Bajaj Finserv, etc.), or external hyperlinks do not imply endorsement, sponsorship, or association with the companies, unless explicitly declared. They are referenced for comparative and descriptive purposes.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">5. Zero Fee Clarification</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5 font-semibold text-primary">Khushi Finance does not charge upfront consulting fees from retail loan seekers. We advise users to stay alert against potential impersonators charging cash fees in our name.</p>
          </div>
        </div>
      </section>
    </>
  );
}
