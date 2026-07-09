import React from "react";
import Link from "next/link";
import CallbackForm from "../components/CallbackForm";

export default function Contact() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">Contact Us</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Contact Our Loan Advisors</h1>
          <p className="text-base text-text-medium max-w-2xl">Have questions about loan eligibilities, processing fees, or document checks? Reach out to us, or fill out the callback request form below.</p>
        </div>
      </section>

      {/* Contact Section Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-text-dark font-heading mb-1">Corporate Registered Office</h3>
                <p className="text-sm text-text-medium leading-relaxed">Heena Heritage Kalewadi Pimpri Pune 411017</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-text-dark font-heading mb-1">Tele-Support Helpline</h3>
                <p className="text-sm text-text-medium leading-relaxed">+91 89999 79539 / +91 80 4321 9876</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-text-dark font-heading mb-1">Corporate Inquiries</h3>
                <p className="text-sm text-text-medium leading-relaxed">contact@khushifinance.com / support@khushifinance.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-text-dark font-heading mb-1">Operating Hours</h3>
                <p className="text-sm text-text-medium leading-relaxed">Monday - Saturday: 9:30 AM - 6:30 PM (Closed on Sundays and Bank Holidays)</p>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden h-[350px] shadow-sm">
              <iframe 
                src="https://maps.google.com/maps?q=Heena%20Heritage%20Kalewadi%20Pimpri%20Pune%20411017&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Khushi Finance Pune Office Location Map"
              ></iframe>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-7">
            <CallbackForm isDetailed={true} sourcePage="Contact" />
          </div>

        </div>
      </section>
    </>
  );
}
