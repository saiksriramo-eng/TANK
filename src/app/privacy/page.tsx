import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy : TANK",
  description: "Privacy policy and data governance practices for TANK platform.",
};

export default function PrivacyPage() {
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
            <span>(LEGAL) GOVERNANCE & DATA DISCIPLINE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-mono-tag text-xs text-zinc-500 mt-2">
            Effective Date: October 8, 2026 / Version 1.0.0
          </p>
        </div>

        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed font-editorial">
          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (1) OVERVIEW
            </h2>
            <p className="text-zinc-400">
              TANK provides software simulations for founders rehearsing venture capital presentations. This document outlines how company information, pitch materials, and session telemetry are collected, processed, and safeguarded.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (2) DATA COLLECTED
            </h2>
            <p className="text-zinc-400">
              During platform operation, the following categories of data may be processed:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400 font-mono-tag text-xs">
              <li>
                <strong className="text-white font-semibold">Pitch Dossiers:</strong> Company names, problem statements, product architectures, market sizing, and financial targets entered by users.
              </li>
              <li>
                <strong className="text-white font-semibold">Simulation Records:</strong> Questions generated, founder responses, session timestamps, and evaluation logs.
              </li>
              <li>
                <strong className="text-white font-semibold">Technical Data:</strong> Browser user agent, IP address, and standard application error logs.
              </li>
            </ul>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (3) PURPOSES OF PROCESSING
            </h2>
            <p className="text-zinc-400">
              Data collected is utilized solely to provide, operate, and enhance the rehearsal simulation. We do not sell pitch data, distribute proprietary founder decks to third parties, or monetize venture metrics without explicit authorization.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (4) DATA RETENTION & SECURITY
            </h2>
            <p className="text-zinc-400">
              Session state within this initial build is managed locally in your browser session. Rehearsal data may be purged at any time by clearing local browser storage or restarting the session. We apply industry-standard transport security across all communication endpoints.
            </p>
          </section>

          <section className="space-y-3 p-6 border border-white/10 bg-[#0c0c0c]">
            <h2 className="font-mono-tag text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              (5) CONTACT & INQUIRIES
            </h2>
            <p className="text-zinc-400">
              For questions regarding privacy practices, contact governance at governance@thetank.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
