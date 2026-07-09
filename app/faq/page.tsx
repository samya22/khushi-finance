import React from "react";
import Link from "next/link";
import Accordion from "../components/Accordion";

export default function FaqPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">FAQs</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Frequently Asked Questions</h1>
          <p className="text-base text-text-medium max-w-2xl">Find comprehensive answers regarding loan options, eligible age groups, document checklists, and consulting fee rules.</p>
        </div>
      </section>

      {/* Main Accordion Body */}
      <section className="py-16 md:py-20">
        <div className="max-w-[840px] mx-auto px-6">
          
          {/* General */}
          <h2 className="text-xl font-bold font-heading text-text-dark border-b-2 border-primary-light pb-2 mb-6">General Consultancy FAQs</h2>
          <div className="flex flex-col gap-4 mb-12">
            <Accordion title="Do you charge a consulting fee upfront?">
              No, Khushi Finance does not charge any upfront fees from customers for standard eligibility checks and bank comparisons.
            </Accordion>
            <Accordion title="How is Khushi Finance different from directly applying to a bank?">
              Applying directly restricts you to a single bank's credit parameters and interest rates. Khushi Finance acts as an independent consultant. We map your file details against criteria of 15+ banks, negotiating cheaper interest rate packages for you.
            </Accordion>
          </div>

          {/* Home/Property */}
          <h2 className="text-xl font-bold font-heading text-text-dark border-b-2 border-primary-light pb-2 mb-6">Home & Property Funding FAQs</h2>
          <div className="flex flex-col gap-4 mb-12">
            <Accordion title="What documents are required for a Home Loan?">
              Standard documents include Identity Proof (PAN, Aadhaar), Address Proof, last 3 months' salary slips, 6 months' bank statements, and relevant property sale deeds or title papers.
            </Accordion>
            <Accordion title="What is the tenure range available for Loan Against Property (LAP)?">
              A Loan Against Property generally features a longer tenure than unsecured business loans—spanning up to 15 years depending on the property condition and borrower age.
            </Accordion>
          </div>

          {/* Business/MSME */}
          <h2 className="text-xl font-bold font-heading text-text-dark border-b-2 border-primary-light pb-2 mb-6">Business & MSME Finance FAQs</h2>
          <div className="flex flex-col gap-4">
            <Accordion title="Can a newly registered business apply for a collateral-free MSME Loan?">
              Yes, startup units can apply for Mudra loans under ₹10 Lakhs. For higher collateral-free limits under CGTMSE (up to ₹2 Crores), lenders usually require at least 1-2 years of operational audit histories and GST filing proof.
            </Accordion>
            <Accordion title="How does a Cash Credit (CC) limit differ from a Business Loan?">
              A business loan is a lump-sum disbursement with a fixed monthly EMI repayment. A Cash Credit (CC) is a revolving credit limit setup. You only pay interest on the amount utilized, and you can deposit funds anytime to reduce outstanding balances.
            </Accordion>
          </div>

        </div>
      </section>
    </>
  );
}
