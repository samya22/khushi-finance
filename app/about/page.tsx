import React from "react";
import Link from "next/link";
import LendingPartners from "../components/LendingPartners";

export default function About() {


  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">About Us</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">About Khushi Finance</h1>
          <p className="text-base text-text-medium max-w-2xl">A leading loan consultancy partner in India dedicated to simplifying debt financing and securing the lowest interest rates for families and businesses.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full mb-5 w-fit">Our Story</div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-text-dark mb-5 leading-tight">Aapki Khushi, Hamari Zimmedari</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-4">Established in 2005, Khushi Finance has established itself as one of the most reliable loan advisory portals in India. Over the years, we have observed that borrowing from banks involves complex eligibility check cycles, obscure interest tables, and tedious paper handling.</p>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-4">Our experienced loan consultants evaluate your credit file, structure financials, select matching loan packages, and interact directly with banks&apos; credit officers to accelerate processing. We help you skip the queuing and secure approvals with zero upfront charges.</p>
          </div>

          <div className="bg-primary-light border border-primary/10 rounded-2xl p-8 md:p-10">
            <h3 className="text-lg md:text-xl font-bold font-heading text-primary mb-6">Our Strategic Pillars</h3>
            
            <div className="mb-5">
              <h4 className="text-base font-bold text-text-dark mb-1 font-heading">Client-First Methodology</h4>
              <p className="text-sm text-text-medium leading-relaxed">We analyze your credit profile and recommend only those banking packages that result in the lowest cost of debt.</p>
            </div>

            <div className="mb-5">
              <h4 className="text-base font-bold text-text-dark mb-1 font-heading">100% Disclosure</h4>
              <p className="text-sm text-text-medium leading-relaxed">No hidden margins, no surprise consultancy fees. Every single processing charge is disclosed during negotiations.</p>
            </div>

            <div>
              <h4 className="text-base font-bold text-text-dark mb-1 font-heading">Reliable Execution</h4>
              <p className="text-sm text-text-medium leading-relaxed">End-to-end processing support. We pick up documents, coordinate property valuation reviews, and track disbursals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="text-lg font-bold font-heading mb-3 text-text-dark">Our Mission</h3>
            <p className="text-sm text-text-muted leading-relaxed">To make banking simple and accessible to every borrower. We aim to empower home buyers, students, and businesses across India by matching them with the cheapest interest rates and honest lenders.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <h3 className="text-lg font-bold font-heading mb-3 text-text-dark">Our Vision</h3>
            <p className="text-sm text-text-muted leading-relaxed">To become India&apos;s most trusted credit advisory and loan consultancy firm, known for transparent execution, massive multi-bank lending catalog access, and high customer success ratios.</p>
          </div>
        </div>
      </section>

      {/* Lending Partners */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Our Banking & Lending Partners</h2>
            <p className="text-base text-text-muted">We work in collaboration with top banks and financial institutions in India to bring you custom rate packages.</p>
          </div>

          <LendingPartners />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-14 lg:p-16 flex flex-col items-center text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight font-heading mb-4">Partner With Us For Your Financial Success</h2>
              <p className="text-white/90 text-base md:text-lg mb-8">Get in touch with our certified financial consultants today. We will assess your profile and map it against matching banking options.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Get Free Consultation Now</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
