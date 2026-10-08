"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Rocket,
  Users,
  Globe,
  Calendar,
  Briefcase,
  Target,
  DollarSign,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface ProjectData {
  name: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  marketSize: string;
  fundingAsk: string;
  valuation: string;
}

interface CompanyData {
  companyName: string;
  website: string;
  foundedDate: string;
  teamSize: string;
  founderName: string;
  founderRole: string;
}

export default function ArenaIntakePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Auth Guard: Ensure only authenticated users can explore the arena
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth?redirect=/arena");
      }
    });
  }, [router]);

  const [project, setProject] = useState<ProjectData>({
    name: "",
    category: "",
    tagline: "",
    problem: "",
    solution: "",
    marketSize: "",
    fundingAsk: "",
    valuation: "",
  });

  const [company, setCompany] = useState<CompanyData>({
    companyName: "",
    website: "",
    foundedDate: "",
    teamSize: "",
    founderName: "",
    founderRole: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!project.name.trim()) errs.name = "Project name is required";
    if (!project.category.trim()) errs.category = "Category is required";
    if (!project.problem.trim()) errs.problem = "Describe the problem you solve";
    if (!project.solution.trim()) errs.solution = "Describe your solution";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!company.companyName.trim()) errs.companyName = "Company name is required";
    if (!company.founderName.trim()) errs.founderName = "Founder name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setErrors({});
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      // Save intake data to localStorage for the pitch simulation
      const intakeData = {
        ...project,
        ...company,
      };
      localStorage.setItem("tank_active_pitch", JSON.stringify(project));
      localStorage.setItem("tank_company_data", JSON.stringify(company));
      localStorage.setItem("tank_intake_complete", JSON.stringify(intakeData));

      // Navigate to the pitch simulation page
      router.push("/pitch");
    }
  };

  const categories = [
    "SaaS / Software",
    "FinTech",
    "HealthTech / BioTech",
    "EdTech",
    "AgTech",
    "CleanTech / Climate",
    "AI / ML",
    "Consumer / D2C",
    "Marketplace",
    "Hardware / IoT",
    "Web3 / Crypto",
    "Other",
  ];

  const teamSizes = ["Solo Founder", "2-5", "6-15", "16-50", "50+"];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] text-[#131311] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="pb-6 border-b border-zinc-200">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6C6C6A] hover:text-[#131311] transition-colors mb-4 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-[#131311] tracking-tight">
              Enter the Arena
            </h1>
            <span className="bg-[#DE7356] text-[#131311] text-xs font-extrabold px-2.5 py-0.5 rounded-md border border-[#131311]">
              INTAKE
            </span>
          </div>
          <p className="text-sm text-[#6C6C6A] font-medium mt-2 max-w-xl">
            Tell us about your startup. The more detail you provide, the sharper
            the investor scrutiny.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-3.5 rounded-xl border-[1.5px] transition-all text-xs ${
              step === 1
                ? "border-[#131311] bg-[#DE7356] text-[#131311] font-bold shadow-[2px_2px_0px_#131311]"
                : step === 2
                ? "border-[#131311] bg-[#F3F2EA] text-[#131311]"
                : "border-zinc-300 bg-white text-zinc-400"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
              <span>STEP 01</span>
              {step === 2 && (
                <span className="w-4 h-4 rounded-full bg-[#131311] text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
              )}
            </div>
            <div className="font-extrabold flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              Project Details
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border-[1.5px] transition-all text-xs ${
              step === 2
                ? "border-[#131311] bg-[#DE7356] text-[#131311] font-bold shadow-[2px_2px_0px_#131311]"
                : "border-zinc-300 bg-white text-zinc-400"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
              <span>STEP 02</span>
            </div>
            <div className="font-extrabold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Company Info
            </div>
          </div>
        </div>

        {/* Step 1: Project Details Form */}
        {step === 1 && (
          <form
            onSubmit={handleStep1Next}
            className="rounded-[20px] border-[1.5px] border-[#131311] bg-white p-6 sm:p-10 space-y-6 shadow-[4px_4px_0px_#131311]"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-200">
              <Rocket className="w-5 h-5 text-[#DE7356]" />
              <h2 className="font-extrabold text-lg text-[#131311] uppercase tracking-wider">
                Tell Us About Your Project
              </h2>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#DE7356]" />
                  Project / Startup Name *
                </span>
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
                placeholder="e.g. OmniHarvest, Lattice, Notion"
                className={`w-full bg-[#FAF8F5] border-[1.5px] ${
                  errors.name ? "border-red-400" : "border-[#131311]"
                } rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#DE7356]" />
                  Category / Vertical *
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProject({ ...project, category: cat })}
                    className={`py-2.5 px-3 rounded-xl border-[1.5px] text-xs font-bold transition-all ${
                      project.category === cat
                        ? "border-[#131311] bg-[#DE7356] text-[#131311] shadow-[2px_2px_0px_#131311]"
                        : "border-zinc-300 bg-[#FAF8F5] text-[#6C6C6A] hover:border-[#131311] hover:text-[#131311]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.category}
                </p>
              )}
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                One-Line Pitch
              </label>
              <input
                type="text"
                value={project.tagline}
                onChange={(e) =>
                  setProject({ ...project, tagline: e.target.value })
                }
                placeholder="Summarize your startup in one sentence"
                className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            {/* Problem */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#DE7356]" />
                  The Problem You Solve *
                </span>
              </label>
              <textarea
                rows={3}
                value={project.problem}
                onChange={(e) =>
                  setProject({ ...project, problem: e.target.value })
                }
                placeholder="What urgent pain point or gap exists in the market?"
                className={`w-full bg-[#FAF8F5] border-[1.5px] ${
                  errors.problem ? "border-red-400" : "border-[#131311]"
                } rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]`}
              />
              {errors.problem && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.problem}
                </p>
              )}
            </div>

            {/* Solution */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#DE7356]" />
                  Your Solution *
                </span>
              </label>
              <textarea
                rows={3}
                value={project.solution}
                onChange={(e) =>
                  setProject({ ...project, solution: e.target.value })
                }
                placeholder="How does your product or service solve this problem?"
                className={`w-full bg-[#FAF8F5] border-[1.5px] ${
                  errors.solution ? "border-red-400" : "border-[#131311]"
                } rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]`}
              />
              {errors.solution && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.solution}
                </p>
              )}
            </div>

            {/* Market Size & Funding Ask (side by side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#DE7356]" />
                    Total Addressable Market
                  </span>
                </label>
                <input
                  type="text"
                  value={project.marketSize}
                  onChange={(e) =>
                    setProject({ ...project, marketSize: e.target.value })
                  }
                  placeholder="e.g. $18.4B"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#DE7356]" />
                    Capital Ask
                  </span>
                </label>
                <input
                  type="text"
                  value={project.fundingAsk}
                  onChange={(e) =>
                    setProject({ ...project, fundingAsk: e.target.value })
                  }
                  placeholder="e.g. $2,500,000"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
              </div>
            </div>

            {/* Valuation */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#DE7356]" />
                  Target Valuation (Post-Money)
                </span>
              </label>
              <input
                type="text"
                value={project.valuation}
                onChange={(e) =>
                  setProject({ ...project, valuation: e.target.value })
                }
                placeholder="e.g. $20,800,000 Post-Money"
                className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-zinc-200">
              <button
                type="submit"
                className="btn-projectone-accent px-8 py-3.5 text-xs sm:text-sm font-extrabold"
              >
                <span>CONTINUE TO COMPANY INFO</span>
                <span className="btn-arrow-box">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Company Info Form */}
        {step === 2 && (
          <form
            onSubmit={handleStep2Submit}
            className="rounded-[20px] border-[1.5px] border-[#131311] bg-white p-6 sm:p-10 space-y-6 shadow-[4px_4px_0px_#131311]"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-200">
              <Building2 className="w-5 h-5 text-[#DE7356]" />
              <h2 className="font-extrabold text-lg text-[#131311] uppercase tracking-wider">
                About Your Company
              </h2>
            </div>

            {/* Summary of Step 1 data */}
            <div className="p-4 rounded-xl border-[1.5px] border-[#131311] bg-[#F3F2EA] text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#131311]">
                  {project.name}
                </span>
                <span className="bg-[#131311] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  {project.category}
                </span>
              </div>
              {project.tagline && (
                <p className="text-[#6C6C6A] font-medium italic">
                  &ldquo;{project.tagline}&rdquo;
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setErrors({});
                }}
                className="text-[#DE7356] font-bold hover:underline mt-1"
              >
                ← Edit project details
              </button>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#DE7356]" />
                  Company / Legal Entity Name *
                </span>
              </label>
              <input
                type="text"
                value={company.companyName}
                onChange={(e) =>
                  setCompany({ ...company, companyName: e.target.value })
                }
                placeholder="e.g. OmniHarvest Inc."
                className={`w-full bg-[#FAF8F5] border-[1.5px] ${
                  errors.companyName ? "border-red-400" : "border-[#131311]"
                } rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]`}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.companyName}
                </p>
              )}
            </div>

            {/* Founder Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DE7356]" />
                    Founder Name *
                  </span>
                </label>
                <input
                  type="text"
                  value={company.founderName}
                  onChange={(e) =>
                    setCompany({ ...company, founderName: e.target.value })
                  }
                  placeholder="e.g. Alex Chen"
                  className={`w-full bg-[#FAF8F5] border-[1.5px] ${
                    errors.founderName ? "border-red-400" : "border-[#131311]"
                  } rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]`}
                />
                {errors.founderName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errors.founderName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#DE7356]" />
                    Your Role
                  </span>
                </label>
                <input
                  type="text"
                  value={company.founderRole}
                  onChange={(e) =>
                    setCompany({ ...company, founderRole: e.target.value })
                  }
                  placeholder="e.g. CEO & Co-Founder"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#DE7356]" />
                  Website
                </span>
              </label>
              <input
                type="url"
                value={company.website}
                onChange={(e) =>
                  setCompany({ ...company, website: e.target.value })
                }
                placeholder="https://yourcompany.com"
                className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
              />
            </div>

            {/* Founded Date & Team Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#DE7356]" />
                    Founded
                  </span>
                </label>
                <input
                  type="text"
                  value={company.foundedDate}
                  onChange={(e) =>
                    setCompany({ ...company, foundedDate: e.target.value })
                  }
                  placeholder="e.g. March 2024"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DE7356]" />
                    Team Size
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {teamSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setCompany({ ...company, teamSize: size })
                      }
                      className={`py-2 px-3.5 rounded-xl border-[1.5px] text-xs font-bold transition-all ${
                        company.teamSize === size
                          ? "border-[#131311] bg-[#DE7356] text-[#131311] shadow-[2px_2px_0px_#131311]"
                          : "border-zinc-300 bg-[#FAF8F5] text-[#6C6C6A] hover:border-[#131311] hover:text-[#131311]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setErrors({});
                }}
                className="px-6 py-3.5 rounded-full border-[1.5px] border-[#131311] text-xs font-bold hover:bg-zinc-100 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>

              <button
                type="submit"
                className="btn-projectone-accent px-8 py-3.5 text-xs sm:text-sm font-extrabold"
              >
                <span>ENTER THE ARENA</span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
