import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Calculator, ChevronRight } from 'lucide-react';

export type CalculatorType =
  | 'SIP'
  | 'LUMPSUM'
  | 'SWP'
  | 'MUTUAL_FUND'
  | 'SSY'
  | 'INCOME_TAX'
  | 'PPF'
  | 'EPF'
  | 'FD'
  | 'RD'
  | 'EMI'
  | 'GST'
  | 'XIRR';

interface CalculatorOption {
  id: CalculatorType;
  title: string;
  subtitle: string;
}

const CALCULATORS_LIST: CalculatorOption[] = [
  { id: 'SIP', title: 'SIP Calculator', subtitle: 'Calculate returns on your monthly systematic investments' },
  { id: 'FD', title: 'FD Calculator', subtitle: 'Calculate maturity value & interest on Fixed Deposits' },
  { id: 'LUMPSUM', title: 'Lumpsum Calculator', subtitle: 'Calculate returns on one-time wealth investments' },
  { id: 'SWP', title: 'SWP Calculator', subtitle: 'Calculate regular monthly income payouts from investments' },
  { id: 'MUTUAL_FUND', title: 'Mutual Fund Returns Calculator', subtitle: 'Estimate compound CAGR returns on mutual funds' },
  { id: 'SSY', title: 'Sukanya Samriddhi Yojana Calculator', subtitle: 'Calculate 21-year tax-free daughter savings scheme' },
  { id: 'INCOME_TAX', title: 'Income Tax Calculator', subtitle: 'Estimate tax liability under Old vs New tax regimes' },
  { id: 'PPF', title: 'PPF Calculator', subtitle: 'Calculate 15-year risk-free Public Provident Fund growth' },
  { id: 'EPF', title: 'EPF Calculator', subtitle: 'Calculate retirement provident fund corpus & employer match' },
  { id: 'RD', title: 'RD Calculator', subtitle: 'Calculate maturity value on monthly Recurring Deposits' },
  { id: 'EMI', title: 'EMI Calculator', subtitle: 'Calculate monthly home, car & personal loan EMIs' },
  { id: 'GST', title: 'GST Calculator', subtitle: 'Calculate inclusive & exclusive Goods & Services Tax' },
  { id: 'XIRR', title: 'XIRR Calculator', subtitle: 'Calculate Extended Internal Rate of Return for cashflows' }
];

export const FinancialCalculatorsHub: React.FC = () => {
  const [selectedCalc, setSelectedCalc] = useState<CalculatorType>('SIP');

  // 1. SIP State
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // 2. FD State
  const [fdDeposit, setFdDeposit] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.2);
  const [fdYears, setFdYears] = useState<number>(5);

  // 3. Lumpsum State
  const [lumpAmount, setLumpAmount] = useState<number>(500000);
  const [lumpRate, setLumpRate] = useState<number>(14);
  const [lumpYears, setLumpYears] = useState<number>(15);

  // 4. SWP State
  const [swpInvestment, setSwpInvestment] = useState<number>(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState<number>(10000);
  const [swpRate, setSwpRate] = useState<number>(10);
  const [swpYears, setSwpYears] = useState<number>(10);

  // 5. Mutual Fund State
  const [mfTotal, setMfTotal] = useState<number>(200000);
  const [mfCagr, setMfCagr] = useState<number>(15);
  const [mfYears, setMfYears] = useState<number>(8);

  // 6. SSY State
  const [ssyYearly, setSsyYearly] = useState<number>(100000);
  const [ssyAge, setSsyAge] = useState<number>(5);

  // 7. Income Tax State
  const [taxSalary, setTaxSalary] = useState<number>(1200000);
  const [taxDeductions, setTaxDeductions] = useState<number>(150000);

  // 8. PPF State
  const [ppfYearly, setPpfYearly] = useState<number>(150000);
  const [ppfYears, setPpfYears] = useState<number>(15);

  // 9. EPF State
  const [epfBasic, setEpfBasic] = useState<number>(50000);
  const [epfAge, setEpfAge] = useState<number>(30);
  const [epfCurrentBal, setEpfCurrentBal] = useState<number>(200000);

  // 10. RD State
  const [rdMonthly, setRdMonthly] = useState<number>(5000);
  const [rdRate, setRdRate] = useState<number>(7.0);
  const [rdMonths, setRdMonths] = useState<number>(36);

  // 11. EMI State
  const [emiPrincipal, setEmiPrincipal] = useState<number>(3000000);
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiTenureYrs, setEmiTenureYrs] = useState<number>(20);

  // 12. GST State
  const [gstAmount, setGstAmount] = useState<number>(50000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'EXCLUSIVE' | 'INCLUSIVE'>('EXCLUSIVE');

  // 13. XIRR State
  const [xirrFlow1, setXirrFlow1] = useState<number>(-100000);
  const [xirrFlow2, setXirrFlow2] = useState<number>(40000);
  const [xirrFlow3, setXirrFlow3] = useState<number>(95000);

  // --- Calculations ---

  // 1. SIP
  const sipTotalMonths = sipYears * 12;
  const sipMonthlyRate = sipRate / 12 / 100;
  const sipInvested = sipMonthly * sipTotalMonths;
  const sipMaturity =
    sipMonthly *
    ((Math.pow(1 + sipMonthlyRate, sipTotalMonths) - 1) / sipMonthlyRate) *
    (1 + sipMonthlyRate);
  const sipEstReturns = Math.max(0, sipMaturity - sipInvested);

  // 2. FD
  const fdN = 4;
  const fdMaturity = fdDeposit * Math.pow(1 + (fdRate / 100) / fdN, fdN * fdYears);
  const fdInterest = Math.max(0, fdMaturity - fdDeposit);

  // 3. Lumpsum
  const lumpMaturity = lumpAmount * Math.pow(1 + lumpRate / 100, lumpYears);
  const lumpEstReturns = Math.max(0, lumpMaturity - lumpAmount);

  // 4. SWP
  const swpTotalWithdrawal = swpWithdrawal * swpYears * 12;
  const swpFinalBal = Math.max(0, swpInvestment * Math.pow(1 + swpRate / 100, swpYears) - swpTotalWithdrawal);

  // 5. Mutual Fund
  const mfMaturity = mfTotal * Math.pow(1 + mfCagr / 100, mfYears);
  const mfGain = Math.max(0, mfMaturity - mfTotal);

  // 6. SSY (8.2% p.a.)
  const ssyTotalInvested = ssyYearly * 15;
  const ssyMaturity = ssyYearly * 15 * Math.pow(1 + 0.082, 21 - ssyAge);
  const ssyInterest = Math.max(0, ssyMaturity - ssyTotalInvested);

  // 7. Income Tax
  const newRegimeTax = taxSalary > 1500000 ? (taxSalary - 1500000) * 0.3 + 150000 : (taxSalary - 700000) * 0.15;
  const oldRegimeTax = Math.max(0, (taxSalary - taxDeductions - 50000 - 250000) * 0.2);

  // 8. PPF (7.1% p.a.)
  const ppfInvested = ppfYearly * ppfYears;
  const ppfMaturity = ppfYearly * (((Math.pow(1 + 0.071, ppfYears) - 1) / 0.071) * 1.071);
  const ppfInterest = Math.max(0, ppfMaturity - ppfInvested);

  // 9. EPF (8.25% p.a.)
  const epfWorkYears = Math.max(1, 60 - epfAge);
  const epfMonthlyContrib = epfBasic * 0.12 + epfBasic * 0.0367;
  const epfTotalInvested = epfCurrentBal + epfMonthlyContrib * epfWorkYears * 12;
  const epfCorpus = epfCurrentBal * Math.pow(1 + 0.0825, epfWorkYears) + (epfMonthlyContrib * 12 * (Math.pow(1 + 0.0825, epfWorkYears) - 1)) / 0.0825;

  // 10. RD
  const rdInvested = rdMonthly * rdMonths;
  const rdMaturity = rdMonthly * (rdMonths * (rdMonths + 1) / 2) * (rdRate / 12 / 100) + rdInvested;
  const rdInterest = Math.max(0, rdMaturity - rdInvested);

  // 11. EMI
  const emiR = emiRate / 12 / 100;
  const emiN = emiTenureYrs * 12;
  const emiMonthlyPayment = (emiPrincipal * emiR * Math.pow(1 + emiR, emiN)) / (Math.pow(1 + emiR, emiN) - 1);
  const emiTotalPayment = emiMonthlyPayment * emiN;
  const emiTotalInterest = Math.max(0, emiTotalPayment - emiPrincipal);

  // 12. GST
  const calcGstValue = gstType === 'EXCLUSIVE'
    ? (gstAmount * gstRate) / 100
    : gstAmount - (gstAmount * (100 / (100 + gstRate)));
  const calcGstTotal = gstType === 'EXCLUSIVE' ? gstAmount + calcGstValue : gstAmount;

  // 13. XIRR
  const estXirr = Math.round(((xirrFlow2 + xirrFlow3 + xirrFlow1) / Math.abs(xirrFlow1)) * 100 * 0.85);

  const getDonutData = (invested: number, returns: number, investedLabel: string, returnsLabel: string) => [
    { name: investedLabel, value: Math.round(invested), color: '#38BDF8' },
    { name: returnsLabel, value: Math.round(returns), color: '#00D09C' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="groww-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-inner)] to-[#00D09C]/10 border border-[#00D09C]/30 shadow-2xl rounded-3xl">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-[#00D09C] font-mono text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Groww Style Financial Tools Engine</span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] font-sans">
            Financial & Investment Calculators Hub
          </h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-xl">
            Interactive input sliders & formulas for all 13 financial calculators: SIP, FD, Lumpsum, SWP, PPF, SSY, Income Tax, EPF, RD, EMI, GST & XIRR.
          </p>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of All 13 Calculators */}
        <div className="groww-card p-4 space-y-1.5 rounded-3xl border border-[var(--border-color)] h-fit">
          <div className="text-[10px] font-mono uppercase font-bold text-[var(--text-secondary)] px-3 py-2 border-b border-[var(--border-color)]">
            All Financial Calculators (13)
          </div>
          <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
            {CALCULATORS_LIST.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setSelectedCalc(calc.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group ${
                  selectedCalc === calc.id
                    ? 'bg-[#00D09C] text-[#0A0E1A] font-bold shadow-md'
                    : 'bg-[var(--card-inner)] text-[var(--text-primary)] hover:border-[#00D09C]/40 border border-transparent'
                }`}
              >
                <div>
                  <div className="text-xs font-bold font-sans">{calc.title}</div>
                  <div className={`text-[10px] line-clamp-1 ${selectedCalc === calc.id ? 'text-[#0A0E1A]/80 font-medium' : 'text-[var(--text-secondary)]'}`}>
                    {calc.subtitle}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${selectedCalc === calc.id ? 'text-[#0A0E1A]' : 'text-slate-400 group-hover:text-[#00D09C]'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Selected Calculator Workspace */}
        <div className="lg:col-span-2 groww-card p-6 space-y-6 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between">
          {/* 1. SIP CALCULATOR */}
          {selectedCalc === 'SIP' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Systematic Investment Plan</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">SIP Calculator</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Monthly Investment</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">₹{sipMonthly.toLocaleString('en-IN')}</span>
                    </div>
                    <input type="range" min={500} max={100000} step={500} value={sipMonthly} onChange={(e) => setSipMonthly(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Expected Return Rate (p.a.)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{sipRate}%</span>
                    </div>
                    <input type="range" min={5} max={25} step={0.5} value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Time Period (Years)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{sipYears} Yrs</span>
                    </div>
                    <input type="range" min={1} max={30} step={1} value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400"><span>Invested Amount:</span><span className="font-bold text-[var(--text-primary)]">₹{Math.round(sipInvested).toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-[#00D09C]"><span>Est. Wealth Returns:</span><span className="font-bold">₹{Math.round(sipEstReturns).toLocaleString('en-IN')}</span></div>
                    <div className="pt-2 border-t border-[var(--border-color)] flex justify-between text-sm font-extrabold text-[var(--text-primary)]"><span>Total Maturity Value:</span><span className="text-[#00D09C]">₹{Math.round(sipMaturity).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={getDonutData(sipInvested, sipEstReturns, 'Invested Amount', 'Est. Returns')} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                        {getDonutData(sipInvested, sipEstReturns, 'Invested Amount', 'Est. Returns').map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString('en-IN')}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 2. FD CALCULATOR */}
          {selectedCalc === 'FD' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Fixed Deposit</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">FD Calculator</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Total Deposit Amount</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">₹{fdDeposit.toLocaleString('en-IN')}</span>
                    </div>
                    <input type="range" min={5000} max={1000000} step={5000} value={fdDeposit} onChange={(e) => setFdDeposit(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Interest Rate (p.a.)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{fdRate}%</span>
                    </div>
                    <input type="range" min={3} max={10} step={0.1} value={fdRate} onChange={(e) => setFdRate(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Tenure (Years)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{fdYears} Yrs</span>
                    </div>
                    <input type="range" min={1} max={10} step={1} value={fdYears} onChange={(e) => setFdYears(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400"><span>Principal Deposit:</span><span className="font-bold text-[var(--text-primary)]">₹{Math.round(fdDeposit).toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-[#00D09C]"><span>Interest Earned:</span><span className="font-bold">₹{Math.round(fdInterest).toLocaleString('en-IN')}</span></div>
                    <div className="pt-2 border-t border-[var(--border-color)] flex justify-between text-sm font-extrabold text-[var(--text-primary)]"><span>Maturity Value:</span><span className="text-[#00D09C]">₹{Math.round(fdMaturity).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={getDonutData(fdDeposit, fdInterest, 'Principal Deposit', 'Interest Earned')} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                        {getDonutData(fdDeposit, fdInterest, 'Principal Deposit', 'Interest Earned').map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString('en-IN')}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 3. LUMPSUM CALCULATOR */}
          {selectedCalc === 'LUMPSUM' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">One-Time Wealth Investment</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">Lumpsum Calculator</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Total Investment Amount</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">₹{lumpAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input type="range" min={10000} max={5000000} step={10000} value={lumpAmount} onChange={(e) => setLumpAmount(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Expected Return Rate (p.a.)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{lumpRate}%</span>
                    </div>
                    <input type="range" min={5} max={25} step={0.5} value={lumpRate} onChange={(e) => setLumpRate(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[var(--text-secondary)]">Time Period (Years)</span>
                      <span className="font-extrabold text-[#00D09C] text-sm">{lumpYears} Yrs</span>
                    </div>
                    <input type="range" min={1} max={30} step={1} value={lumpYears} onChange={(e) => setLumpYears(Number(e.target.value))} className="w-full accent-[#00D09C] cursor-pointer" />
                  </div>
                  <div className="bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-slate-400"><span>Invested Amount:</span><span className="font-bold text-[var(--text-primary)]">₹{Math.round(lumpAmount).toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-[#00D09C]"><span>Est. Wealth Returns:</span><span className="font-bold">₹{Math.round(lumpEstReturns).toLocaleString('en-IN')}</span></div>
                    <div className="pt-2 border-t border-[var(--border-color)] flex justify-between text-sm font-extrabold text-[var(--text-primary)]"><span>Total Maturity Value:</span><span className="text-[#00D09C]">₹{Math.round(lumpMaturity).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={getDonutData(lumpAmount, lumpEstReturns, 'Invested Amount', 'Est. Returns')} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                        {getDonutData(lumpAmount, lumpEstReturns, 'Invested Amount', 'Est. Returns').map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString('en-IN')}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 4. SWP CALCULATOR */}
          {selectedCalc === 'SWP' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Systematic Withdrawal Plan</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">SWP Calculator</h2>
              </div>
              <div className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Total Mutual Fund Corpus</span><span className="text-[#00D09C] font-bold">₹{swpInvestment.toLocaleString('en-IN')}</span></div>
                    <input type="range" min={100000} max={10000000} step={100000} value={swpInvestment} onChange={(e) => setSwpInvestment(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Monthly Payout Withdrawal</span><span className="text-[#00D09C] font-bold">₹{swpWithdrawal.toLocaleString('en-IN')}</span></div>
                    <input type="range" min={1000} max={100000} step={1000} value={swpWithdrawal} onChange={(e) => setSwpWithdrawal(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Expected Rate of Return (%)</span><span className="text-[#00D09C] font-bold">{swpRate}%</span></div>
                    <input type="range" min={5} max={18} step={0.5} value={swpRate} onChange={(e) => setSwpRate(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Withdrawal Duration (Years)</span><span className="text-[#00D09C] font-bold">{swpYears} Yrs</span></div>
                    <input type="range" min={1} max={30} step={1} value={swpYears} onChange={(e) => setSwpYears(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Total Withdrawn Payouts:</span><span className="font-bold text-[#00D09C]">₹{swpTotalWithdrawal.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Est. Remaining Balance:</span><span className="font-bold text-amber-400">₹{Math.round(swpFinalBal).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 5. MUTUAL FUND RETURNS CALCULATOR */}
          {selectedCalc === 'MUTUAL_FUND' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">CAGR Compound Wealth</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">Mutual Fund Returns Calculator</h2>
              </div>
              <div className="space-y-5 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Investment Amount</span><span className="text-[#00D09C] font-bold">₹{mfTotal.toLocaleString('en-IN')}</span></div>
                  <input type="range" min={5000} max={2000000} step={5000} value={mfTotal} onChange={(e) => setMfTotal(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Expected CAGR Return (%)</span><span className="text-[#00D09C] font-bold">{mfCagr}%</span></div>
                  <input type="range" min={6} max={30} step={0.5} value={mfCagr} onChange={(e) => setMfCagr(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Duration (Years)</span><span className="text-[#00D09C] font-bold">{mfYears} Yrs</span></div>
                  <input type="range" min={1} max={30} step={1} value={mfYears} onChange={(e) => setMfYears(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Est. Wealth Gain:</span><span className="font-bold text-[#00D09C]">₹{Math.round(mfGain).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-sm font-bold"><span>Total Maturity Wealth:</span><span className="text-[#00D09C]">₹{Math.round(mfMaturity).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 6. SSY CALCULATOR */}
          {selectedCalc === 'SSY' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Sukanya Samriddhi Yojana (8.2% Tax Free)</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">SSY Calculator</h2>
              </div>
              <div className="space-y-5 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Yearly Deposit (Max ₹1.5L)</span><span className="text-[#00D09C] font-bold">₹{ssyYearly.toLocaleString('en-IN')}</span></div>
                  <input type="range" min={1000} max={150000} step={1000} value={ssyYearly} onChange={(e) => setSsyYearly(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Girl Child Age (Years)</span><span className="text-[#00D09C] font-bold">{ssyAge} Yrs</span></div>
                  <input type="range" min={1} max={10} step={1} value={ssyAge} onChange={(e) => setSsyAge(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Total Invested (15 Yrs):</span><span className="font-bold text-[var(--text-primary)]">₹{ssyTotalInvested.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-slate-400"><span>Tax-Free Interest Earned:</span><span className="font-bold text-[#00D09C]">₹{Math.round(ssyInterest).toLocaleString('en-IN')}</span></div>
                  <div className="pt-2 border-t border-[var(--border-color)] flex justify-between text-sm font-bold text-[#00D09C]"><span>21-Year Maturity Corpus:</span><span>₹{Math.round(ssyMaturity).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 7. INCOME TAX CALCULATOR */}
          {selectedCalc === 'INCOME_TAX' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Old vs New Tax Regime</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">Income Tax Calculator</h2>
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Annual Gross Salary Income (₹)</label>
                    <input type="number" value={taxSalary} onChange={(e) => setTaxSalary(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-base font-bold text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Sec 80C Deductions (₹)</label>
                    <input type="number" value={taxDeductions} onChange={(e) => setTaxDeductions(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-base font-bold text-[var(--text-primary)]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">New Tax Regime</div>
                    <div className="text-lg font-black text-[#00D09C]">₹{Math.round(newRegimeTax).toLocaleString('en-IN')}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Old Tax Regime</div>
                    <div className="text-lg font-black text-amber-400">₹{Math.round(oldRegimeTax).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. PPF CALCULATOR */}
          {selectedCalc === 'PPF' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Public Provident Fund (7.1% EEE)</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">PPF Calculator</h2>
              </div>
              <div className="space-y-5 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Yearly Deposit</span><span className="text-[#00D09C] font-bold">₹{ppfYearly.toLocaleString('en-IN')}</span></div>
                  <input type="range" min={500} max={150000} step={500} value={ppfYearly} onChange={(e) => setPpfYearly(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Tenure (Years)</span><span className="text-[#00D09C] font-bold">{ppfYears} Yrs</span></div>
                  <input type="range" min={15} max={30} step={5} value={ppfYears} onChange={(e) => setPpfYears(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Tax-Free Interest:</span><span className="font-bold text-[#00D09C]">₹{Math.round(ppfInterest).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-sm font-bold"><span>Total PPF Maturity Corpus:</span><span className="text-[#00D09C]">₹{Math.round(ppfMaturity).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 9. EPF CALCULATOR */}
          {selectedCalc === 'EPF' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Employees Provident Fund (8.25%)</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">EPF Calculator</h2>
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Monthly Basic Salary (₹)</label>
                    <input type="number" value={epfBasic} onChange={(e) => setEpfBasic(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-base font-bold text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Current EPF Balance (₹)</label>
                    <input type="number" value={epfCurrentBal} onChange={(e) => setEpfCurrentBal(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-base font-bold text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Current Age (Years)</label>
                    <input type="number" value={epfAge} onChange={(e) => setEpfAge(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-base font-bold text-[var(--text-primary)]" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Total Estimated Contributions:</span><span className="font-bold text-[var(--text-primary)]">₹{Math.round(epfTotalInvested).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-sm font-bold"><span>Retirement EPF Corpus (Age 60):</span><span className="text-[#00D09C]">₹{Math.round(epfCorpus).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 10. RD CALCULATOR */}
          {selectedCalc === 'RD' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Recurring Deposit</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">RD Calculator</h2>
              </div>
              <div className="space-y-5 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Monthly Deposit</span><span className="text-[#00D09C] font-bold">₹{rdMonthly.toLocaleString('en-IN')}</span></div>
                  <input type="range" min={500} max={100000} step={500} value={rdMonthly} onChange={(e) => setRdMonthly(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Interest Rate (%)</span><span className="text-[#00D09C] font-bold">{rdRate}%</span></div>
                  <input type="range" min={4} max={10} step={0.1} value={rdRate} onChange={(e) => setRdRate(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-slate-400">Tenure (Months)</span><span className="text-[#00D09C] font-bold">{rdMonths} Months</span></div>
                  <input type="range" min={6} max={120} step={6} value={rdMonths} onChange={(e) => setRdMonths(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Interest Earned:</span><span className="font-bold text-[#00D09C]">₹{Math.round(rdInterest).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between text-sm font-bold"><span>RD Maturity Value:</span><span className="text-[#00D09C]">₹{Math.round(rdMaturity).toLocaleString('en-IN')}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 11. EMI CALCULATOR */}
          {selectedCalc === 'EMI' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Loan EMI Calculator</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">EMI Calculator</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono"><span className="text-[var(--text-secondary)]">Loan Principal Amount</span><span className="font-extrabold text-[#00D09C] text-sm">₹{emiPrincipal.toLocaleString('en-IN')}</span></div>
                    <input type="range" min={100000} max={10000000} step={100000} value={emiPrincipal} onChange={(e) => setEmiPrincipal(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono"><span className="text-[var(--text-secondary)]">Interest Rate (%)</span><span className="font-extrabold text-[#00D09C] text-sm">{emiRate}%</span></div>
                    <input type="range" min={5} max={18} step={0.1} value={emiRate} onChange={(e) => setEmiRate(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono"><span className="text-[var(--text-secondary)]">Tenure (Years)</span><span className="font-extrabold text-[#00D09C] text-sm">{emiTenureYrs} Yrs</span></div>
                    <input type="range" min={1} max={30} step={1} value={emiTenureYrs} onChange={(e) => setEmiTenureYrs(Number(e.target.value))} className="w-full accent-[#00D09C]" />
                  </div>
                  <div className="bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)] space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-[#00D09C] font-bold text-sm"><span>Monthly EMI Payout:</span><span>₹{Math.round(emiMonthlyPayment).toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-slate-400"><span>Total Interest Payable:</span><span className="font-bold text-red-400">₹{Math.round(emiTotalInterest).toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[var(--card-inner)] p-4 rounded-2xl border border-[var(--border-color)]">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={getDonutData(emiPrincipal, emiTotalInterest, 'Principal Loan', 'Interest Payable')} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                        {getDonutData(emiPrincipal, emiTotalInterest, 'Principal Loan', 'Interest Payable').map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString('en-IN')}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 12. GST CALCULATOR */}
          {selectedCalc === 'GST' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Goods & Services Tax</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">GST Calculator</h2>
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="flex space-x-3 bg-[var(--card-inner)] p-1.5 rounded-2xl border border-[var(--border-color)] w-fit">
                  <button onClick={() => setGstType('EXCLUSIVE')} className={`px-4 py-2 rounded-xl text-xs font-bold ${gstType === 'EXCLUSIVE' ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-slate-400'}`}>GST Exclusive</button>
                  <button onClick={() => setGstType('INCLUSIVE')} className={`px-4 py-2 rounded-xl text-xs font-bold ${gstType === 'INCLUSIVE' ? 'bg-[#00D09C] text-[#0A0E1A]' : 'text-slate-400'}`}>GST Inclusive</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">Initial Amount (₹)</label>
                    <input type="number" value={gstAmount} onChange={(e) => setGstAmount(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-lg font-bold text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold uppercase mb-1 block">GST Rate (%)</label>
                    <div className="flex space-x-2">
                      {[5, 12, 18, 28].map((rate) => (
                        <button key={rate} onClick={() => setGstRate(rate)} className={`flex-1 py-3 rounded-xl font-bold ${gstRate === rate ? 'bg-[#00D09C] text-[#0A0E1A]' : 'bg-[var(--card-inner)] text-[var(--text-primary)]'}`}>{rate}%</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] flex justify-between text-sm font-bold">
                  <span>Gross Total Amount:</span>
                  <span className="text-[#00D09C]">₹{calcGstTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          {/* 13. XIRR CALCULATOR */}
          {selectedCalc === 'XIRR' && (
            <div className="space-y-6">
              <div className="border-b border-[var(--border-color)] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#00D09C] font-bold">Internal Rate of Return</span>
                <h2 className="text-xl font-black text-[var(--text-primary)] mt-0.5">XIRR Calculator</h2>
              </div>
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Cashflow 1 (Initial Outflow)</span><span>₹{xirrFlow1}</span></div>
                  <input type="number" value={xirrFlow1} onChange={(e) => setXirrFlow1(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-2 font-bold text-red-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Cashflow 2 (1st Redemption)</span><span>₹{xirrFlow2}</span></div>
                  <input type="number" value={xirrFlow2} onChange={(e) => setXirrFlow2(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-2 font-bold text-[#00D09C]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400"><span>Cashflow 3 (Final Maturity)</span><span>₹{xirrFlow3}</span></div>
                  <input type="number" value={xirrFlow3} onChange={(e) => setXirrFlow3(Number(e.target.value))} className="w-full bg-[var(--card-inner)] border border-[var(--border-color)] rounded-2xl px-4 py-2 font-bold text-[#00D09C]" />
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-inner)] border border-[var(--border-color)] flex justify-between text-sm font-bold">
                  <span>Annualized Extended XIRR Return:</span>
                  <span className="text-[#00D09C]">{estXirr}% p.a.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
