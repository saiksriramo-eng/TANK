import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions : TANK",
  description: "Terms and conditions of use for TANK pitch simulation software.",
};

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 pb-6 border-b border-white/10">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-xs font-mono-tag text-zinc-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>(INDEX) RETURN TO HOME</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs font-mono-tag text-zinc-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 bg-white" />
            <span>(LEGAL) STATUTORY OPERATIONAL TERMS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="font-mono-tag text-xs text-zinc-500 mt-2">
            Effective Date: October 8, 2026 / Version 1.0.0
          </p>
        </div>

        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed font-editorial">
          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (1) ACCEPTANCE OF TERMS
            </h2>
            <p className="text-zinc-400">
              By accessing or using TANK application, you agree to be bound by these Terms and Conditions. If you do not agree with any provision, discontinue use of the platform immediately.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (2) PLATFORM DESCRIPTION
            </h2>
            <p className="text-zinc-400">
              TANK provides software simulations designed to help startup operators rehearse pitching concepts. Platform outputs, mock term sheets, partner feedback, and scorecards are simulated training artifacts generated for rehearsal purposes only.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (3) DISCLAIMER OF FINANCIAL AND INVESTMENT ADVICE
            </h2>
            <p className="text-zinc-400">
              TANK is not a registered broker-dealer, venture capital firm, investment advisor, or legal counsel. No content within the application constitutes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400 font-mono-tag text-xs">
              <li>An offer to invest, purchase, or underwrite equity securities.</li>
              <li>Formal investment, tax, accounting, or legal advice.</li>
              <li>A guarantee of future fundraising performance or institutional venture interest.</li>
            </ul>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (4) INTELLECTUAL PROPERTY
            </h2>
            <p className="text-zinc-400">
              Founders retain full ownership and intellectual property rights over the business concepts, proprietary metrics, and trade secrets entered into the simulation. The platform codebase, investor persona models, scoring heuristics, and interface designs remain the sole property of TANK.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (5) LIMITATION OF LIABILITY
            </h2>
            <p className="text-zinc-400">
              Under no circumstances shall TANK or its developers be held liable for any direct, indirect, incidental, or consequential damages resulting from real-world fundraising decisions, negotiations, or investment outcomes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
