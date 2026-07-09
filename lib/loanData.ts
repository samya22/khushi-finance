/**
 * ============================================================
 * SINGLE SOURCE OF TRUTH — Khushi Finance Loan Product Data
 * ============================================================
 *
 * Every page, component, and form reads loan information from
 * this file.  When the client updates any loan detail, edit
 * ONLY this file and the entire website updates automatically.
 *
 * DO NOT hardcode loan data anywhere else in the codebase.
 * ============================================================
 */

// --------------- Types ---------------

export interface LoanSpecs {
  /** Interest rate display string, e.g. "Starts 7.15% p.a." */
  rate: string;
  /** Tenure display string, e.g. "Up to 30 Years" */
  tenure: string;
  /** Processing fees display string */
  fees: string;
  /** Security / collateral type */
  collateral: string;
}

export interface LoanFaq {
  q: string;
  a: string;
}

export interface LoanProduct {
  /** URL slug — used in routing: /loans/[slug] */
  slug: string;
  /** Display title shown in cards & headings */
  title: string;
  /** Short card-level description (loans listing & home) */
  description: string;
  /** Longer subtitle for the detail page header */
  subtitle: string;
  /** Rate summary shown on card chips (home & listing) */
  rateSummary: string;
  /** Tenure summary shown on listing cards */
  tenureSummary: string;
  /** Full specs block for the detail page */
  specs: LoanSpecs;
  /** Document checklist for salaried borrowers */
  docsSalaried: string[];
  /** Document checklist for self-employed / business borrowers */
  docsSelfEmployed: string[];
  /** Product-specific FAQ items */
  faqs: LoanFaq[];
  /** If true, this product appears in the home page preview grid */
  showOnHome: boolean;
}

// --------------- Data ---------------

const loanProducts: Record<string, LoanProduct> = {
  "home-loan": {
    slug: "home-loan",
    title: "Home Loan",
    description:
      "Finance your dream home or buy a plot of land with low interest options.",
    subtitle:
      "Get affordable housing finance options from top banks. Buying a new apartment, constructing your dream home, or transferring your balance made simple.",
    rateSummary: "Starts 7.15% p.a.",
    tenureSummary: "Up to 30 Years",
    specs: {
      rate: "Starts 7.15% p.a.",
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
        a: "Generally, banks prefer a CIBIL credit score of 750 or above to access the lowest interest rates starting around 7.15% p.a.",
      },
      {
        q: "Can I transfer my active home loan to another bank?",
        a: "Yes! This is called a Home Loan Balance Transfer. If another bank offers a cheaper interest rate, we can facilitate moving your loan to reduce your EMIs.",
      },
    ],
    showOnHome: true,
  },

  "personal-loan": {
    slug: "personal-loan",
    title: "Personal Loan",
    description:
      "Immediate cash funds for medical needs, marriage, or personal purchases.",
    subtitle:
      "Unsecured instant personal loans without collateral. Ideal for medical emergencies, travel, marriage, or debt consolidation.",
    rateSummary: "Starts 9.99% p.a. (Subjective CIBIL)",
    tenureSummary: "Up to 5 Years",
    specs: {
      rate: "Starts 9.99% p.a. (Subjective CIBIL)",
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
        a: "Since personal loans are unsecured, banks can verify and disburse funds within 24-48 hours once all verification documents are completed.",
      },
      {
        q: "Do I need a co-applicant to apply for a personal loan?",
        a: "No, a co-applicant is not mandatory if your income and credit score meet the bank's independent borrowing thresholds.",
      },
    ],
    showOnHome: true,
  },

  "business-loan": {
    slug: "business-loan",
    title: "Business Loan",
    description:
      "Expand your company's potential, buy inventory, or upgrade operations.",
    subtitle:
      "Fuel your enterprise growth with collateral-free funding options. Expand infrastructure, purchase inventory, or manage working capital cycles.",
    rateSummary: "Starts 15% p.a.",
    tenureSummary: "Up to 5 Years",
    specs: {
      rate: "Starts 15% p.a.",
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
        a: "Lenders offer unsecured business limits up to ₹75 Lakhs, depending heavily on company balance sheet turn-overs and debt ratios.",
      },
      {
        q: "Can a proprietary firm apply for a business loan?",
        a: "Yes, proprietary concerns, partnership firms, and private limited companies are all eligible for commercial lending parameters.",
      },
    ],
    showOnHome: true,
  },

  "education-loan": {
    slug: "education-loan",
    title: "Education Loan",
    description:
      "Finance local university fees or overseas educational admissions with ease.",
    subtitle:
      "Finance your academic goals in top Indian or foreign colleges. Covers college tuition fees, hostel expenses, travel, and laptop purchases.",
    rateSummary: "Starts 10.5% p.a.",
    tenureSummary: "Up to 15 Years",
    specs: {
      rate: "Starts 10.5% p.a.",
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
        a: "The moratorium is a repayment holiday. You do not have to pay principal EMIs during the study course duration plus a grace year to find employment.",
      },
      {
        q: "Are there any tax benefits on education loans?",
        a: "Yes! Under Section 80E of the Income Tax Act, you can claim full tax deductions on the interest paid for up to 8 consecutive years.",
      },
    ],
    showOnHome: false,
  },

  "new-car-loan": {
    slug: "new-car-loan",
    title: "New Car Loan",
    description:
      "Purchase a brand-new hatchback, sedan, or SUV with competitive financing.",
    subtitle:
      "Drive home your dream new vehicle with affordable EMIs. Competitive rates from top Indian lenders for all new car segments.",
    rateSummary: "Starts 8% p.a.",
    tenureSummary: "Up to 7 Years",
    specs: {
      rate: "Starts 8% p.a.",
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
    ],
    faqs: [
      {
        q: "Can I get 100% on-road funding for a new car?",
        a: "Select banks offer 100% on-road funding for select corporate profiles and high-credit scores; otherwise, typical financing spans up to 90%.",
      },
      {
        q: "Are interest rates fixed or floating for new car loans?",
        a: "Most new car loans in India feature fixed interest rates, meaning your monthly EMI payout remains constant throughout the tenure.",
      },
    ],
    showOnHome: false,
  },

  "used-car-loan": {
    slug: "used-car-loan",
    title: "Used Car Loan",
    description:
      "Finance a reliable pre-owned vehicle with flexible loan options and quick approval.",
    subtitle:
      "Get hassle-free funding for purchasing a pre-owned car. Quick approvals and flexible tenure options from trusted lenders.",
    rateSummary: "Starts 15% p.a.",
    tenureSummary: "Up to 5 Years",
    specs: {
      rate: "Starts 15% p.a.",
      tenure: "Up to 5 Years",
      fees: "Flat ₹3000 - ₹7000",
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
      "RC Copy & Valuation report of the pre-owned vehicle",
    ],
    faqs: [
      {
        q: "What is the maximum age of a used car that can be financed?",
        a: "Most banks finance pre-owned cars that are up to 7-8 years old at the time of loan maturity. The vehicle must pass a satisfactory condition inspection.",
      },
      {
        q: "Do I need to provide a higher down payment for a used car loan?",
        a: "Yes, lenders typically finance 70-80% of the assessed valuation for pre-owned vehicles, so a higher down payment is usually required compared to new cars.",
      },
    ],
    showOnHome: false,
  },

  lap: {
    slug: "lap",
    title: "Loan Against Property",
    description:
      "Leverage your property's value to access higher loan values.",
    subtitle:
      "Unlock high-value funding by leveraging residential, commercial, or industrial properties. Cheaper interest options compared to standard unsecured credit.",
    rateSummary: "Starts 8–9% p.a.",
    tenureSummary: "Up to 15 Years",
    specs: {
      rate: "Starts 8–9% p.a.",
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
        a: "Yes! In fact, all co-owners of the mortgaged property must join the loan application as co-applicants.",
      },
      {
        q: "What types of properties can be mortgaged for LAP?",
        a: "Lenders accept self-occupied residential houses, commercial buildings, vacant industrial plots, and leased corporate facilities.",
      },
    ],
    showOnHome: true,
  },

  "msme-loan": {
    slug: "msme-loan",
    title: "MSME Loan",
    description:
      "Government scheme support (Mudra/CGTMSE schemes) for small enterprises.",
    subtitle:
      "Support for Small and Medium Enterprises. Get expert advice on government-sponsored credit schemes, collateral-free credit limits, and banking policies.",
    rateSummary: "Starts 12–13% p.a.",
    tenureSummary: "Up to 7 Years",
    specs: {
      rate: "Starts 12–13% p.a.",
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
        a: "The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) is a government scheme that guarantees collateral-free loans up to ₹2 Crores to creditworthy MSMEs.",
      },
      {
        q: "Is an MSME Udyam registration card mandatory?",
        a: "Yes, to claim priority sector interest rate benefits and scheme concessions, Udyam registration is mandatory.",
      },
    ],
    showOnHome: false,
  },

  "working-capital": {
    slug: "working-capital",
    title: "Working Capital Loan",
    description:
      "Cash Credit (CC) and Overdraft (OD) bank limits to smooth your daily operation cycles.",
    subtitle:
      "Short-term credit limits to manage operational cash flow. Expert help securing Cash Credit (CC) limits, Overdraft (OD) setups, and bill discounting channels.",
    rateSummary: "Starts 12% p.a.",
    tenureSummary: "Annual Renewable Limit",
    specs: {
      rate: "Starts 12% p.a.",
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
        a: "It is a revolving overdraft facility. Lenders set a drawing power limit based on your raw stocks and book debtors. Interest is billed only on the daily utilized balance.",
      },
      {
        q: "How often are working capital limits renewed?",
        a: "Limits are sanctioned for a 12-month tenure, upon which banks review audit books and debtor standings annually to renew the limit.",
      },
    ],
    showOnHome: false,
  },

  "machinery-loan": {
    slug: "machinery-loan",
    title: "Machinery Loan",
    description:
      "Finance industrial equipment, CNC machines, and manufacturing plant upgrades.",
    subtitle:
      "Get dedicated funding for purchasing new or refurbished industrial machinery. Competitive rates to modernize your production capacity and stay ahead of demand.",
    rateSummary: "Starts 13% p.a.",
    tenureSummary: "Up to 10 Years",
    specs: {
      rate: "Starts 13% p.a.",
      tenure: "Up to 10 Years",
      fees: "1.00% - 2.00%",
      collateral: "Machinery Hypothecation",
    },
    docsSalaried: [
      "Identity Proof of Directors (PAN / Aadhaar)",
      "Last 3 months' personal salary slips (if guarantor)",
    ],
    docsSelfEmployed: [
      "PAN of directors & firm registration papers",
      "Proforma Invoice or quotation of machinery to be purchased",
      "Last 12 months' business bank accounts statement",
      "ITR & Profit-Loss statements of last 2 years",
      "GST returns statements for the last 12 months",
    ],
    faqs: [
      {
        q: "What types of machinery can be financed?",
        a: "Lenders support a wide range — CNC machines, printing presses, packaging lines, construction equipment, textile looms, and other industrial plant & machinery.",
      },
      {
        q: "Can I get funding for second-hand or refurbished machinery?",
        a: "Yes, select banks and NBFCs finance pre-owned machinery up to 70-80% of the assessed valuation, subject to a satisfactory condition inspection report.",
      },
    ],
    showOnHome: false,
  },
};

// --------------- Helpers ---------------

/** Ordered list of all slugs for consistent rendering order across pages. */
const LOAN_ORDER: string[] = [
  "home-loan",
  "personal-loan",
  "business-loan",
  "education-loan",
  "new-car-loan",
  "used-car-loan",
  "lap",
  "msme-loan",
  "working-capital",
  "machinery-loan",
];

/** Returns all loan products in display order. */
export function getAllLoans(): LoanProduct[] {
  return LOAN_ORDER.map((slug) => loanProducts[slug]);
}

/** Returns a single loan by slug, or undefined if not found. */
export function getLoanBySlug(slug: string): LoanProduct | undefined {
  return loanProducts[slug];
}

/** Returns only the loans flagged for home page preview, in display order. */
export function getPreviewLoans(): LoanProduct[] {
  return getAllLoans().filter((loan) => loan.showOnHome);
}

/** Returns all slugs (for generateStaticParams). */
export function getAllLoanSlugs(): { slug: string }[] {
  return LOAN_ORDER.map((slug) => ({ slug }));
}

/**
 * Returns loan type names for form dropdowns.
 * Includes an "Other" option at the end.
 */
export function getLoanTypeNames(): string[] {
  return [...getAllLoans().map((loan) => loan.title), "Other"];
}
