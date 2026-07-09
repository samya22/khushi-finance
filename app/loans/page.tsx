import React from "react";
import Link from "next/link";
import { getAllLoans } from "@/lib/loanData";

export default function LoansIndex() {
  const loansList = getAllLoans();

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">Loan Products</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Our Comprehensive Loan Products</h1>
          <p className="text-base text-text-medium max-w-2xl">Compare interest rates, tenure options, processing parameters, and borrow transparently with Khushi Finance.</p>
        </div>
      </section>

      {/* Grid of Loans */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loansList.map((loan) => (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between" key={loan.slug}>
                <div>
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><path d="m12 2-9 5h18Z" /></svg>
                  </div>
                  <h3 className="text-lg font-bold mb-3 font-heading text-text-dark">{loan.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">{loan.description}</p>
                  <ul className="list-none p-0 border-t border-gray-200 pt-4 mt-5 flex flex-col gap-2.5">
                    <li className="text-xs md:text-sm font-semibold text-text-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {loan.rateSummary}
                    </li>
                    <li className="text-xs md:text-sm font-semibold text-text-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {loan.tenureSummary}
                    </li>
                  </ul>
                </div>
                <Link
                  href={`/loans/${loan.slug}`}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2.5 rounded-lg transition-all duration-200 text-sm cursor-pointer"
                >
                  View {loan.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-14 lg:p-16 flex flex-col items-center text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight font-heading mb-4">Not Sure Which Loan Type Is Right For You?</h2>
              <p className="text-white/90 text-base md:text-lg mb-8">Leave details with us. Our credit advisory specialists will calculate your loan borrowing capability across top bank parameters.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Consult a Loan Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
