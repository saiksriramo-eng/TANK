"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  FileText,
  FileSpreadsheet,
  File,
  Trash2,
  Paperclip,
  CheckCircle2,
  Sparkles,
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

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  category: "deck" | "financials" | "memo" | "other";
}

const SAMPLE_PITCH: PitchData = {
  name: "OmniHarvest",
  category: "AgTech Robotics",
  tagline: "Autonomous micro-drone pollination for commercial orchards facing pollinator deficits.",
  problem: "Commercial bee colony collapses create urgent yield deficits across almond and fruit acreage, costing growers millions.",
  solution: "Sub-ounce autonomous micro-drones applying electrostatic pollen dispersal with computer vision targeting.",
  marketSize: "$18.4B Specialty Crop Pollination",
  fundingAsk: "$2,500,000",
  valuation: "$20,800,000 Post-Money",
};

export default function PitchInputPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<PitchData>({
    name: "",
    category: "",
    tagline: "",
    problem: "",
    solution: "",
    marketSize: "",
    fundingAsk: "",
    valuation: "",
  });

  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string>("");

  useEffect(() => {
    // Check if intake data already exists in localStorage
    if (typeof window !== "undefined") {
      try {
        const savedPitch = localStorage.getItem("tank_active_pitch");
        if (savedPitch) {
          const parsed = JSON.parse(savedPitch);
          setForm((prev) => ({ ...prev, ...parsed }));
        }

        const savedFiles = localStorage.getItem("tank_pitch_files");
        if (savedFiles) {
          const parsedFiles = JSON.parse(savedFiles);
          if (Array.isArray(parsedFiles)) {
            setFiles(parsedFiles);
          }
        }
      } catch (e) {
        console.error("Error loading saved pitch from localStorage:", e);
      }
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileCategory = (filename: string): AttachedFile["category"] => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf" || ext === "pptx" || ext === "ppt" || ext === "key") return "deck";
    if (ext === "xlsx" || ext === "xls" || ext === "csv") return "financials";
    if (ext === "docx" || ext === "doc" || ext === "txt") return "memo";
    return "other";
  };

  const handleFilesSelected = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const added: AttachedFile[] = Array.from(newFiles).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: formatFileSize(f.size),
      type: f.name.split(".").pop()?.toUpperCase() || "FILE",
      category: getFileCategory(f.name),
    }));

    setFiles((prev) => {
      const updated = [...prev, ...added];
      if (typeof window !== "undefined") {
        localStorage.setItem("tank_pitch_files", JSON.stringify(updated));
      }
      return updated;
    });

    setUploadFeedback(`Attached ${added.length} file(s) for partner ingestion`);
    setTimeout(() => setUploadFeedback(""), 3000);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("tank_pitch_files", JSON.stringify(filtered));
      }
      return filtered;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesSelected(e.dataTransfer.files);
  };

  const handleInputChange = (field: keyof PitchData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadSample = () => {
    setForm(SAMPLE_PITCH);
    setUploadFeedback("Loaded sample startup profile");
    setTimeout(() => setUploadFeedback(""), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("tank_active_pitch", JSON.stringify(form));
      localStorage.setItem("tank_pitch_files", JSON.stringify(files));
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

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-extrabold text-4xl sm:text-5xl text-[#131311] tracking-tight">
                Pitch Your Idea
              </h1>

              <p className="text-sm sm:text-base text-[#6C6C6A] mt-2 max-w-2xl leading-relaxed font-medium">
                Upload your startup files and specify your venture parameters below. This forms the foundation of the 4 investor personas in the Arena.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-[1.5px] border-[#131311] bg-white text-xs font-bold text-[#131311] hover:bg-[#F3F2EA] transition-colors shadow-[2px_2px_0px_#131311] self-start sm:self-auto shrink-0"
              title="Pre-fill with a sample startup to quickly test"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DE7356]" />
              <span>Fill Sample Data</span>
            </button>
          </div>
        </div>

        {/* Startup Materials & File Upload Section */}
        <div className="mb-8 p-6 sm:p-7 bg-[#F3F2EA] rounded-[16px] border-[1.5px] border-[#131311] shadow-[3px_3px_0px_#131311]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#DE7356] border-[1.5px] border-[#131311] flex items-center justify-center text-[#131311]">
                  <Paperclip className="w-3.5 h-3.5" />
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-[#131311] uppercase tracking-wider">
                  Startup Documents &amp; Pitch Materials
                </span>
              </div>
              <p className="text-xs text-[#6C6C6A] mt-1 font-medium">
                Upload your deck, financial model, or memo so the 4 AI partners can analyze your venture.
              </p>
            </div>

            {files.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131311] text-white text-[11px] font-extrabold uppercase tracking-wider self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DE7356]" />
                <span>{files.length} {files.length === 1 ? "File" : "Files"} Attached</span>
              </span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.pptx,.ppt,.xlsx,.xls,.csv,.docx,.doc,.txt"
            onChange={(e) => handleFilesSelected(e.target.files)}
            className="hidden"
          />

          {/* Drag & Drop Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-7 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-[#DE7356] bg-[#DE7356]/10 scale-[1.01]"
                : "border-[#131311]/40 bg-white hover:border-[#DE7356] hover:bg-[#FAF8F5]"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border-[1.5px] border-[#131311] flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#131311] text-[#DE7356]">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="font-extrabold text-sm text-[#131311] mb-1">
              Drag &amp; Drop Pitch Files Here, or{" "}
              <span className="text-[#DE7356] underline decoration-2 underline-offset-2">Browse Files</span>
            </div>
            <p className="text-[11px] text-[#6C6C6A] font-medium">
              Supports Pitch Decks (PDF, PPTX), Financial Models (XLSX, CSV), and Memos (DOCX, PDF) up to 25MB
            </p>
          </div>

          {uploadFeedback && (
            <div className="mt-3 text-xs font-bold text-[#DE7356] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{uploadFeedback}</span>
            </div>
          )}

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-[11px] font-extrabold text-[#6C6C6A] uppercase tracking-wider">
                Attached for Ingestion ({files.length}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-white rounded-xl border-[1.5px] border-[#131311] shadow-[2px_2px_0px_#131311] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#131311] flex items-center justify-center text-[#131311] shrink-0 font-extrabold text-[10px]">
                        {file.type}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-[#131311] truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-[#6C6C6A] font-semibold">
                          {file.size} • <span className="text-emerald-700 font-bold">Ready</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(file.id);
                      }}
                      className="p-1.5 rounded-lg text-[#6C6C6A] hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Slot Suggestions when no files attached */}
          {files.length === 0 && (
            <div className="mt-4 pt-4 border-t border-[#131311]/10">
              <div className="text-[10px] font-extrabold text-[#6C6C6A] uppercase tracking-wider mb-2">
                Recommended Document Slots:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-white/70 hover:bg-white rounded-lg border border-dashed border-[#131311]/30 hover:border-[#131311] text-left transition-colors flex items-center gap-2 text-xs font-bold text-[#131311]"
                >
                  <FileText className="w-4 h-4 text-[#DE7356]" />
                  <div className="truncate">
                    <span className="block text-[11px] font-extrabold">1. Pitch Deck</span>
                    <span className="block text-[9px] text-[#6C6C6A]">PDF or PPTX</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-white/70 hover:bg-white rounded-lg border border-dashed border-[#131311]/30 hover:border-[#131311] text-left transition-colors flex items-center gap-2 text-xs font-bold text-[#131311]"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#DE7356]" />
                  <div className="truncate">
                    <span className="block text-[11px] font-extrabold">2. Financials</span>
                    <span className="block text-[9px] text-[#6C6C6A]">XLSX or CSV</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-white/70 hover:bg-white rounded-lg border border-dashed border-[#131311]/30 hover:border-[#131311] text-left transition-colors flex items-center gap-2 text-xs font-bold text-[#131311]"
                >
                  <File className="w-4 h-4 text-[#DE7356]" />
                  <div className="truncate">
                    <span className="block text-[11px] font-extrabold">3. Exec Summary</span>
                    <span className="block text-[9px] text-[#6C6C6A]">DOCX or PDF</span>
                  </div>
                </button>
              </div>
            </div>
          )}
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
