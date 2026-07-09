import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/app/components/Accordion";
import CallbackForm from "@/app/components/CallbackForm";
import { getLoanBySlug, getAllLoanSlugs } from "@/lib/loanData";

// Generate static params for optimal static export/regeneration
export async function generateStaticParams() {
  return getAllLoanSlugs();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LoanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loan = getLoanBySlug(slug);

  if (!loan) {
    notFound();
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li><Link href="/loans" className="hover:text-primary transition-colors">Loan Products</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">{loan.title}</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">{loan.title}</h1>
          <p className="text-base text-text-medium max-w-2xl">{loan.subtitle}</p>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-dark mb-4">Financing Your Growth With Unbiased Guidance</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-6">We analyze your eligibility criteria against multiple bank guidelines to secure optimal funding. Get the maximum loan limit and flexible repayment schedules.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-50 border-l-4 border-primary rounded-lg p-4 px-5">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Interest Rate</h4>
                <p className="text-lg md:text-xl font-extrabold text-text-dark font-heading">{loan.specs.rate}</p>
              </div>
              <div className="bg-gray-50 border-l-4 border-primary rounded-lg p-4 px-5">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Tenure Range</h4>
                <p className="text-lg md:text-xl font-extrabold text-text-dark font-heading">{loan.specs.tenure}</p>
              </div>
              <div className="bg-gray-50 border-l-4 border-primary rounded-lg p-4 px-5">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Processing Fees</h4>
                <p className="text-lg md:text-xl font-extrabold text-text-dark font-heading">{loan.specs.fees}</p>
              </div>
              <div className="bg-gray-50 border-l-4 border-primary rounded-lg p-4 px-5">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Security Collateral</h4>
                <p className="text-lg md:text-xl font-extrabold text-text-dark font-heading">{loan.specs.collateral}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CallbackForm defaultLoanType={loan.title} sourcePage={`Loan - ${loan.title}`} />
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Required Documents Checklist</h2>
            <p className="text-base text-text-muted">Compile these files to ensure smooth processing through bank verification offices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loan.docsSalaried.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-text-dark mb-5 font-heading flex items-center gap-2.5">
                  <span className="w-2 h-6 bg-primary rounded-sm"></span>
                  For Salaried Borrowers
                </h3>
                <ul className="list-none p-0 flex flex-col gap-3">
                  {loan.docsSalaried.map((doc, idx) => (
                    <li key={idx} className="text-sm text-text-medium leading-relaxed flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {loan.docsSelfEmployed.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-text-dark mb-5 font-heading flex items-center gap-2.5">
                  <span className="w-2 h-6 bg-primary rounded-sm"></span>
                  For Business Owners / Self-Employed
                </h3>
                <ul className="list-none p-0 flex flex-col gap-3">
                  {loan.docsSelfEmployed.map((doc, idx) => (
                    <li key={idx} className="text-sm text-text-medium leading-relaxed flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      {loan.faqs.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Product Specific FAQs</h2>
              <p className="text-base text-text-muted">Quick answers on borrowing standards for {loan.title}.</p>
            </div>

            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {loan.faqs.map((faq, idx) => (
                <Accordion title={faq.q} key={idx}>
                  {faq.a}
                </Accordion>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
