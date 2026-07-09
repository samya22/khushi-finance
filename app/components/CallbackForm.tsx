"use client";

import React, { useState } from "react";
import { getLoanTypeNames } from "@/lib/loanData";

interface CallbackFormProps {
  defaultLoanType?: string;
  isDetailed?: boolean;
  sourcePage?: string;
}

export default function CallbackForm({ defaultLoanType = "Home Loan", isDetailed = false, sourcePage = "Website" }: CallbackFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [employment, setEmployment] = useState("Salaried");
  const [income, setIncome] = useState("₹30k - ₹75k");
  const [loanType, setLoanType] = useState(defaultLoanType);
  const [amount, setAmount] = useState("₹5L - ₹20L");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !phone || (isDetailed && !city)) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate phone number
    const cleanPhone = phone.replace(/[^\d]/g, "").slice(-10);
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          mobile: cleanPhone,
          email: email.trim(),
          loanType,
          loanAmount: amount,
          message: message.trim(),
          sourcePage,
          city: city.trim(),
          employment: isDetailed ? employment : "",
          income: isDetailed ? income : "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    }

    setIsSubmitting(false);
  }

  function handleReset() {
    setName("");
    setPhone("");
    setEmail("");
    setCity("");
    setMessage("");
    setError("");
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="text-center p-8 flex flex-col items-center justify-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="w-14 h-14 bg-accent-green-light text-accent-green rounded-full flex items-center justify-center text-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h3 className="text-text-dark text-xl font-bold font-heading">Thank You, {name}!</h3>
        <p className="text-sm text-text-muted leading-relaxed max-w-md">
          We have received your callback request. Our loan consultancy expert will connect with you on <strong>+91 {phone}</strong> within 15 minutes to review matching options for your <strong>{loanType}</strong>.
        </p>
        {email && (
          <p className="text-xs text-text-muted">A confirmation email has been sent to <strong>{email}</strong>.</p>
        )}
        <button onClick={handleReset} className="inline-flex items-center justify-center font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm mt-2">
          Request Another Call
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold text-text-dark mb-5 font-heading">Request a Callback</h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="formName" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" 
            id="formName" 
            className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="formPhone" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Mobile Number</label>
          <div className="flex gap-2">
            <span className="inline-flex items-center border border-gray-200 rounded-lg px-3.5 bg-gray-50 text-sm font-semibold text-text-muted">+91</span>
            <input 
              type="tel" 
              id="formPhone" 
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all" 
              placeholder="10-digit number" 
              pattern="[6-9][0-9]{9}" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="formEmail" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Email Address <span className="text-text-muted font-normal">(Optional)</span></label>
          <input 
            type="email" 
            id="formEmail" 
            className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all" 
            placeholder="your.email@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {isDetailed && (
          <div className="mb-4">
            <label htmlFor="formCity" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">City of Residence</label>
            <input 
              type="text" 
              id="formCity" 
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all" 
              placeholder="e.g. Bengaluru, Mumbai" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required 
            />
          </div>
        )}

        {isDetailed ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="formEmployment" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Employment Type</label>
                <select 
                  id="formEmployment" 
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value)}
                >
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Self-Employed">Self-Employed / Business</option>
                  <option value="Professional">Self-Employed Professional</option>
                </select>
              </div>

              <div>
                <label htmlFor="formIncome" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Monthly Net Income</label>
                <select 
                  id="formIncome" 
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                >
                  <option value="Under ₹30k">Under ₹30,000</option>
                  <option value="₹30k - ₹75k">₹30,000 - ₹75,000</option>
                  <option value="₹75k - ₹1.5L">₹75,000 - ₹1.5 Lakhs</option>
                  <option value="Above ₹1.5L">Above ₹1.5 Lakhs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="formLoanType" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Required Loan Type</label>
                <select 
                  id="formLoanType" 
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                >
                  {getLoanTypeNames().map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="formAmount" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Required Loan Amount</label>
                <select 
                  id="formAmount" 
                  className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                >
                  <option value="Under ₹5L">Under ₹5 Lakhs</option>
                  <option value="₹5L - ₹20L">₹5 Lakhs - ₹20 Lakhs</option>
                  <option value="₹20L - ₹75L">₹20 Lakhs - ₹75 Lakhs</option>
                  <option value="Above ₹75L">Above ₹75 Lakhs</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <label htmlFor="formLoanType" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Loan Product Required</label>
            <select 
              id="formLoanType" 
              className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark bg-white outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
            >
              {getLoanTypeNames().map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Message Field */}
        <div className="mb-4">
          <label htmlFor="formMessage" className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-1.5">Message <span className="text-text-muted font-normal">(Optional)</span></label>
          <textarea 
            id="formMessage" 
            className="w-full border border-gray-200 rounded-lg py-2.5 px-3.5 text-sm text-text-dark outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 transition-all resize-none" 
            placeholder="Any specific requirements or questions…" 
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            "Request Call Back"
          )}
        </button>
      </form>
    </div>
  );
}
