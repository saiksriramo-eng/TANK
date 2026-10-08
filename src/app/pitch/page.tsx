"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

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

const PRESETS: PitchData[] = [
  {
    name: "OmniHarvest",
    category: "AgTech Robotics",
    tagline: "Autonomous micro-drone pollination for commercial orchards facing pollinator deficits.",
    problem: "Commercial bee colony collapses create urgent yield deficits across almond and fruit acreage, costing growers millions.",
    solution: "Sub-ounce autonomous micro-drones applying electrostatic pollen dispersal with computer vision targeting.",
    marketSize: "$18.4B Specialty Crop Pollination",
    fundingAsk: "$2,500,000",
    valuation: "$20,800,000 Post-Money",
  },
  {
    name: "NeuroScribe",
    category: "Clinical Software",
    tagline: "Ambient clinical documentation infrastructure producing structured EHR encounter notes.",
    problem: "Physicians spend over two hours on administrative electronic health record entry for every hour of patient care.",
    solution: "On-premise acoustic capture pipeline integrated with medical ontologies to generate compliant billing notes directly into hospital records.",
    marketSize: "$28.0B Enterprise Clinical Software",
    fundingAsk: "$3,000,000",
    valuation: "$30,000,000 Post-Money",
  },
  {
    name: "ZeroLag Logistics",
    category: "Maritime Operations",
    tagline: "Predictive maritime bottleneck routing reducing container demurrage and fuel expenses.",
    problem: "Port terminal congestion and canal choke-points cause unpredictable multi-day shipping delays and costly demurrage penalties.",
    solution: "Satellite vessel tracking integrated with hydrodynamic voyage models to forecast port congestion 14 days in advance and reroute vessels.",
    marketSize: "$42.0B Maritime Freight Optimization",
    fundingAsk: "$1,800,000",
    valuation: "$12,000,000 Post-Money",
  },
];

export default function PitchInputPage() {
  const router = useRouter();
  const [form, setForm] = useState<PitchData>(PRESETS[0]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSelectPreset = (preset: PitchData) => {
    setForm(preset);
    setStatusMessage(`Loaded: ${preset.name}`);
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleInputChange = (field: keyof PitchData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("tank_active_pitch", JSON.stringify(form));
    }
    router.push("/arena");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] text-[#131311] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8 pb-6 border-b border-zinc-200">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6C6C6A] hover:text-[#131311] transition-colors mb-4 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>


          <h1 className="font-extrabold text-4xl sm:text-5xl text-[#131311] tracking-tight">
            Pitch Your Idea
          </h1>

          <p className="text-sm sm:text-base text-[#6C6C6A] mt-2 max-w-2xl leading-relaxed font-medium">
            Enter your startup parameters below or select a reference profile. This forms the foundation of the 4 investor personas in the Arena.
          </p>
        </div>

        {/* Quick Presets Strip */}
        <div className="mb-8 p-6 bg-[#F3F2EA] rounded-[16px] border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-extrabold text-[#131311] uppercase tracking-wider">
              Quick Reference Presets:
            </span>
            {statusMessage && (
              <span className="text-[#DE7356] font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {statusMessage}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-3.5 text-left rounded-xl border-[1.5px] transition-all text-xs ${form.name === preset.name
                    ? "border-[#131311] bg-[#DE7356] text-[#131311] font-bold shadow-[2px_2px_0px_#131311]"
                    : "border-zinc-300 bg-white text-[#131311] hover:border-[#131311]"
                  }`}
              >
                <span className="font-extrabold block text-sm">{preset.name}</span>
                <span className="text-[11px] text-[#131311]/70 block mt-0.5">
                  {preset.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pitch Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 sm:p-10 bg-white rounded-[20px] border-[1.5px] border-[#131311] shadow-[4px_4px_0px_#131311] space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
                Company / Startup Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Apex Dynamics"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
                Industry / Category
              </label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="e.g. Enterprise AI Infrastructure"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
              One-Sentence Value Proposition
            </label>
            <input
              type="text"
              required
              value={form.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              placeholder="e.g. Autonomous orchestration for high-volume logistics warehouses."
              className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
              Customer Problem &amp; Urgency
            </label>
            <textarea
              rows={3}
              required
              value={form.problem}
              onChange={(e) => handleInputChange("problem", e.target.value)}
              placeholder="What urgent bottleneck causes immediate financial pain for your customers?"
              className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
              Your Solution &amp; Defensible Moats
            </label>
            <textarea
              rows={3}
              required
              value={form.solution}
              onChange={(e) => handleInputChange("solution", e.target.value)}
              placeholder="What is your proprietary technology or unique wedge that competitors cannot easily copy?"
              className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
                Target Market (TAM)
              </label>
              <input
                type="text"
                required
                value={form.marketSize}
                onChange={(e) => handleInputChange("marketSize", e.target.value)}
                placeholder="e.g. $14.5B"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
                Capital Ask ($)
              </label>
              <input
                type="text"
                required
                value={form.fundingAsk}
                onChange={(e) => handleInputChange("fundingAsk", e.target.value)}
                placeholder="e.g. $2,000,000"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#131311] uppercase tracking-wider mb-2">
                Proposed Post-Money ($)
              </label>
              <input
                type="text"
                required
                value={form.valuation}
                onChange={(e) => handleInputChange("valuation", e.target.value)}
                placeholder="e.g. $18,000,000"
                className="w-full px-4 py-3 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-sm font-semibold text-[#131311] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-[#6C6C6A] uppercase tracking-wider">
              Clicking below initiates Round 1 in the Arena
            </span>

            <button
              type="submit"
              className="btn-projectone-accent px-8 py-3.5 text-xs sm:text-sm w-full sm:w-auto"
            >
              <span>ENTER THE INVESTORS ARENA</span>
              <span className="btn-arrow-box">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
