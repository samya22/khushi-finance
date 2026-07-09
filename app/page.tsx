import React from "react";
import Link from "next/link";
import Image from "next/image";
import Accordion from "./components/Accordion";

export default function Home() {
  const previewProducts = [
    {
      slug: "home-loan",
      title: "Home Loan",
      description: "Finance your dream home or buy a plot of land with low interest options.",
      href: "/loans/home-loan",
      rate: "Starts 7.15% p.a.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" /><line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" /><path d="m12 2-9 5h18Z" /></svg>
      )
    },
    {
      slug: "personal-loan",
      title: "Personal Loan",
      description: "Immediate cash funds for medical needs, marriage, or personal purchases.",
      href: "/loans/personal-loan",
      rate: "Starts 9.99% p.a. (Subjective Cibil)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      )
    },
    {
      slug: "business-loan",
      title: "Business Loan",
      description: "Expand your company's potential, buy inventory, or machinery.",
      href: "/loans/business-loan",
      rate: "Starts 15% p.a.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
      )
    },
    {
      slug: "lap",
      title: "Loan Against Property",
      description: "Leverage your property's value to access higher loan values.",
      href: "/loans/lap",
      rate: "Starts 8-9.00% p.a.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full mb-5 w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11 2 2 4-4" /></svg>
              Your Trusted Indian Loan Consultant
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight mb-5 text-text-dark font-heading leading-tight md:leading-none">
              Fulfilling Your Family's Dreams With <span className="text-primary font-extrabold">Trustworthy Loans</span>
            </h1>
            <p className="text-base md:text-lg text-text-medium mb-8 max-w-xl">
              We compare loan offers from 15+ top banks and NBFCs in India to find you the best interest rates. Complete end-to-end guidance with zero hidden fees.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/emi-calculator" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Calculate EMI</Link>
              <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Get Free Consultation</Link>
            </div>

            <div className="grid grid-cols-3 gap-5 border-t border-gray-200 pt-8 mt-10">
              <div>
                <h3 className="text-xl md:text-3xl font-extrabold text-primary font-heading mb-1">₹500+ Cr</h3>
                <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Loans Disbursed</p>
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-extrabold text-primary font-heading mb-1">10,000+</h3>
                <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Happy Families</p>
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-extrabold text-primary font-heading mb-1">15+</h3>
                <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Partner Lenders</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative bg-primary-light rounded-2xl p-4 w-full max-w-[500px] shadow-md">
              <Image
                src="/assets/hero_family.png"
                alt="Happy Indian Family planning home finance with Khushi Finance"
                className="rounded-lg w-full object-cover"
                width={500}
                height={380}
                priority
              />
              <div className="absolute bottom-6 -left-4 bg-white border border-gray-200 rounded-xl p-3.5 px-5 flex items-center gap-3 shadow-lg max-w-[220px] sm:max-w-none">
                <div className="w-9 h-9 bg-accent-green-light text-accent-green rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark">98% Trust Score</h4>
                  <p className="text-[10px] text-text-muted font-semibold">Excellent support quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Products Preview Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100" id="products-preview">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Popular Loan Products</h2>
            <p className="text-base text-text-muted">We assist you in getting loans at the most competitive interest rates with flexible tenure options.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {previewProducts.map((prod) => (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col" key={prod.slug}>
                <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-6">{prod.icon}</div>
                <h3 className="text-lg font-bold mb-3 font-heading text-text-dark">{prod.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5 flex-grow">{prod.description}</p>
                <ul className="list-none p-0 border-t border-gray-200 pt-4 mt-5 flex flex-col gap-2.5">
                  <li className="text-xs md:text-sm font-semibold text-text-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-accent-green"><polyline points="20 6 9 17 4 12" /></svg>
                    {prod.rate}
                  </li>
                </ul>
                <Link href={prod.href} className="text-sm font-bold text-primary inline-flex items-center gap-1.5 hover:text-primary-dark transition-all mt-4 w-fit">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/loans" className="inline-flex items-center justify-center gap-2 font-semibold text-primary border border-primary hover:bg-primary-light px-6 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer">Explore All 8 Loan Types</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20" id="why-choose-us">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full mb-5 w-fit">Why Choose Us</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4 leading-tight">Providing Peace of Mind in Every Loan Approval</h2>
            <p className="text-base text-text-muted mb-8">At Khushi Finance, we act as your dedicated personal financial consultants—ensuring that you make informed decisions and secure the lowest rate from top Indian banks.</p>
            <Link href="/about" className="inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 text-base cursor-pointer">Learn More About Us</Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-percent"><line x1="19" x2="5" y1="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
              </div>
              <h4 className="text-lg font-bold text-text-dark mb-2 font-heading">Lowest Interest Rates</h4>
              <p className="text-sm text-text-muted leading-relaxed">Our strong partnerships with top banks allow us to negotiate interest rates that you won't get on your own.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 11 2 2 4-4" /></svg>
              </div>
              <h4 className="text-lg font-bold text-text-dark mb-2 font-heading">Zero Hidden Fees</h4>
              <p className="text-sm text-text-muted leading-relaxed">Total transparency is our priority. We explain all banks' charges upfront (processing fees, pre-payment charges, etc.).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100" id="process">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Our Simple Loan Process</h2>
            <p className="text-base text-text-muted">Get your loan approved and disbursed in 4 simple steps without stepping out of your home.</p>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-6 justify-between lg:before:content-[''] lg:before:absolute lg:before:top-12 lg:before:left-12 lg:before:right-12 lg:before:h-[2px] lg:before:bg-gray-200 lg:before:-z-0">
            <div className="relative flex-1 text-center bg-white border border-gray-200 p-6 rounded-xl shadow-sm lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 z-10">
              <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5 border-4 border-white lg:w-16 lg:h-16 lg:text-xl lg:border-6">1</div>
              <h3 className="text-base md:text-lg font-bold text-text-dark mb-2 font-heading">Check Eligibility</h3>
              <p className="text-sm text-text-muted leading-relaxed">Share basic details online or with our advisor to check loan limits and banking guidelines.</p>
            </div>

            <div className="relative flex-1 text-center bg-white border border-gray-200 p-6 rounded-xl shadow-sm lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 z-10">
              <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5 border-4 border-white lg:w-16 lg:h-16 lg:text-xl lg:border-6">2</div>
              <h3 className="text-base md:text-lg font-bold text-text-dark mb-2 font-heading">Compare & Select</h3>
              <p className="text-sm text-text-muted leading-relaxed">Our system compares loan terms from top lenders to find the cheapest interest rates.</p>
            </div>

            <div className="relative flex-1 text-center bg-white border border-gray-200 p-6 rounded-xl shadow-sm lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 z-10">
              <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5 border-4 border-white lg:w-16 lg:h-16 lg:text-xl lg:border-6">3</div>
              <h3 className="text-base md:text-lg font-bold text-text-dark mb-2 font-heading">Document Pickup</h3>
              <p className="text-sm text-text-muted leading-relaxed">We pick up the required documents from your home or office, checking paperwork to avoid delays.</p>
            </div>

            <div className="relative flex-1 text-center bg-white border border-gray-200 p-6 rounded-xl shadow-sm lg:border-none lg:shadow-none lg:bg-transparent lg:p-0 z-10">
              <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5 border-4 border-white lg:w-16 lg:h-16 lg:text-xl lg:border-6">4</div>
              <h3 className="text-base md:text-lg font-bold text-text-dark mb-2 font-heading">Fast Disbursal</h3>
              <p className="text-sm text-text-muted leading-relaxed">Enjoy direct transfer of your loan amount into your bank account as soon as approval is confirmed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20" id="testimonials">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Loved by 10,000+ Happy Borrowers</h2>
            <p className="text-base text-text-muted">Read client reviews explaining how our experts simplified banking parameters for them.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-[#F59E0B] flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                </div>
                <p className="text-sm md:text-base text-text-medium mb-6 italic leading-relaxed">"Applying for a home loan was extremely stressful. Khushi Finance compared terms of 4 major banks and explained the fine print. Got it processed at 8.45% interest in just 10 days!"</p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                <div className="w-11 h-11 rounded-full bg-gray-100 text-primary flex items-center justify-center font-bold text-base font-heading">RK</div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark font-heading">Rajesh Kumar</h4>
                  <p className="text-xs text-text-muted font-semibold">Bengaluru (Home Loan)</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-[#F59E0B] flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                </div>
                <p className="text-sm md:text-base text-text-medium mb-6 italic leading-relaxed">"As a growing business, we needed collateral-free capital. The advisors at Khushi Finance structured our financials, presented them to lenders, and got us ₹25 Lakhs approved."</p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                <div className="w-11 h-11 rounded-full bg-gray-100 text-primary flex items-center justify-center font-bold text-base font-heading">SS</div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark font-heading">Sunita Sharma</h4>
                  <p className="text-xs text-text-muted font-semibold">New Delhi (Business Loan)</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="text-[#F59E0B] flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  ))}
                </div>
                <p className="text-sm md:text-base text-text-medium mb-6 italic leading-relaxed">"Khushi Finance provided end-to-end support for my loan against property. Zero running around bank offices. Completely transparent consulting with great client focus."</p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                <div className="w-11 h-11 rounded-full bg-gray-100 text-primary flex items-center justify-center font-bold text-base font-heading">AP</div>
                <div>
                  <h4 className="text-sm font-bold text-text-dark font-heading">Amit Patel</h4>
                  <p className="text-xs text-text-muted font-semibold">Mumbai (Property Loan)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-gray-100" id="faqs-preview">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark font-heading mb-4">Frequently Asked Questions</h2>
            <p className="text-base text-text-muted">Check out answers to standard queries about our consulting workflow.</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-10">
            <Accordion title="What type of loans does Khushi Finance offer?">
              We offer expert consultancy on Home Loans (New/Balance Transfer), Business Loans (Collateral-Free/MSME), Personal Loans, and Loans Against Property (LAP).
            </Accordion>
            <Accordion title="Do you charge a consulting fee upfront?">
              No, Khushi Finance does not charge any upfront fees from customers for standard eligibility checks and comparisons.
            </Accordion>
            <Accordion title="How is Khushi Finance different from directly applying to a bank?">
              When you apply directly to a bank, you only get their specific terms. Khushi Finance compares products from 15+ banks, providing unbiased expert advice and negotiating power to secure the lowest rates with minimum effort.
            </Accordion>
          </div>

          <div className="text-center">
            <Link href="/faq" className="inline-flex items-center justify-center gap-2 font-semibold text-primary border border-primary hover:bg-primary-light px-6 py-3 rounded-lg transition-all duration-200 text-sm cursor-pointer">View All FAQs</Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20" id="final-cta">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-14 lg:p-16 flex flex-col items-center text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight font-heading mb-4">Take the First Step to Your Financial Goal</h2>
              <p className="text-white/90 text-base md:text-lg mb-8">Get professional assistance from our certified credit counselors. Speak with us today to examine options that match your profile.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Request a Call Back</Link>
                <a href="tel:+918999979539" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-white border border-white hover:bg-primary-dark px-8 py-3.5 rounded-xl transition-all duration-200 text-base cursor-pointer">Call +91 89999 79539</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
