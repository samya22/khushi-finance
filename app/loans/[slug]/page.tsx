import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/app/components/Accordion";
import CallbackForm from "@/app/components/CallbackForm";

interface LoanData {
  title: string;
  subtitle: string;
  specs: {
    rate: string;
    tenure: string;
    fees: string;
    collateral: string;
  };
  docsSalaried: string[];
  docsSelfEmployed: string[];
  faqs: { q: string; a: string }[];
}

const loanDictionary: Record<string, LoanData> = {
  "home-loan": {
    title: "Home Loan Consultancy",
    subtitle: "Get affordable housing finance options from top banks. Buying a new apartment, constructing your dream home, or transferring your balance made simple.",
    specs: {
      rate: "Starts 8.40% p.a.",
      tenure: "Up to 30 Years",
      fees: "0.25% - 0.50%",
      collateral: "Property Mortgage",
    },
    docsSalaried: [
      "PAN Card & Aadhaar Card",
      "Last 3 months' salary slips",
      "Form 16 of last 2 assessment years",
      "Last 6 months' salary bank statements",
    ],
    docsSelfEmployed: [
      "PAN, Aadhaar & Business Registration Cert",
      "Last 3 years' audited Balance Sheets & ITRs",
      "Last 6 months' current bank accounts statement",
      "Details of existing business assets and debts",
    ],
    faqs: [
      {
        q: "What is the minimum credit score required for a Home Loan?",
        a: "Generally, banks prefer a CIBIL credit score of 750 or above to access the lowest interest rates starting around 8.40% p.a."
      },
      {
        q: "Can I transfer my active home loan to another bank?",
        a: "Yes! This is called a Home Loan Balance Transfer. If another bank offers a cheaper interest rate, we can facilitate moving your loan to reduce your EMIs."
      }
    ]
  },
  "personal-loan": {
    title: "Personal Loan Consultancy",
    subtitle: "Unsecured instant personal loans without collateral. Ideal for medical emergencies, travel, marriage, or debt consolidation.",
    specs: {
      rate: "Starts 10.50% p.a.",
      tenure: "1 - 5 Years",
      fees: "1.00% - 2.50%",
      collateral: "None / Unsecured",
    },
    docsSalaried: [
      "PAN Card & Aadhaar Card",
      "Last 3 months' salary slips",
      "Last 3 months' bank statements (salary account)",
    ],
    docsSelfEmployed: [
      "PAN, Aadhaar & Business Registration Address proof",
      "Last 2 years' computed ITR & profit statements",
      "Last 6 months' bank statements of prime account",
    ],
    faqs: [
      {
        q: "How fast is a personal loan approved and disbursed?",
        a: "Since personal loans are unsecured, banks can verify and disburse funds within 24-48 hours once all verification documents are completed."
      },
      {
        q: "Do I need a co-applicant to apply for a personal loan?",
        a: "No, a co-applicant is not mandatory if your income and credit score meet the bank's independent borrowing thresholds."
      }
    ]
  },
  "business-loan": {
    title: "Business Loan Consultancy",
    subtitle: "Fuel your enterprise growth with collateral-free funding options. Expand infrastructure, purchase machinery, or manage working capital cycles.",
    specs: {
      rate: "Starts 11.25% p.a.",
      tenure: "1 - 5 Years",
      fees: "1.50% - 2.00%",
      collateral: "Unsecured / None",
    },
    docsSalaried: [
      "Identity Proof of Directors (PAN / Aadhaar)",
      "Last 3 months' personal salary slips (if guarantor)",
    ],
    docsSelfEmployed: [
      "PAN of directors & firm registration papers",
      "Last 12 months' business bank accounts statement",
      "ITR & Profit-Loss statements of last 2 years",
      "GST returns statements for the last 12 months",
    ],
    faqs: [
      {
        q: "What is the maximum limit for unsecured business loans?",
        a: "Lenders offer unsecured business limits up to ₹75 Lakhs, depending heavily on company balance sheet turn-overs and debt ratios."
      },
      {
        q: "Can a proprietary firm apply for a business loan?",
        a: "Yes, proprietary concerns, partnership firms, and private limited companies are all eligible for commercial lending parameters."
      }
    ]
  },
  "education-loan": {
    title: "Education Loan Consultancy",
    subtitle: "Finance your academic goals in top Indian or foreign colleges. Covers college tuition fees, hostel expenses, travel, and laptop purchases.",
    specs: {
      rate: "Starts 9.25% p.a.",
      tenure: "Up to 15 Years",
      fees: "Nil (typically)",
      collateral: "Moratorium allowed",
    },
    docsSalaried: [
      "Student Applicant: PAN, Aadhaar, Academic Marksheets (10th/12th/Degree)",
      "Admission Letter detailing fees breakdown chart",
      "Entrance scorecard (GRE/GMAT/IELTS/CAT)",
    ],
    docsSelfEmployed: [
      "Co-Applicant: PAN & Aadhaar Card",
      "Last 3 years' business ITR or salaried Form 16",
      "Last 6 months' primary bank statements of Co-Applicant",
    ],
    faqs: [
      {
        q: "What is the moratorium period in education loans?",
        a: "The moratorium is a repayment holiday. You do not have to pay principal EMIs during the study course duration plus a grace year to find employment."
      },
      {
        q: "Are there any tax benefits on education loans?",
        a: "Yes! Under Section 80E of the Income Tax Act, you can claim full tax deductions on the interest paid for up to 8 consecutive years."
      }
    ]
  },
  "car-loan": {
    title: "Car Loan Consultancy",
    subtitle: "Drive home your dream vehicle. Competitive rates for new hatchbacks, sedans, SUVs or pre-owned vehicles from top Indian lenders.",
    specs: {
      rate: "Starts 8.75% p.a.",
      tenure: "Up to 7 Years",
      fees: "Flat ₹2500 - ₹5000",
      collateral: "Vehicle Hypothecation",
    },
    docsSalaried: [
      "PAN Card & Aadhaar Card",
      "Last 3 months' salary slips",
      "Last 6 months' salary bank statements",
    ],
    docsSelfEmployed: [
      "PAN, Aadhaar & Business Address registration proofs",
      "Last 2 years' computed ITR files",
      "Official dealership Proforma Invoice of the vehicle",
      "RC Copy & Valuation report (only for Pre-Owned cars)",
    ],
    faqs: [
      {
        q: "Can I get 100% on-road funding for a car?",
        a: "Select banks offer 100% on-road funding for select corporate profiles and high-credit scores; otherwise, typical financing spans up to 90%."
      },
      {
        q: "Are interest rates fixed or floating for car loans?",
        a: "Most car loans in India feature fixed interest rates, meaning your monthly EMI payout remains constant throughout the tenure."
      }
    ]
  },
  "lap": {
    title: "Loan Against Property",
    subtitle: "Unlock high-value funding by leveraging residential, commercial, or industrial properties. Cheaper interest options compared to standard unsecured credit.",
    specs: {
      rate: "Starts 9.00% p.a.",
      tenure: "Up to 15 Years",
      fees: "0.50% - 1.00%",
      collateral: "Property Mortgage",
    },
    docsSalaried: [
      "PAN Card & Aadhaar Card",
      "3 years' ITR / salary slips",
      "Last 12 months' bank statements",
    ],
    docsSelfEmployed: [
      "Original registered Sale Deed / Conveyance Deed of property",
      "Encumbrance Certificate (EC) for the last 15 years",
      "Approved site plan copy & tax receipt logs",
    ],
    faqs: [
      {
        q: "Can I apply for LAP if the property is co-owned?",
        a: "Yes! In fact, all co-owners of the mortgaged property must join the loan application as co-applicants."
      },
      {
        q: "What types of properties can be mortgaged for LAP?",
        a: "Lenders accept self-occupied residential houses, commercial buildings, vacant industrial plots, and leased corporate facilities."
      }
    ]
  },
  "msme-loan": {
    title: "MSME Loan Consultancy",
    subtitle: "Support for Small and Medium Enterprises. Get expert advice on government-sponsored credit schemes, collateral-free credit limits, and banking policies.",
    specs: {
      rate: "Starts 9.50% p.a.",
      tenure: "Up to 7 Years",
      fees: "1.00% - 1.50%",
      collateral: "CGTMSE eligible",
    },
    docsSalaried: [
      "Directors' identity proofs (PAN / Aadhaar)",
    ],
    docsSelfEmployed: [
      "Udyam Registration Certificate (MSME registration)",
      "GST Certificate & Last 12 months' GST returns",
      "Last 2 years' computed Balance Sheets & ITR",
      "Last 12 months' business bank accounts statement",
    ],
    faqs: [
      {
        q: "What is the CGTMSE scheme?",
        a: "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) is a government scheme that guarantees collateral-free loans up to ₹2 Crores to creditworthy MSMEs."
      },
      {
        q: "Is an MSME Udyam registration card mandatory?",
        a: "Yes, to claim priority sector interest rate benefits and scheme concessions, Udyam registration is mandatory."
      }
    ]
  },
  "working-capital": {
    title: "Working Capital Loan Consultancy",
    subtitle: "Short-term credit limits to manage operational cash flow. Expert help securing Cash Credit (CC) limits, Overdraft (OD) setups, and bill discounting channels.",
    specs: {
      rate: "Linked to MCLR / EBLR",
      tenure: "Annual Renewable Limit",
      fees: "0.50% (review fees)",
      collateral: "Receivables / Stock",
    },
    docsSalaried: [
      "Identity papers of firm partners & guarantors",
    ],
    docsSelfEmployed: [
      "Audited Financial Statements (last 3 FYs)",
      "Debtor & Creditor aging lists (outstanding invoices)",
      "GST returns summary for the last 12 months",
      "Last 12 months' statements of primary current account",
    ],
    faqs: [
      {
        q: "How does a Cash Credit (CC) limit work?",
        a: "It is a revolving overdraft facility. Lenders set a drawing power limit based on your raw stocks and book debtors. Interest is billed only on the daily utilized balance."
      },
      {
        q: "How often are working capital limits renewed?",
        a: "Limits are sanctioned for a 12-month tenure, upon which banks review audit books and debtor standings annually to renew the limit."
      }
    ]
  }
};

// Generate static params for optimal static export/regeneration
export async function generateStaticParams() {
  return [
    { slug: "home-loan" },
    { slug: "personal-loan" },
    { slug: "business-loan" },
    { slug: "education-loan" },
    { slug: "car-loan" },
    { slug: "lap" },
    { slug: "msme-loan" },
    { slug: "working-capital" }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LoanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loan = loanDictionary[slug];

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
