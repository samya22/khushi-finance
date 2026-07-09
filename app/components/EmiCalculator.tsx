"use client";

import React, { useState, useEffect } from "react";

interface AmortizationRow {
  year: number;
  openBalance: number;
  principalPaid: number;
  interestPaid: number;
  closeBalance: number;
}

export default function EmiCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(9.2);
  const [tenure, setTenure] = useState(20);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  // Indian Currency Formatter (e.g. ₹ 5,00,000)
  const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });

  useEffect(() => {
    // Perform calculations
    const P = amount;
    const annualRate = interestRate;
    const N_years = tenure;

    const r = (annualRate / 12) / 100;
    const n = N_years * 12;

    let computedEmi = 0;
    let computedPayable = 0;
    let computedInterest = 0;

    if (P > 0 && n > 0) {
      if (r === 0) {
        computedEmi = P / n;
        computedPayable = P;
        computedInterest = 0;
      } else {
        computedEmi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        computedPayable = computedEmi * n;
        computedInterest = computedPayable - P;
      }
    }

    setEmi(computedEmi);
    setTotalPayable(computedPayable);
    setTotalInterest(computedInterest);

    // Build Amortization schedule
    if (P > 0 && computedEmi > 0) {
      const schedule: AmortizationRow[] = [];
      let currentBalance = P;
      const monthlyRate = (annualRate / 12) / 100;

      for (let year = 1; year <= N_years; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;
        const startBalance = currentBalance;

        for (let month = 1; month <= 12; month++) {
          const monthlyInterest = currentBalance * monthlyRate;
          let monthlyPrincipal = computedEmi - monthlyInterest;

          if (currentBalance < monthlyPrincipal) {
            monthlyPrincipal = currentBalance;
          }

          yearlyInterest += monthlyInterest;
          yearlyPrincipal += monthlyPrincipal;
          currentBalance -= monthlyPrincipal;

          if (currentBalance <= 0) {
            currentBalance = 0;
            break;
          }
        }

        schedule.push({
          year,
          openBalance: startBalance,
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          closeBalance: currentBalance
        });

        if (currentBalance <= 0) break;
      }
      setAmortizationSchedule(schedule);
    } else {
      setAmortizationSchedule([]);
    }
  }, [amount, interestRate, tenure]);

  const principalPct = totalPayable > 0 ? (amount / totalPayable) * 100 : 50;
  const interestPct = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 50;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
        {/* Sliders Box */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {/* Loan Amount */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="calcAmountInput" className="font-semibold text-[15px] text-text-dark">Required Loan Amount</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <span className="text-sm font-semibold text-text-muted mr-1">₹</span>
                <input 
                  type="number" 
                  id="calcAmountInput" 
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={amount} 
                  min="100000" 
                  max="10000000" 
                  step="50000"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setAmount(val);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <input 
                type="range" 
                id="calcAmountSlider" 
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                min="100000" 
                max="10000000" 
                step="50000" 
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="calcInterestInput" className="font-semibold text-[15px] text-text-dark">Interest Rate (p.a.)</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <input 
                  type="number" 
                  id="calcInterestInput" 
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={interestRate} 
                  min="5" 
                  max="20" 
                  step="0.1"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setInterestRate(val);
                  }}
                />
                <span className="text-sm font-semibold text-text-muted ml-1">%</span>
              </div>
            </div>
            <div className="mt-3">
              <input 
                type="range" 
                id="calcInterestSlider" 
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                min="5" 
                max="20" 
                step="0.1" 
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Tenure */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="calcTenureInput" className="font-semibold text-[15px] text-text-dark">Repayment Tenure</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-3">
                <input 
                  type="number" 
                  id="calcTenureInput" 
                  className="border-none bg-transparent w-full font-bold text-base text-text-dark text-right outline-none"
                  value={tenure} 
                  min="1" 
                  max="30" 
                  step="1"
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) setTenure(val);
                  }}
                />
                <span className="text-sm font-semibold text-text-muted ml-1">Yrs</span>
              </div>
            </div>
            <div className="mt-3">
              <input 
                type="range" 
                id="calcTenureSlider" 
                className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                min="1" 
                max="30" 
                step="1" 
                value={tenure}
                onChange={(e) => setTenure(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-5 bg-primary-light rounded-2xl p-8 border border-primary/10 flex flex-col justify-between self-stretch">
          <div>
            <div className="mb-6">
              <div className="text-sm font-semibold text-text-medium mb-1">Monthly EMI Payment</div>
              <div className="text-3xl md:text-[2.25rem] font-extrabold text-primary font-heading" id="emiOutput">{inrFormatter.format(emi)}</div>
            </div>
            
            <div className="flex h-2 rounded-full overflow-hidden my-4 bg-gray-200">
              <div className="bg-primary h-full" style={{ width: `${principalPct}%` }} />
              <div className="bg-[#F59E0B] h-full" style={{ width: `${interestPct}%` }} />
            </div>

            <div className="flex gap-4 mb-6 text-[13px] font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-primary"></div>
                <span>Principal Amount</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-[#F59E0B]"></div>
                <span>Total Interest</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-semibold text-text-medium">Principal Amount</div>
              <div className="text-lg md:text-[20px] font-bold text-text-dark font-heading">{inrFormatter.format(amount)}</div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="text-sm font-semibold text-text-medium">Interest Payable</div>
              <div className="text-lg md:text-[20px] font-bold text-[#F59E0B] font-heading">{inrFormatter.format(totalInterest)}</div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <div className="text-sm font-bold text-text-dark">Total Payable Amount</div>
              <div className="text-lg md:text-[20px] font-bold text-text-dark font-heading">{inrFormatter.format(totalPayable)}</div>
            </div>

            <a href="#callback" className="w-full inline-flex items-center justify-center gap-2 font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer mt-4">Apply with these Details</a>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      {amortizationSchedule.length > 0 && (
        <div className="mt-14">
          <h2 className="text-[22px] md:text-2xl font-bold font-heading mb-3 text-text-dark">Yearly Amortization Schedule</h2>
          <p className="text-sm text-text-muted mb-6">View the detailed forecast of how your remaining principal reduces with each passing year.</p>
          
          <div className="w-full overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
            <table className="w-full border-collapse text-left text-sm min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-text-dark font-bold p-4 px-5">Year</th>
                  <th className="text-text-dark font-bold p-4 px-5">Opening Balance</th>
                  <th className="text-text-dark font-bold p-4 px-5">Principal Paid</th>
                  <th className="text-text-dark font-bold p-4 px-5">Interest Paid</th>
                  <th className="text-text-dark font-bold p-4 px-5">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {amortizationSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50 transition-colors odd:bg-white even:bg-gray-50/50">
                    <td className="p-4 px-5 font-semibold text-text-dark">Year {row.year}</td>
                    <td className="p-4 px-5 text-text-medium">{inrFormatter.format(row.openBalance)}</td>
                    <td className="p-4 px-5 text-accent-green font-semibold">{inrFormatter.format(row.principalPaid)}</td>
                    <td className="p-4 px-5 text-[#F59E0B]">{inrFormatter.format(row.interestPaid)}</td>
                    <td className="p-4 px-5 text-text-medium font-semibold">{inrFormatter.format(row.closeBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
