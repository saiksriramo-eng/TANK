"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  Copy,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeAiModal, setActiveAiModal] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [checklist, setChecklist] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: true,
    3: false,
    4: false,
    5: true,
    6: false,
    7: false,
  });

  const toggleChecklist = (index: number) => {
    setChecklist((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const checklistItems = [
    "Fix margin calculations & justify customer acquisition cost",
    "QA the entire deck & defensibility thesis prior to partner meeting",
    "Answer why gross margin is below 70% under scale",
    "Prove PMF without cherry-picked user testimonials",
    "Survive the dreaded 'Why hasn't Big Tech copied this?'",
    "Quantify 18-month cash runway under 0% growth scenario",
    "Validate total addressable market with bottom-up math",
    "Eliminate fuzzy sales pipeline projections",
  ];

  const faqs = [
    {
      q: "How does TANK simulate real VC partner meetings?",
      a: "TANK deploys four specialized autonomous AI partner personas trained on actual venture capital diligence frameworks, investment memos, and partner debate patterns. Each partner analyzes your pitch from a unique perspective—unit economics, category moat, product retention, and operational scalability—pushing aggressively on your weakest assumptions.",
    },
    {
      q: "Are the investors actually hard on founders?",
      a: "Yes. TANK does not give soft participation trophies or polite passes. The investors simulate the intense psychological reality of a Tier-1 Sand Hill Road partner meeting. They will challenge hand-wavy TAM calculations, probe margin vulnerabilities, and interrogate cohort retention drop-offs.",
    },
    {
      q: "What startup stages is TANK built for?",
      a: "From Pre-Seed founders testing an initial thesis to Series A/B founders preparing to defend multi-million dollar valuations with hard cohort metrics. The simulation scales its scrutiny to your specific stage and business model.",
    },
    {
      q: "Do you keep my deck and startup idea private?",
      a: "100% confidential. Your materials are processed in isolated, ephemeral simulation sandboxes. We never share, sell, train public foundation models, or leak your intellectual property.",
    },
    {
      q: "What is included in the Evaluation Dossier?",
      a: "Immediately following the pitch debate, you receive an unvarnished post-meeting memorandum detailing syndicate consensus, partner vote breakdowns, risk heatmaps across 5 core pillars (Market, Product, Financials, Moat, Team), and a prioritized punch list of fixes.",
    },
    {
      q: "Can I switch between text and voice during the pitch?",
      a: "Yes. You can speak directly to the partners using real-time low-latency voice, or type your responses in text mode. You can toggle between modes seamlessly at any point in the arena.",
    },
    {
      q: "What's the 100% money-back guarantee?",
      a: "If your simulation run does not uncover at least three critical vulnerabilities in your pitch deck that you hadn't considered, let us know within 24 hours for a full, unconditional refund.",
    },
    {
      q: "What if I need to run multiple different startup concepts?",
      a: "With the Founder Pass, you get unlimited simulation runs. You can test multiple variations of your business model, pricing structure, and positioning until your pitch is completely airtight.",
    },
  ];

  const aiPrompts: { [key: string]: { title: string; prompt: string } } = {
    chatgpt: {
      title: "Ask ChatGPT about TANK",
      prompt: "Why should a startup founder use TANK (an AI startup pitching simulator) before presenting to institutional venture capitalists? Compare the benefits of practicing against simulated VC partner scrutiny versus traditional pitch coaching.",
    },
    claude: {
      title: "Ask Claude about TANK",
      prompt: "Analyze how an AI-powered VC simulator like TANK helps founders identify blind spots in unit economics, defensibility, and market sizing before raising capital.",
    },
    perplexity: {
      title: "Ask Perplexity about TANK",
      prompt: "What are the biggest mistakes founders make in VC partner meetings, and how does TANK simulator help prevent them?",
    },
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#131311] overflow-x-hidden font-sans">
      {/* =================================================================== */}
      {/* 1. HERO SECTION (Identical to ProjectOne layout with #DE7356)       */}
      {/* =================================================================== */}
      <section className="relative min-h-[720px] lg:h-[820px] max-h-[900px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
        {/* Circular soft background spotlight */}
        <div
          className="absolute w-[680px] sm:w-[860px] lg:w-[1000px] aspect-square rounded-full pointer-events-none -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, #EAE8DE 0%, #FAF8F5 70%)",
          }}
        />

        {/* Floating Polaroid Cards on Left & Right */}
        {/* Top Left Card - Elena Rostova */}
        <div className="hidden md:flex absolute top-12 left-6 lg:left-12 xl:left-20 card-sticker-polaroid w-44 lg:w-48 flex-col z-10 rotate-[-7deg]">
          <div className="w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#1C1D1A] p-3 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>UNIT ECONOMICS</span>
              <span className="w-2 h-2 rounded-full bg-[#DE7356]"></span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">CAC Payback: 22mo</div>
              <div className="text-[10px] text-[#DE7356]">Burn Multiplier: 2.8x (High)</div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#131311] mt-2">Elena Rostova</span>
        </div>

        {/* Bottom Left Card - Winston Vance */}
        <div className="hidden md:flex absolute bottom-8 left-8 lg:left-16 xl:left-24 card-sticker-polaroid w-48 lg:w-52 flex-col z-10 rotate-[-3deg]">
          <div className="w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#242420] p-3 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>CHURN & COHORT</span>
              <span className="w-2 h-2 rounded-full bg-[#DE7356]"></span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Net Revenue Retention</div>
              <div className="text-[10px] text-zinc-300">92% NRR · Enterprise churn risk</div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#131311] mt-2">Winston Vance</span>
        </div>

        {/* Top Right Card - Marcus Sterling */}
        <div className="hidden md:flex absolute top-10 right-6 lg:right-12 xl:right-20 card-sticker-polaroid w-44 lg:w-48 flex-col z-10 rotate-[8deg]">
          <div className="w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#181816] p-3 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>DEFENSIVE MOAT</span>
              <span className="w-2 h-2 rounded-full bg-[#DE7356]"></span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">TAM Calculation</div>
              <div className="text-[10px] text-[#DE7356]">$1.2B bottom-up vs $40B top-down</div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#131311] mt-2">Marcus Sterling</span>
        </div>

        {/* Bottom Right Card - Sarah Lin + Handwritten Note */}
        <div className="hidden md:flex absolute bottom-8 right-8 lg:right-16 xl:right-24 card-sticker-polaroid w-48 lg:w-52 flex-col z-10 rotate-[5deg]">
          {/* Handwritten Annotation & Arrow */}
          <div className="absolute -top-14 -left-28 flex flex-col items-end pointer-events-none">
            <span className="font-handwriting text-xl text-[#131311] rotate-[-8deg] font-bold whitespace-nowrap">
              Who wouldn&apos;t want<br />a stress-test like this?!
            </span>
            <svg
              className="w-10 h-8 text-[#131311] -mt-1 mr-3 rotate-12"
              viewBox="0 0 50 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M 5 5 Q 30 15 38 32 M 38 32 L 30 26 M 38 32 L 44 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#1F201C] p-3 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>RETENTION HOOK</span>
              <span className="w-2 h-2 rounded-full bg-[#DE7356]"></span>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Daily Active Ratio</div>
              <div className="text-[10px] text-zinc-300">DAU/MAU 18% · Weak habit loop</div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#131311] mt-2">Sarah Lin</span>
        </div>

        {/* Center Hero Column */}
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 my-auto">
          {/* Subheading / Tag */}
          <span className="text-xs sm:text-sm font-extrabold text-[#131311] tracking-[0.16em] uppercase">
            ONE PITCH. FOUR INVESTORS. ZERO BULLSHIT.
          </span>

          {/* Headline */}
          <h1 className="font-extrabold text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight text-[#131311] leading-[0.95]">
            Your Pitch,<br />
            Handled.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#6C6C6A] max-w-lg leading-relaxed font-medium">
            A relentless, real-world investor simulation. No soft feedback. No polite passes. No hassles, and no more stepping into partner meetings hoping for the best.
          </p>

          {/* Action Button */}
          <div className="pt-2 flex flex-col items-center gap-3">
            <Link
              href="/pitch"
              className="btn-projectone-accent px-8 py-3.5 text-sm sm:text-base group"
            >
              <span className="font-extrabold tracking-wider">PITCH YOUR IDEA</span>
              <span className="btn-arrow-box">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. "SOUND FAMILIAR?" SECTION (Checklist & #DE7356 Speech Bubbles)    */}
      {/* =================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative bg-[#131311] text-white rounded-[32px] p-6 sm:p-12 lg:p-16 overflow-hidden shadow-[4px_4px_0px_#000]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left: Interactive Checklist */}
            <div className="lg:col-span-6 space-y-2.5">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => toggleChecklist(index)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${checklist[index]
                    ? "bg-[#1E1F1C] border-zinc-700 text-zinc-300"
                    : "bg-[#161614] border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${checklist[index]
                        ? "bg-[#DE7356] border-[#DE7356] text-[#131311]"
                        : "border-zinc-600 bg-transparent"
                        }`}
                    >
                      {checklist[index] && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{item}</span>
                  </div>
                  <span className="text-zinc-600 text-xs">•••</span>
                </div>
              ))}
            </div>

            {/* Right: Section Header */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-sm font-bold text-zinc-400 tracking-wider">
                Sound Familiar?
              </span>
              <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.05]">
                Your Pitch Shouldn’t Feel Like a Never-Ending Rejection Loop
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Most founders spend 6 months burning warm introductions and getting polite passes because they never had a space to stress-test their numbers against real partner scrutiny.
              </p>
              <div className="pt-2">
                <Link
                  href="/pitch"
                  className="btn-projectone-accent px-6 py-3 text-xs sm:text-sm inline-flex"
                >
                  <span>BREAK THE LOOP</span>
                  <span className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. BENTO GRID ("We Make Stress-Testing Insanely Simple")             */}
      {/* =================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold text-[#131311] tracking-[0.18em] uppercase">
              ONE DECISION AND YOU&apos;RE PREPARED.
            </span>
            <h2 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#131311] leading-[1.05]">
              We Make Stress-Testing Your Startup Insanely Simple.
            </h2>
            <p className="text-sm sm:text-base text-[#6C6C6A] leading-relaxed">
              No months of ghosting. No vague polite rejection emails. One session to expose your blind spots and emerge with total conviction.
            </p>
            <div>
              <Link
                href="/pitch"
                className="btn-projectone-accent px-6 py-3.5 text-xs sm:text-sm inline-flex"
              >
                <span>ENTER THE ARENA</span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: 6 Bento Cards (3x2 grid matching ProjectOne) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: #DE7356 */}
            <div className="card-sticker-accent p-6 flex flex-col justify-between min-h-[170px]">
              <div className="w-6 h-6 rounded-full bg-[#131311] text-white flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-sm text-[#131311] leading-snug mt-6">
                Four distinct AI partner archetypes
              </p>
            </div>

            {/* Card 2: Light Gray */}
            <div className="card-sticker-light p-6 flex flex-col justify-between min-h-[170px]">
              <div className="w-6 h-6 rounded-full bg-[#131311] text-white flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-sm text-[#131311] leading-snug mt-6">
                Real-time dynamic cross-examination
              </p>
            </div>

            {/* Card 3: #DE7356 */}
            <div className="card-sticker-accent p-6 flex flex-col justify-between min-h-[170px]">
              <div className="w-6 h-6 rounded-full bg-[#131311] text-white flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-sm text-[#131311] leading-snug mt-6">
                One unified forensic diligence report
              </p>
            </div>

            {/* Card 4: Light Gray */}
            <div className="card-sticker-light p-6 flex flex-col justify-between min-h-[170px]">
              <div className="w-6 h-6 rounded-full bg-[#131311] text-white flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-sm text-[#131311] leading-snug mt-6">
                Zero equity given, zero politeness
              </p>
            </div>

            {/* Card 5: #DE7356 */}
            <div className="card-sticker-accent p-6 flex flex-col justify-between min-h-[170px]">
              <div className="w-6 h-6 rounded-full bg-[#131311] text-white flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-bold text-sm text-[#131311] leading-snug mt-6">
                One complete simulation session in 15min
              </p>
            </div>

            {/* Card 6: Dark Card with TANK Wordmark */}
            <div className="bg-[#1C1D1A] text-white border-[1.5px] border-[#131311] rounded-[12px] p-6 flex items-center justify-center min-h-[170px] shadow-[4px_4px_0px_#131311]">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                TANK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. PROCESS TIMELINE ("Meet TANK" / 6 Steps Cascading Grid)          */}
      {/* =================================================================== */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold text-[#6C6C6A] tracking-widest uppercase">
            BACKED BY METHODOLOGY TESTED ACROSS 500+ FOUNDER PITCHES
          </span>
          <h2 className="font-extrabold text-4xl sm:text-6xl text-[#131311] flex items-center justify-center gap-3">
            <span>Meet</span>
            <span className="bg-[#DE7356] text-[#131311] px-3.5 py-1 rounded-[12px] border-[1.5px] border-[#131311] shadow-[2px_2px_0px_#131311]">
              TANK
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#6C6C6A] leading-relaxed max-w-2xl mx-auto">
            You pitch it, they tear it down, you rebuild it airtight. Our bulletproof, 6-step simulator gives you total conviction before real venture checks are signed.
          </p>
        </div>

        {/* 5 Process Columns Grid (Cleanly aligned, unified top baseline) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch">
          {/* Column 1: Initial Submission */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#EAEAEA] py-2 px-3 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center text-[#131311] border border-[#131311]/10">
              INITIAL SUBMISSION
            </div>
            <div className="card-sticker-accent p-4 sm:p-5 flex flex-col justify-between flex-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#131311] transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-extrabold text-sm sm:text-base text-[#131311]">Onboarding</span>
                  <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                </div>
                <p className="text-xs text-[#131311] font-medium leading-relaxed">
                  You submit your startup thesis, deck, and unit economics. TANK ingests and flags vulnerabilities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#131311]/20 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#131311]/75">
                <span>Phase 01</span>
                <span>Deck Ingestion</span>
              </div>
            </div>
          </div>

          {/* Column 2: VC Assessment */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#EAEAEA] py-2 px-3 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center text-[#131311] border border-[#131311]/10">
              VC ASSESSMENT
            </div>
            <div className="card-sticker-accent p-4 sm:p-5 flex flex-col justify-between flex-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#131311] transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-extrabold text-sm sm:text-base text-[#131311]">Investor Briefing</span>
                  <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                </div>
                <p className="text-xs text-[#131311] font-medium leading-relaxed">
                  Four AI partner personas analyze your deck and prepare aggressive cross-examination questions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#131311]/20 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#131311]/75">
                <span>Phase 02</span>
                <span>4 VC Personas</span>
              </div>
            </div>
          </div>

          {/* Column 3: Cross Examination */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#EAEAEA] py-2 px-3 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center text-[#131311] border border-[#131311]/10">
              CROSS EXAMINATION
            </div>
            <div className="card-sticker-accent p-4 sm:p-5 flex flex-col justify-between flex-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#131311] transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-extrabold text-sm sm:text-base text-[#131311]">The Hot Seat</span>
                  <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                </div>
                <p className="text-xs text-[#131311] font-medium leading-relaxed">
                  Enter the Arena. 4 partners cross-examine you live on unit economics, defensibility, and burn.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#131311]/20 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#131311]/75">
                <span>Phase 03</span>
                <span>Live Arena</span>
              </div>
            </div>
          </div>

          {/* Column 4: Deliberation & Debate */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#EAEAEA] py-2 px-3 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center text-[#131311] border border-[#131311]/10">
              DELIBERATION & DEBATE
            </div>
            <div className="card-sticker-accent p-4 sm:p-5 flex flex-col justify-between flex-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#131311] transition-all">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-extrabold text-sm sm:text-base text-[#131311]">Partner Debate</span>
                  <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                </div>
                <p className="text-xs text-[#131311] font-medium leading-relaxed">
                  Listen to the investors deliberate behind closed doors on whether your venture deserves a term sheet.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#131311]/20 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#131311]/75">
                <span>Phase 04</span>
                <span>Closed Caucus</span>
              </div>
            </div>
          </div>

          {/* Column 5: Evaluation Dossier (Split Cards 5 & 6) */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#EAEAEA] py-2 px-3 rounded-lg text-[11px] font-extrabold uppercase tracking-wider text-center text-[#131311] border border-[#131311]/10">
              EVALUATION DOSSIER
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
              {/* Card 5: Scorecard */}
              <div className="card-sticker-accent p-3.5 sm:p-4 flex flex-col justify-between flex-1 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#131311] transition-all">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-[#131311]">Scorecard</span>
                    <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      5
                    </span>
                  </div>
                  <p className="text-[11px] text-[#131311] font-medium leading-snug">
                    5-pillar forensic scorecard dissecting Market, Product, Financials, Moat, and Team.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#131311]/20 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-[#131311]/75">
                  <span>Output A</span>
                  <span>5 Pillars</span>
                </div>
              </div>

              {/* Card 6: Term Sheet */}
              <div className="card-sticker-accent p-3.5 sm:p-4 flex flex-col justify-between flex-1 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#131311] transition-all">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-[#131311]">Term Sheet</span>
                    <span className="w-5 h-5 rounded-full bg-[#131311] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      6
                    </span>
                  </div>
                  <p className="text-[11px] text-[#131311] font-medium leading-snug">
                    The final verdict: Simulated valuation offer or brutal breakdown of why they passed.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-[#131311]/20 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-[#131311]/75">
                  <span>Output B</span>
                  <span>Final Verdict</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Banner in signature #DE7356 */}
      <div className="w-full bg-[#DE7356] border-y-[1.5px] border-[#131311] py-3.5 overflow-hidden mt-14">
        <div className="animate-marquee font-extrabold text-sm sm:text-base text-[#131311] uppercase tracking-wider flex items-center">
          <span className="mx-4">• ZERO FLUFF</span>
          <span className="mx-4">• REAL-TIME INTERACTION</span>
          <span className="mx-4">• 4 VC PERSONAS</span>
          <span className="mx-4">• 5-FACTOR SCORECARD</span>
          <span className="mx-4">• AIRTIGHT PITCH</span>
          <span className="mx-4">• 100% UNVARNISHED TRUTH</span>
          <span className="mx-4">• ZERO FLUFF</span>
          <span className="mx-4">• REAL-TIME INTERACTION</span>
          <span className="mx-4">• 4 VC PERSONAS</span>
          <span className="mx-4">• 5-FACTOR SCORECARD</span>
          <span className="mx-4">• AIRTIGHT PITCH</span>
          <span className="mx-4">• 100% UNVARNISHED TRUTH</span>
        </div>
      </div>



      {/* =================================================================== */}
      {/* 6. COMPARISON MATRIX ("The Smarter Way to Prepare for VCs")         */}
      {/* =================================================================== */}
      <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative">
          <span className="text-xs font-extrabold text-[#131311] tracking-[0.18em] uppercase">
            THE SMARTER WAY TO RAISE.
          </span>
          <h2 className="font-extrabold text-4xl sm:text-6xl text-[#131311]">
            The Smarter Way to Get Funded.
          </h2>
          <p className="text-sm sm:text-base text-[#6C6C6A] leading-relaxed max-w-2xl mx-auto">
            Whether you&apos;re comparing pitch coaches, practicing on friends, or stepping into partner meetings cold, TANK removes the delays, uncertainty, and polite lies that kill startups.
          </p>


        </div>

        {/* Comparison Table (Exact ProjectOne layout) */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="py-5 px-4 font-bold text-xs uppercase tracking-wider text-[#6C6C6A]">
                  ATTRIBUTE
                </th>
                <th className="py-5 px-4">
                  <span className="bg-[#DE7356] text-[#131311] font-extrabold text-xs px-3.5 py-1.5 rounded-md uppercase tracking-wider border border-[#131311] shadow-[2px_2px_0px_#131311]">
                    TANK
                  </span>
                </th>
                <th className="py-5 px-4">
                  <span className="bg-[#131311] text-white font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider">
                    VC PARTNER MEETING
                  </span>
                </th>
                <th className="py-5 px-4">
                  <span className="bg-[#131311] text-white font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider">
                    PITCH COACH
                  </span>
                </th>
                <th className="py-5 px-4">
                  <span className="bg-[#131311] text-white font-bold text-xs px-3 py-1.5 rounded-md uppercase tracking-wider">
                    PRACTICE ON FRIENDS
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-xs sm:text-sm font-semibold">
              <tr>
                <td className="py-5 px-4 text-[#6C6C6A] uppercase font-bold">TIMELINE</td>
                <td className="py-5 px-4 font-extrabold text-[#131311] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DE7356]" />
                  <span>Instant On-Demand</span>
                </td>
                <td className="py-5 px-4 text-zinc-600">3-6+ Months waiting for intros</td>
                <td className="py-5 px-4 text-zinc-600">2-4 Weeks scheduling</td>
                <td className="py-5 px-4 text-zinc-600">If You Find The Time</td>
              </tr>
              <tr>
                <td className="py-5 px-4 text-[#6C6C6A] uppercase font-bold">COST &amp; EQUITY</td>
                <td className="py-5 px-4 font-extrabold text-[#131311] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DE7356]" />
                  <span>0% Equity Dilution</span>
                </td>
                <td className="py-5 px-4 text-zinc-600">Costs 20% Equity Dilution</td>
                <td className="py-5 px-4 text-zinc-600">$3,000 - $8,000 Upfront</td>
                <td className="py-5 px-4 text-zinc-600">Free (Costs Your Reputation)</td>
              </tr>
              <tr>
                <td className="py-5 px-4 text-[#6C6C6A] uppercase font-bold">FEEDBACK QUALITY</td>
                <td className="py-5 px-4 font-extrabold text-[#131311] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DE7356]" />
                  <span>100% Unvarnished Truth</span>
                </td>
                <td className="py-5 px-4 text-zinc-600">Polite &ldquo;too early&rdquo; emails</td>
                <td className="py-5 px-4 text-zinc-600">Generic presentation tips</td>
                <td className="py-5 px-4 text-zinc-600">Biased polite nods</td>
              </tr>
              <tr>
                <td className="py-5 px-4 text-[#6C6C6A] uppercase font-bold">EVALUATION DOSSIER</td>
                <td className="py-5 px-4 font-extrabold text-[#131311] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DE7356]" />
                  <span>5-Pillar Forensic Scorecard</span>
                </td>
                <td className="py-5 px-4 text-zinc-600">Rarely any notes provided</td>
                <td className="py-5 px-4 text-zinc-600">Subjective summary</td>
                <td className="py-5 px-4 text-zinc-600">&ldquo;Sounds awesome!&rdquo;</td>
              </tr>
              <tr>
                <td className="py-5 px-4 text-[#6C6C6A] uppercase font-bold">REPEATABILITY</td>
                <td className="py-5 px-4 font-extrabold text-[#131311] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DE7356]" />
                  <span>Unlimited Iterations</span>
                </td>
                <td className="py-5 px-4 text-zinc-600">One chance per firm</td>
                <td className="py-5 px-4 text-zinc-600">Pay per additional hour</td>
                <td className="py-5 px-4 text-zinc-600">Burn friends&apos; goodwill</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. SOCIAL PROOF & STATS GRID ("Why Trust Us with Your Pitch?")     */}
      {/* =================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-baseline mb-14">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold text-[#6C6C6A] tracking-wider uppercase">
              STRESS-TESTING STARTUPS GLOBALLY
            </span>
            <h2 className="font-extrabold text-3xl sm:text-5xl text-[#131311] leading-tight">
              Why Trust TANK Before Your Next Round?
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#6C6C6A] leading-relaxed">
              TANK was created by former founders and syndicate leads because we kept seeing brilliant startups fail in partner meetings over preventable blind spots in unit economics, defensibility, and market math.
            </p>
          </div>
        </div>

        {/* 4x2 Bento Grid with #DE7356 Stat Cards and Visuals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat Card 1 in #DE7356 */}
          <div className="card-sticker-accent p-8 flex flex-col justify-between min-h-[220px]">
            <span className="text-5xl sm:text-6xl font-black text-[#131311]">16x</span>
            <div>
              <h4 className="font-extrabold text-base text-[#131311]">Win Rate Improvement</h4>
              <p className="text-xs text-[#131311]/80 mt-1 font-medium">
                Founders who practice in TANK close institutional checks 16x faster.
              </p>
            </div>
          </div>

          {/* Visual Card 1: Boardroom */}
          <div className="bg-[#1C1D1A] rounded-[12px] border-[1.5px] border-[#131311] p-6 text-white flex flex-col justify-between shadow-[4px_4px_0px_#131311]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>ELENA ROSTOVA</span>
              <span className="text-[#DE7356]">● LIVE</span>
            </div>
            <div className="my-auto py-4">
              <p className="font-mono text-xs text-zinc-300 italic">
                &ldquo;Your payback assumes zero churn in month 6. Walk me through cohort decay.&rdquo;
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              QUANTITATIVE DILIGENCE
            </span>
          </div>

          {/* Stat Card 2 in #DE7356 */}
          <div className="card-sticker-accent p-8 flex flex-col justify-between min-h-[220px]">
            <span className="text-5xl sm:text-6xl font-black text-[#131311]">500+</span>
            <div>
              <h4 className="font-extrabold text-base text-[#131311]">Pitches Simulated</h4>
              <p className="text-xs text-[#131311]/80 mt-1 font-medium">
                From pre-seed deeptech to B2B SaaS growth rounds.
              </p>
            </div>
          </div>

          {/* Visual Card 2: Scorecard Breakdown */}
          <div className="bg-[#1C1D1A] rounded-[12px] border-[1.5px] border-[#131311] p-6 text-white flex flex-col justify-between shadow-[4px_4px_0px_#131311]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>DOSSIER PREVIEW</span>
              <span className="bg-[#DE7356] text-[#131311] font-bold px-1.5 py-0.5 rounded text-[9px]">
                88/100
              </span>
            </div>
            <div className="space-y-2 py-4">
              <div className="flex justify-between text-xs">
                <span>Unit Economics</span>
                <span className="text-[#DE7356]">91%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#DE7356] h-full w-[91%]"></div>
              </div>
              <div className="flex justify-between text-xs">
                <span>Defensible Moat</span>
                <span className="text-white">82%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[82%]"></div>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              5-FACTOR FORENSIC METRICS
            </span>
          </div>

          {/* Visual Card 3 */}
          <div className="bg-[#1C1D1A] rounded-[12px] border-[1.5px] border-[#131311] p-6 text-white flex flex-col justify-between shadow-[4px_4px_0px_#131311]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>MARCUS VANCE</span>
              <span className="text-[#DE7356]">● ACTIVE</span>
            </div>
            <div className="my-auto py-4">
              <p className="font-mono text-xs text-zinc-300 italic">
                &ldquo;If Big Tech launches an equivalent feature next quarter, what prevents customer migration?&rdquo;
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              MOAT & TAM SCRUTINY
            </span>
          </div>

          {/* Stat Card 3 in #DE7356 */}
          <div className="card-sticker-accent p-8 flex flex-col justify-between min-h-[220px]">
            <span className="text-5xl sm:text-6xl font-black text-[#131311]">10k+</span>
            <div>
              <h4 className="font-extrabold text-base text-[#131311]">Hard VC Questions</h4>
              <p className="text-xs text-[#131311]/80 mt-1 font-medium">
                Posed across live simulations to uncover hidden flaws.
              </p>
            </div>
          </div>

          {/* Visual Card 4 */}
          <div className="bg-[#1C1D1A] rounded-[12px] border-[1.5px] border-[#131311] p-6 text-white flex flex-col justify-between shadow-[4px_4px_0px_#131311]">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>DELIBERATION ROOM</span>
              <span className="text-white">CONSENSUS</span>
            </div>
            <div className="my-auto py-3">
              <div className="text-xs font-bold text-[#DE7356]">PARTNER VOTE: 3 YES · 1 NO</div>
              <p className="text-[11px] text-zinc-400 mt-1">
                Term sheet offered at $12M valuation cap with key conditions.
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              CLOSED-DOOR SYNDICATE DEBATE
            </span>
          </div>

          {/* Stat Card 4 in #DE7356 */}
          <div className="card-sticker-accent p-8 flex flex-col justify-between min-h-[220px]">
            <span className="text-5xl sm:text-6xl font-black text-[#131311]">94%</span>
            <div>
              <h4 className="font-extrabold text-base text-[#131311]">Critical Blind Spots</h4>
              <p className="text-xs text-[#131311]/80 mt-1 font-medium">
                Identified and patched before real meetings took place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 8. FAQs ACCORDION ON FULL #DE7356 BACKGROUND (ProjectOne signature) */}
      {/* =================================================================== */}
      <section id="faqs" className="w-full bg-[#DE7356] text-[#131311] py-24 px-4 sm:px-6 lg:px-8 border-y-[1.5px] border-[#131311]">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-[#131311] tracking-[0.18em] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-extrabold text-4xl sm:text-6xl text-[#131311]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion List */}
          <div className="border-t-[1.5px] border-[#131311] divide-y-[1.5px] divide-[#131311]">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left gap-4 font-bold text-base sm:text-xl text-[#131311] focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-[#131311] text-white flex items-center justify-center flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-xs sm:text-sm text-[#131311]/85 leading-relaxed font-semibold pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* "Ask AI Why Us?" Section */}
          <div className="pt-8 space-y-4">
            <h3 className="font-extrabold text-2xl sm:text-3xl text-[#131311]">
              Ask AI Why Us?
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveAiModal("chatgpt")}
                className="inline-flex items-center gap-2 bg-[#131311] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#20201D] active:translate-y-[1px] transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
              >
                <span>Ask ChatGPT</span>
                <span className="text-sm">𖦹</span>
              </button>
              <button
                onClick={() => setActiveAiModal("claude")}
                className="inline-flex items-center gap-2 bg-[#131311] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#20201D] active:translate-y-[1px] transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
              >
                <span>Ask Claude</span>
                <span className="text-sm">✴</span>
              </button>
              <button
                onClick={() => setActiveAiModal("perplexity")}
                className="inline-flex items-center gap-2 bg-[#131311] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#20201D] active:translate-y-[1px] transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
              >
                <span>Ask Perplexity</span>
                <span className="text-sm">𐓷</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 9. GIVING BACK SECTION ("One Pitch, Many Lives Impacted")           */}
      {/* =================================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-extrabold text-[#131311] tracking-[0.18em] uppercase">
              GIVING BACK
            </span>
            <h2 className="font-extrabold text-4xl sm:text-6xl text-[#131311] leading-tight">
              One Pitch, Many Lives Impacted.
            </h2>
            <p className="text-base sm:text-lg text-[#6C6C6A] leading-relaxed">
              For every founder who enters TANK, $10 goes directly to funding underrepresented entrepreneurs in emerging ecosystems through global micro-grants. Real economic mobility because you chose to build.
            </p>
            <div className="pt-2">
              <Link
                href="/pitch"
                className="btn-projectone-accent px-6 py-3.5 text-xs sm:text-sm inline-flex"
              >
                <span>JOIN THE MOVEMENT</span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Photo Collage Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-[16px] overflow-hidden border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311] bg-[#E5E3DC] aspect-[4/3] flex items-center justify-center p-6 text-center">
              <div>
                <span className="text-3xl font-black text-[#131311]">50+</span>
                <p className="text-xs font-bold text-[#131311] mt-1">Micro-Grants Funded</p>
              </div>
            </div>
            <div className="rounded-[16px] overflow-hidden border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311] bg-[#DE7356] aspect-[4/3] flex items-center justify-center p-6 text-center">
              <div>
                <span className="text-3xl font-black text-[#131311]">100%</span>
                <p className="text-xs font-bold text-[#131311] mt-1">Direct Impact Model</p>
              </div>
            </div>
            <div className="rounded-[16px] overflow-hidden border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311] bg-[#131311] text-white aspect-[4/3] flex items-center justify-center p-6 text-center">
              <div>
                <span className="text-3xl font-black text-white">12</span>
                <p className="text-xs font-bold text-zinc-300 mt-1">Emerging Ecosystems</p>
              </div>
            </div>
            <div className="rounded-[16px] overflow-hidden border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311] bg-[#F3F2EA] aspect-[4/3] flex items-center justify-center p-6 text-center">
              <div>
                <span className="text-3xl font-black text-[#131311]">$25k+</span>
                <p className="text-xs font-bold text-[#131311] mt-1">Donated To Date</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 10. CONTACT / QUICK INQUIRY FORM ON #DE7356 CARD                    */}
      {/* =================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="card-sticker-accent p-8 sm:p-12 lg:p-14 shadow-[6px_6px_0px_#131311]">
          <h3 className="font-extrabold text-3xl sm:text-4xl text-[#131311] mb-8">
            Contact Us
          </h3>

          {contactSubmitted ? (
            <div className="bg-[#FAF8F5] p-6 rounded-xl border-[1.5px] border-[#131311] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#DE7356] mx-auto" />
              <h4 className="font-bold text-lg text-[#131311]">Message Received</h4>
              <p className="text-xs text-[#6C6C6A]">
                Our syndicate support team will get back to you within 2 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  required
                  placeholder="Name*"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#131311]"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#131311]"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Got questions about the simulation, investor personas, or what's included? Ask away, no pressure."
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#131311]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="btn-projectone-dark px-8 py-3.5 text-xs sm:text-sm"
                >
                  <span>SUBMIT</span>
                  <span className="btn-arrow-box-white">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#131311]">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>100% Confidentiality &amp; Satisfaction Guarantee</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 11. FOOTER (Exact ProjectOne layout)                                 */}
      {/* =================================================================== */}
      <footer className="mt-20 w-full bg-[#131311] text-white rounded-t-[32px] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-[1.5px] border-[#131311]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-3xl tracking-tight text-white">
                  TANK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
                TANK is built for founders who value unvarnished truth over polite passes. Proudly stress-testing startups worldwide.
              </p>
              <div>
                <Link
                  href="/pitch"
                  className="btn-projectone-accent px-6 py-3 text-xs inline-flex"
                >
                  <span>PITCH YOUR IDEA</span>
                  <span className="btn-arrow-box">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-4 space-y-3 font-bold text-xs uppercase tracking-wider text-zinc-300">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
                NAVIGATION
              </span>
              <a href="#how-it-works" className="block hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#why-us" className="block hover:text-white transition-colors">
                Why Us
              </a>
              <a href="#faqs" className="block hover:text-white transition-colors">
                FAQ&apos;s
              </a>
              <Link href="/privacy" className="block hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>

            {/* Col 3: Design Badges & Socials */}
            <div className="lg:col-span-3 space-y-4">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
                COMMUNITY &amp; AWARDS
              </span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C1D1A] border border-zinc-700 flex items-center justify-center text-xs font-bold">
                  in
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1C1D1A] border border-zinc-700 flex items-center justify-center text-xs font-bold">
                  𝕏
                </div>
              </div>

              {/* Awards Badges */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="border border-zinc-800 rounded-lg p-2 text-center text-[9px] text-zinc-400">
                  <div className="font-bold text-white text-[10px]">CSSDA</div>
                  <span>BEST INNOVATION</span>
                </div>
                <div className="border border-zinc-800 rounded-lg p-2 text-center text-[9px] text-zinc-400">
                  <div className="font-bold text-white text-[10px]">CSSDA</div>
                  <span>BEST UI &amp; UX</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
            <span>© 2026 TANK. All rights reserved.</span>
            <span>Designed for founders entering the arena.</span>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* 12. "ASK AI" INTERACTIVE MODAL POPUP                                */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF8F5] border-[2px] border-[#131311] rounded-[24px] p-6 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_#131311] relative text-[#131311]"
            >
              <button
                onClick={() => setActiveAiModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#131311]" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#DE7356]"></span>
                <h4 className="font-extrabold text-xl text-[#131311]">
                  {aiPrompts[activeAiModal]?.title}
                </h4>
              </div>

              <p className="text-xs text-[#6C6C6A] mb-4">
                Copy this prompt and paste it into your preferred AI model to get an objective analysis of why founders use TANK:
              </p>

              <div className="bg-[#EAEAEA] border-[1.5px] border-[#131311] rounded-xl p-4 text-xs font-mono text-[#131311] leading-relaxed relative">
                {aiPrompts[activeAiModal]?.prompt}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => handleCopyPrompt(aiPrompts[activeAiModal]?.prompt || "")}
                  className="btn-projectone-accent px-5 py-2.5 text-xs flex-1 justify-center"
                >
                  <span>{copiedPrompt ? "COPIED TO CLIPBOARD!" : "COPY PROMPT"}</span>
                  <span className="btn-arrow-box">
                    <Copy className="w-3.5 h-3.5" />
                  </span>
                </button>
                <button
                  onClick={() => setActiveAiModal(null)}
                  className="px-5 py-2.5 rounded-full border-[1.5px] border-[#131311] text-xs font-bold hover:bg-zinc-200 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
