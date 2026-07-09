import React from "react";
import Link from "next/link";

export default function LoansIndex() {
  const loansList = [
    {
      slug: "home-loan",
      title: "Home Loan",
      desc: "Purchase a house, apartment, or construct on a plot. Balance transfers are available.",
      rate: "Starts 7.15% p.a.",
      tenure: "Up to 30 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><path d="m12 2-9 5h18Z" /></svg>
      )
    },
    {
      slug: "personal-loan",
      title: "Personal Loan",
      desc: "Unsecured credit options for immediate hospital, travel, or bridal expenses.",
      rate: "Starts 9.99% p.a. (Subjective Cibil)",
      tenure: "Up to 5 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      )
    },
    {
      slug: "business-loan",
      title: "Business Loan",
      desc: "Expand company warehouses, purchase stock reserves, or upgrade operational plants.",
      rate: "Starts 15% p.a.",
      tenure: "Up to 5 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
      )
    },
    {
      slug: "education-loan",
      title: "Education Loan",
      desc: "Finance local university fees or overseas educational admissions with ease.",
      rate: "10.5 Starting ROI",
      tenure: "Up to 15 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
      )
    },
    {
      slug: "car-loan",
      title: "Car Loan",
      desc: "Purchase a brand-new vehicle or a reliable pre-owned car with high loan ratios.",
      rate: "Used Car Loan : 15% , new car : 8% starting ",
      tenure: "Up to 7 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M9 17h6" /></svg>
      )
    },
    {
      slug: "lap",
      title: "Loan Against Property",
      desc: "Unlock value from your home or commercial structure for large funding needs.",
      rate: "8-9% starting with different different property rates",
      tenure: "Up to 15 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
      )
    },
    {
      slug: "msme-loan",
      title: "MSME Loan",
      desc: "Government scheme support (Mudra/CGTMSE schemes) for small enterprises.",
      rate: "12-13% Starting ROI",
      tenure: "Up to 7 Years",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-factory"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg>
      )
    },
    {
      slug: "working-capital",
      title: "Working Capital Loan",
      desc: "Cash Credit (CC) and Overdraft (OD) bank limits to smooth your daily operation cycles.",
      rate: "Linked to MCLR / EBLR",
      tenure: "Annual Renewable Limit",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h18" /><path d="M16 14h.01" /></svg>
      )
    }
  ];

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

      {/* Grid of 8 Loans */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loansList.map((loan) => (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between" key={loan.slug}>
                <div>
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-6">{loan.icon}</div>
                  <h3 className="text-lg font-bold mb-3 font-heading text-text-dark">{loan.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">{loan.desc}</p>
                  <ul className="list-none p-0 border-t border-gray-200 pt-4 mt-5 flex flex-col gap-2.5">
                    <li className="text-xs md:text-sm font-semibold text-text-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {loan.rate}
                    </li>
                    <li className="text-xs md:text-sm font-semibold text-text-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                      {loan.tenure}
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
