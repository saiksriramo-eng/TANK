"use client";

import Link from "next/link";
import { 
  FileText, 
  ArrowLeft, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ArrowRight
} from "lucide-react";

interface EvaluationPillar {
  title: string;
  category: string;
  focusArea: string;
  diligenceChecklist: string[];
}

const EVALUATION_PILLARS: EvaluationPillar[] = [
  {
    title: "Market Size & Timing",
    category: "Pillar 01",
    focusArea: "Addressable market validation, structural customer urgency, and macroeconomic timing.",
    diligenceChecklist: [
      "Bottom-up TAM validation versus top-down market reports",
      "Regulatory or technological tailwinds accelerating customer adoption",
      "Customer willingness to pay and budget line-item replacement",
    ],
  },
  {
    title: "Technological Defensibility",
    category: "Pillar 02",
    focusArea: "Intellectual property barriers, data network effects, and switching friction.",
    diligenceChecklist: [
      "Proprietary technical assets and patent protection",
      "Ease of duplication by well-capitalized incumbents",
      "Data feedback loops that compound product differentiation over time",
    ],
  },
  {
    title: "Unit Economics & Gross Margin",
    category: "Pillar 03",
    focusArea: "Contribution margins, payback periods, and infrastructure cost scalability.",
    diligenceChecklist: [
      "Fully loaded gross margins including hosting and support headcount",
      "Customer acquisition cost payback timeline",
      "Capital expenditure requirements as order volume scales",
    ],
  },
  {
    title: "Go-to-Market & Distribution",
    category: "Pillar 04",
    focusArea: "Sales cycle efficiency, channel repeatability, and customer retention dynamics.",
    diligenceChecklist: [
      "Length and predictability of enterprise sales cycles",
      "Customer churn rates and net revenue expansion potential",
      "Field deployment and implementation resource constraints",
    ],
  },
];

const DELIBERATION_NOTES = [
  {
    partnerName: "Marcus Vance",
    firm: "Obsidian Venture Partners",
    focus: "Capital Efficiency",
    statusText: "Requires Margin Audit",
    inquirySummary: "Gross margins must be audited to ensure field servicing labor does not degrade target 60% gross profitability.",
  },
  {
    partnerName: "Dr. Elena Rostova",
    firm: "Vector Alpha Capital",
    focus: "Quantitative Verification",
    statusText: "Requires Longitudinal Cohorts",
    inquirySummary: "Additional harvest season telemetry needed to establish statistically significant yield improvements across disparate soil and weather conditions.",
  },
  {
    partnerName: "Aria Chen",
    firm: "Superlinear Global",
    focus: "Category Leadership",
    statusText: "Strong Strategic Alignment",
    inquirySummary: "The core biological challenge represents an existential customer priority with defensible intellectual property assets.",
  },
  {
    partnerName: "David Sullivan",
    firm: "Forge Operational Fund",
    focus: "Distribution Mechanics",
    statusText: "Requires Hub Model Clarification",
    inquirySummary: "Field repair logistics require regional certified depots rather than centralized field engineer dispatches to maintain operational efficiency.",
  },
];

export default function ReportPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] text-[#131311] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Direct Header */}
        <div className="pb-6 border-b border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Link
                href="/arena"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#6C6C6A] hover:text-[#131311] transition-colors mb-4 uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Arena</span>
              </Link>
              
              <div className="inline-flex items-center gap-2 bg-[#131311] text-white px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE7356]" />
                <span>Post-Meeting Evaluation Memorandum</span>
              </div>
              
              <h1 className="font-extrabold text-4xl sm:text-5xl text-[#131311] tracking-tight">
                Partner Evaluation Report
              </h1>
              
              <p className="text-sm sm:text-base text-[#6C6C6A] mt-2 max-w-2xl leading-relaxed font-medium">
                Standard institutional diligence criteria and qualitative findings recorded during partner deliberation. Review key focus areas prior to formal investor roadshows.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/pitch"
                className="px-6 py-3 rounded-full border-[1.5px] border-[#131311] text-xs font-bold hover:bg-zinc-100 flex items-center gap-2 uppercase tracking-wider shadow-[2px_2px_0px_#131311]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Pitch Intake</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Evaluation Pillars */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#131311] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#DE7356]" />
              <span>Core Institutional Diligence Pillars (4)</span>
            </h2>
            <span className="text-[11px] font-bold text-[#6C6C6A] uppercase tracking-wider">
              Framework: Syndicate Scorecard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EVALUATION_PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-[16px] border-[1.5px] border-[#131311] bg-white hover:shadow-[6px_6px_0px_#131311] transition-all flex flex-col justify-between shadow-[4px_4px_0px_#131311]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200">
                    <span className="bg-[#DE7356] text-[#131311] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                      {p.category}
                    </span>
                    <FileText className="w-4 h-4 text-[#6C6C6A]" />
                  </div>

                  <h3 className="font-extrabold text-lg text-[#131311] mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#6C6C6A] leading-relaxed mb-4 font-medium">
                    {p.focusArea}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 space-y-2 text-[11px] text-[#131311] font-semibold">
                  {p.diligenceChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#131311] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partner Deliberation Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-[20px] border-[1.5px] border-[#131311] bg-white shadow-[4px_4px_0px_#131311]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
              <h2 className="font-extrabold text-base text-[#131311] uppercase tracking-wide">
                Simulated Partner Deliberations
              </h2>
              <span className="text-xs font-bold text-[#6C6C6A] uppercase tracking-wider">
                Closed Door Record
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {DELIBERATION_NOTES.map((note) => (
                <div
                  key={note.partnerName}
                  className="p-5 rounded-xl border-[1.5px] border-[#131311] bg-[#F3F2EA] flex flex-col justify-between shadow-[2px_2px_0px_#131311]"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-300">
                      <span className="font-extrabold text-[#131311] uppercase">{note.partnerName}</span>
                      <span className="bg-[#DE7356] text-[#131311] text-[10px] font-bold px-2 py-0.5 rounded">
                        {note.statusText}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#6C6C6A] font-bold mb-2">
                      {note.firm} · Focus: {note.focus}
                    </div>
                    <p className="text-[#131311] text-xs leading-relaxed italic font-medium">
                      &ldquo;{note.inquirySummary}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 p-6 sm:p-8 rounded-[20px] border-[1.5px] border-[#131311] bg-[#131311] text-white space-y-6 shadow-[4px_4px_0px_#000]">
            <div>
              <span className="text-[11px] font-extrabold text-[#DE7356] uppercase tracking-wider block mb-1">
                MEMORANDUM SUMMARY
              </span>
              <h3 className="font-extrabold text-2xl text-white">
                Next Steps Protocol
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Prioritize resolving partner dissent points before presenting live financial models to institutional partners.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs text-zinc-300 font-semibold">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DE7356] shrink-0 mt-0.5" />
                <span>Audit contribution margin against hardware warranty risks</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DE7356] shrink-0 mt-0.5" />
                <span>Establish cohort retention curves across 12-month data</span>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Prepare board representation counter-proposals</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <Link
                href="/pitch"
                className="btn-projectone-accent w-full py-3.5 text-xs font-extrabold justify-center"
              >
                <span>COMMENCE NEW INTAKE</span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
