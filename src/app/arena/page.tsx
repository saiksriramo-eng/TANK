"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Check
} from "lucide-react";

interface PitchData {
  name: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  marketSize: string;
  fundingAsk: string;
  valuation: string;
}

const DEFAULT_PITCH: PitchData = {
  name: "OmniHarvest",
  category: "AgTech Robotics",
  tagline: "Autonomous micro-drone pollination for commercial orchards facing pollinator deficits.",
  problem: "Commercial bee colony collapses create urgent yield deficits across almond and fruit acreage, costing growers millions.",
  solution: "Sub-ounce autonomous micro-drones applying electrostatic pollen dispersal with computer vision targeting.",
  marketSize: "$18.4B Specialty Crop Pollination",
  fundingAsk: "$2,500,000",
  valuation: "$20,800,000 Post-Money",
};

interface RoundQuestion {
  investorId: string;
  investorName: string;
  archetype: string;
  firm: string;
  factor: string;
  question: string;
  sampleAnswer: string;
}

const QUESTIONS: RoundQuestion[] = [
  {
    investorId: "marcus",
    investorName: "Marcus Vance",
    archetype: "The Skeptic",
    firm: "Obsidian Venture Partners",
    factor: "Unit Economics & Margin Durability",
    question: "Walk me through your unit economics without growth subsidies. When field maintenance and infrastructure depreciation are fully accounted for, what does your true gross margin look like?",
    sampleAnswer: "Our gross margins currently stand at 64% inclusive of hardware amortization and field technician labor. By leveraging regional agricultural maintenance depots rather than centralized dispatch, our marginal servicing cost decreases by 28% as cluster density increases.",
  },
  {
    investorId: "elena",
    investorName: "Dr. Elena Rostova",
    archetype: "The Quant",
    firm: "Vector Alpha Capital",
    factor: "Cohort Retention & Payback Velocity",
    question: "Assumptions aren't data. How are you measuring customer retention across twelve months, and what is your verified customer acquisition payback curve?",
    sampleAnswer: "In our initial pilot cohort across 4,200 acres, customer renewal rate was 92% year-over-year. Fully loaded customer acquisition cost of $14,000 is recouped within 7.4 months based on initial deployment licensing and recurring agronomy analytics fees.",
  },
  {
    investorId: "aria",
    investorName: "Aria Chen",
    archetype: "The Visionary",
    firm: "Superlinear Global",
    factor: "Category Defensibility & Moats",
    question: "If an incumbent agricultural machinery giant bundles a competitive autonomous dispersal feature into their existing tractor fleet next quarter, what structural moat protects your business?",
    sampleAnswer: "Our defensibility lies in three proprietary patents covering electrostatic micronized pollen dispersal and closed-loop canopy computer vision models trained on proprietary multi-spectral orchard datasets that ground tractors cannot replicate.",
  },
  {
    investorId: "sully",
    investorName: "David Sullivan",
    archetype: "The Operator",
    firm: "Forge Operational Fund",
    factor: "Go-To-Market Distribution & Scaling Velocities",
    question: "Execution eats vision for breakfast. Commercial procurement in this category is notoriously conservative. How do you compress your enterprise sales cycle and scale field distribution?",
    sampleAnswer: "We bypass multi-month individual grower sales cycles by partnering directly with grower cooperatives and agricultural packing houses who act as channel distributors in exchange for volume-weighted telemetry rebates.",
  },
];

export default function InvestorsArenaPage() {
  const [pitch, setPitch] = useState<PitchData>(DEFAULT_PITCH);
  const [activeRound, setActiveRound] = useState<number>(0);
  const [founderAnswer, setFounderAnswer] = useState<string>("");
  const [roundCritiques, setRoundCritiques] = useState<{ [round: number]: { answer: string; feedback: string; status: "Approved" | "Concern" | "Strong" } }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tank_active_pitch");
      if (saved) {
        try {
          setPitch(JSON.parse(saved));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const currentQ = QUESTIONS[activeRound];

  const handleUseSample = () => {
    setFounderAnswer(currentQ.sampleAnswer);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderAnswer.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      let feedback = "";
      let status: "Approved" | "Concern" | "Strong" = "Approved";

      if (currentQ.investorId === "marcus") {
        status = founderAnswer.length > 80 ? "Strong" : "Concern";
        feedback = `Marcus Vance: "The margin structure is plausible, provided warranty reserves hold. I will still require strict liquidation covenants in the term sheet."`;
      } else if (currentQ.investorId === "elena") {
        status = founderAnswer.includes("%") || founderAnswer.length > 90 ? "Strong" : "Approved";
        feedback = `Dr. Elena Rostova: "Your cohort payback figures satisfy our threshold criteria. We will verify the retention raw data during formal technical diligence."`;
      } else if (currentQ.investorId === "aria") {
        status = "Strong";
        feedback = `Aria Chen: "Clear technological asymmetry. The proprietary dataset creates an authentic barrier against copycats."`;
      } else {
        status = "Strong";
        feedback = `David Sullivan: "Channel cooperative distribution is the correct operational wedge. Eliminates direct enterprise CAC drag."`;
      }

      setRoundCritiques((prev) => ({
        ...prev,
        [activeRound]: {
          answer: founderAnswer,
          feedback,
          status,
        },
      }));

      setIsSubmitting(false);
      setFounderAnswer("");

      if (activeRound < QUESTIONS.length - 1) {
        setActiveRound(activeRound + 1);
      } else {
        setSimulationComplete(true);
      }
    }, 600);
  };

  const handleRestart = () => {
    setActiveRound(0);
    setFounderAnswer("");
    setRoundCritiques({});
    setSimulationComplete(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] text-[#131311] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Venture Status Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
          <div>
            <Link
              href="/pitch"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6C6C6A] hover:text-[#131311] transition-colors mb-2 uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Pitch Parameters</span>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="font-extrabold text-2xl sm:text-3xl text-[#131311] tracking-tight">
                {pitch.name}
              </h1>
              <span className="bg-[#131311] text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                {pitch.category}
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-6 text-xs font-bold">
            <div>
              <span className="text-[#6C6C6A] block text-[10px] uppercase">CAPITAL ASK</span>
              <span className="text-[#131311] font-extrabold text-sm">{pitch.fundingAsk}</span>
            </div>
            <div>
              <span className="text-[#6C6C6A] block text-[10px] uppercase">POST-MONEY</span>
              <span className="text-[#131311] font-extrabold text-sm">{pitch.valuation}</span>
            </div>
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg border-[1.5px] border-[#131311] bg-white text-[#131311] hover:bg-zinc-100 transition-colors shadow-[2px_2px_0px_#131311]"
              title="Restart Cross-Examination"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Rounds Progress Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUESTIONS.map((q, idx) => {
            const isDone = roundCritiques[idx] !== undefined;
            const isCurrent = activeRound === idx && !simulationComplete;

            return (
              <div
                key={q.investorId}
                className={`p-3.5 rounded-xl border-[1.5px] transition-all text-xs ${
                  isCurrent
                    ? "border-[#131311] bg-[#DE7356] text-[#131311] font-bold shadow-[2px_2px_0px_#131311]"
                    : isDone
                    ? "border-[#131311] bg-[#F3F2EA] text-[#131311]"
                    : "border-zinc-300 bg-white text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1 font-bold">
                  <span>ROUND 0{idx + 1}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#131311]" />}
                </div>
                <div className="font-extrabold truncate">{q.investorName}</div>
                <div className="text-[10px] text-[#131311]/70 truncate mt-0.5">{q.factor}</div>
              </div>
            );
          })}
        </div>

        {/* Cross-Examination Interaction Pod */}
        {!simulationComplete ? (
          <div className="rounded-[20px] border-[1.5px] border-[#131311] bg-white p-6 sm:p-10 space-y-8 shadow-[4px_4px_0px_#131311]">
            {/* Investor Speaking Box */}
            <div className="p-6 rounded-xl border-[1.5px] border-[#131311] bg-[#131311] text-white space-y-4 shadow-[3px_3px_0px_#000]">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DE7356]" />
                  <span className="text-white font-bold">{currentQ.investorName}</span>
                  <span>({currentQ.archetype})</span>
                </div>
                <span>{currentQ.firm}</span>
              </div>

              <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                EVALUATION FACTOR : <strong className="text-[#DE7356]">{currentQ.factor}</strong>
              </div>

              <blockquote className="font-extrabold text-xl sm:text-2xl text-white leading-snug">
                &ldquo;{currentQ.question}&rdquo;
              </blockquote>
            </div>

            {/* Deliberation Record To Date */}
            {Object.keys(roundCritiques).length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#6C6C6A] uppercase tracking-wider block">
                  Deliberation Record To Date:
                </span>
                {Object.entries(roundCritiques).map(([roundIdx, item]) => {
                  const q = QUESTIONS[Number(roundIdx)];
                  return (
                    <div
                      key={roundIdx}
                      className="p-4 rounded-xl border-[1.5px] border-[#131311] bg-[#F3F2EA] text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[#6C6C6A] font-bold">
                        <span className="text-[#131311] font-extrabold">{q.investorName} ({q.factor})</span>
                        <span className="bg-[#DE7356] text-[#131311] px-2 py-0.5 rounded text-[10px]">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[#131311] text-xs font-medium italic">
                        &ldquo;{item.feedback}&rdquo;
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Founder Answer Form */}
            <form onSubmit={handleAnswerSubmit} className="space-y-4 pt-4 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <label className="text-xs text-[#131311] uppercase font-extrabold flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Your Defense (Round {activeRound + 1} of 4):</span>
                </label>

                <button
                  type="button"
                  onClick={handleUseSample}
                  className="text-xs font-bold text-[#6C6C6A] hover:text-[#131311] flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#DE7356]" />
                  <span>Insert Sample Defense</span>
                </button>
              </div>

              <textarea
                rows={4}
                required
                value={founderAnswer}
                onChange={(e) => setFounderAnswer(e.target.value)}
                placeholder="Defend your venture metrics, unit economics, or market strategy directly..."
                className="w-full p-4 rounded-xl bg-[#FAF8F5] border-[1.5px] border-[#131311] text-[#131311] text-sm font-semibold leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !founderAnswer.trim()}
                  className="btn-projectone-accent px-8 py-3.5 text-xs sm:text-sm font-extrabold disabled:opacity-50"
                >
                  <span>{isSubmitting ? "INVESTOR EVALUATING..." : "SUBMIT DEFENSE TO PARTNER"}</span>
                  <span className="btn-arrow-box">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Simulation Complete */
          <div className="rounded-[24px] border-[1.5px] border-[#131311] bg-white p-8 sm:p-12 space-y-8 shadow-[4px_4px_0px_#131311]">
            <div className="text-center space-y-3 pb-8 border-b border-zinc-200">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131311] text-white text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#DE7356]" />
                <span>CROSS-EXAMINATION COMPLETE</span>
              </div>
              <h2 className="font-extrabold text-4xl sm:text-5xl text-[#131311] tracking-tight">
                Syndicate Deliberation Verdict
              </h2>
              <p className="text-sm sm:text-base text-[#6C6C6A] max-w-xl mx-auto">
                All four partners have analyzed your defenses against their core criteria.
              </p>
            </div>

            {/* Score & Consensus Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#131311] text-white text-center shadow-[3px_3px_0px_#000]">
              <div>
                <span className="text-zinc-400 text-xs block mb-1">SYNDICATE CONSENSUS</span>
                <span className="text-white font-extrabold text-3xl">82 / 100</span>
              </div>
              <div>
                <span className="text-zinc-400 text-xs block mb-1">PARTNER VOTE</span>
                <span className="text-[#DE7356] font-extrabold text-3xl">3 - 1 IN FAVOR</span>
              </div>
              <div>
                <span className="text-zinc-400 text-xs block mb-1">SYNDICATE VERDICT</span>
                <span className="text-white font-extrabold text-lg">CONDITIONAL TERM SHEET</span>
              </div>
            </div>

            {/* Partner Critiques Summary */}
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-[#131311] uppercase tracking-wider block">
                Partner Individual Critiques &amp; Analysis:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS.map((q, idx) => {
                  const item = roundCritiques[idx];
                  return (
                    <div
                      key={q.investorId}
                      className="p-5 rounded-xl border-[1.5px] border-[#131311] bg-[#F3F2EA] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-[#131311]">{q.investorName}</span>
                        <span className="text-[#6C6C6A] font-bold">{q.factor}</span>
                      </div>
                      <p className="text-xs text-[#131311] leading-relaxed italic font-medium">
                        {item ? item.feedback : "Verified during deliberation."}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Action Remediation Points */}
            <div className="p-6 rounded-xl border-[1.5px] border-[#131311] bg-[#FAF8F5] space-y-3 text-xs">
              <span className="text-[#131311] font-extrabold uppercase tracking-wider block">
                Priority Diligence Action Items:
              </span>
              <div className="flex items-start gap-2.5 text-[#131311] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#DE7356] mt-1 shrink-0" />
                <span>Prepare audited field technician cost breakdown for Marcus Vance prior to term sheet execution.</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#131311] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#DE7356] mt-1 shrink-0" />
                <span>Provide raw cohort retention curves and customer net dollar retention telemetry for Dr. Elena Rostova.</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#131311] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#DE7356] mt-1 shrink-0" />
                <span>Formalize channel distribution exclusivity contracts with agricultural cooperatives for David Sullivan.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3.5 rounded-full border-[1.5px] border-[#131311] text-xs font-bold hover:bg-zinc-100 flex items-center gap-2 justify-center w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>PRACTICE ROUNDS AGAIN</span>
              </button>

              <Link
                href="/report"
                className="btn-projectone-accent px-8 py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>VIEW COMPLETE SYNDICATE REPORT</span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
