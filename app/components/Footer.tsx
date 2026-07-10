import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] pt-20 pb-10 border-t border-[#1E293B] mt-20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
        {/* Company Bio */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5 font-heading text-2xl font-extrabold text-white mb-5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-extrabold">K</div>
            <span className="text-white">Khushi Finance</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">
            Your dedicated financial loan partner. Helping Indian families build security and grow businesses with flexible lending opportunities.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-[#1E293B] text-[#94A3B8] rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 bg-[#1E293B] text-[#94A3B8] rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 bg-[#1E293B] text-[#94A3B8] rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="md:col-span-2">
          <h4 className="text-white text-base mb-5 font-semibold font-heading">Loan Products</h4>
          <ul className="list-none p-0 flex flex-col gap-3">
            <li><Link href="/loans/home-loan" className="text-sm transition-all duration-200 hover:text-white">Home Loan</Link></li>
            <li><Link href="/loans/personal-loan" className="text-sm transition-all duration-200 hover:text-white">Personal Loan</Link></li>
            <li><Link href="/loans/business-loan" className="text-sm transition-all duration-200 hover:text-white">Business Loan</Link></li>
            <li><Link href="/loans/lap" className="text-sm transition-all duration-200 hover:text-white">Loan Against Property</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="md:col-span-2">
          <h4 className="text-white text-base mb-5 font-semibold font-heading">Quick Links</h4>
          <ul className="list-none p-0 flex flex-col gap-3">
            <li><Link href="/about" className="text-sm transition-all duration-200 hover:text-white">About Us</Link></li>
            <li><Link href="/emi-calculator" className="text-sm transition-all duration-200 hover:text-white">EMI Calculator</Link></li>
            <li><Link href="/faq" className="text-sm transition-all duration-200 hover:text-white">FAQs</Link></li>
            <li><Link href="/contact" className="text-sm transition-all duration-200 hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="md:col-span-3">
          <h4 className="text-white text-base mb-5 font-semibold font-heading">Registered Office</h4>
          <div className="flex items-start gap-2.5 mb-3.5 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin shrink-0 mt-1 text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Heena Heritage Kalewadi Pimpri Pune 411017</span>
          </div>
          <div className="flex items-start gap-2.5 mb-3.5 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone shrink-0 mt-1 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+91 89999 79539</span>
          </div>
          <div className="flex items-start gap-2.5 mb-3.5 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail shrink-0 mt-1 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>khushifinance18@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 border-t border-[#1E293B] pt-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex-1">
          <p className="text-[12px] text-[#64748B] leading-relaxed mb-5">
            Disclaimer: Khushi Finance is an independent loan consultancy facilitator. Lending parameters, credit check standards, and interest rates are defined solely at the discretion of the partnering banking corporations and NBFCs. We do not guarantee approval rates.
          </p>
          <p className="text-sm">&copy; 2026 Khushi Finance. All rights reserved.</p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-6 list-none p-0">
            <li><Link href="/privacy-policy" className="text-sm transition-all duration-200 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-sm transition-all duration-200 hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer" className="text-sm transition-all duration-200 hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
