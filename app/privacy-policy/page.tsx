import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-primary-light py-14 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center gap-2 list-none text-xs md:text-sm font-semibold text-text-muted mb-4 p-0">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <span className="text-gray-300">/</span>
            <li className="text-text-medium">Privacy Policy</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-text-dark font-heading">Privacy Policy</h1>
          <p className="text-base text-text-medium max-w-2xl">Last updated: July 1, 2026. This document explains how Khushi Finance collects, utilizes, and protects your information.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-6 mb-4 border-b border-gray-100 pb-2 first:mt-0">1. Information We Collect</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">We collect personal and financial information when you request a callback or apply for loan consultancy. This includes your Name, Mobile Number, City of residence, Employment Details, Monthly Income levels, and details of the required loan product.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">2. How We Use Your Data</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">We use the collected data strictly to analyze your loan eligibility against various banking guidelines. We share this information with our partnering banks and NBFCs solely to evaluate, negotiate, and process your loan application upon your explicit consent.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">3. Data Protection and Security</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">Khushi Finance implements robust technical and administrative security measures to protect your sensitive financial dossiers from unauthorized access, loss, or disclosure. We do not sell or lease your personal information to third-party marketing networks.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">4. Cookies and Web Analytics</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">Our website utilizes standard session cookies to analyze web traffic trends, coordinate mobile drawer functionalities, and store basic numerical selections made inside our interactive EMI calculators.</p>

            <h2 className="text-lg md:text-xl font-bold font-heading text-text-dark mt-8 mb-4 border-b border-gray-100 pb-2">5. Contact Us</h2>
            <p className="text-sm md:text-base text-text-medium leading-relaxed mb-5">If you have any questions regarding this Privacy Policy or wish to request data removal, please contact our compliance desk at <strong className="text-primary font-semibold">privacy@khushifinance.com</strong>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
