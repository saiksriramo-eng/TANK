"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function EntryLandingPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Minimal sleek preloader: TANK with smooth #DE7356 progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 350);
          return 100;
        }
        return prev + 5;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  const slideUp = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <>
      {/* Loading Page Before Landing Page */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 select-none"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center"
              >
                <span className="font-extrabold text-4xl sm:text-5xl tracking-tight text-[#131311]">
                  TANK
                </span>
              </motion.div>

              {/* Progress bar in signature #DE7356 */}
              <div className="w-52 sm:w-64 h-[3px] bg-[#E5E3DC] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#DE7356]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main ProjectOne Landing Page Viewport */}
      <div className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden bg-[#FAF8F5]">
        {/* Circular soft background backdrop */}
        <div 
          className="absolute w-[650px] sm:w-[850px] lg:w-[1100px] aspect-square rounded-full pointer-events-none -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, #EAE8DE 0%, #FAF8F5 70%)"
          }}
        />

        {/* Floating Polaroid Cards on Left and Right (ProjectOne Signature) */}
        {/* Top Left Card - Elena Rostova */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -12 }}
          animate={!isLoading ? { opacity: 1, x: 0, rotate: -7 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hidden md:flex absolute top-16 left-6 lg:left-16 xl:left-24 card-sticker-polaroid w-44 lg:w-52 flex-col z-10"
        >
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
          <span className="text-xs font-bold text-[#131311] mt-2.5">Elena Rostova</span>
        </motion.div>

        {/* Bottom Left Card - Winston Vance */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -4 }}
          animate={!isLoading ? { opacity: 1, x: 0, rotate: -3 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden md:flex absolute bottom-12 left-10 lg:left-28 xl:left-36 card-sticker-polaroid w-48 lg:w-56 flex-col z-10"
        >
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
          <span className="text-xs font-bold text-[#131311] mt-2.5">Winston Vance</span>
        </motion.div>

        {/* Top Right Card - Marcus Sterling */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 12 }}
          animate={!isLoading ? { opacity: 1, x: 0, rotate: 8 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex absolute top-12 right-6 lg:right-16 xl:right-24 card-sticker-polaroid w-44 lg:w-52 flex-col z-10"
        >
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
          <span className="text-xs font-bold text-[#131311] mt-2.5">Marcus Sterling</span>
        </motion.div>

        {/* Bottom Right Card - Sarah Lin + Handwritten Annotation */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 6 }}
          animate={!isLoading ? { opacity: 1, x: 0, rotate: 5 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex absolute bottom-14 right-10 lg:right-24 xl:right-32 card-sticker-polaroid w-48 lg:w-56 flex-col z-10"
        >
          {/* Handwritten Annotation & Arrow */}
          <div className="absolute -top-16 -left-28 flex flex-col items-end pointer-events-none">
            <span className="font-handwriting text-xl sm:text-2xl text-[#131311] rotate-[-8deg] font-bold whitespace-nowrap">
              Who wouldn&apos;t want<br />a stress-test like this?!
            </span>
            <svg className="w-12 h-10 text-[#131311] -mt-1 mr-4 rotate-12" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M 5 5 Q 30 15 38 32 M 38 32 L 30 26 M 38 32 L 44 24" strokeLinecap="round" strokeLinejoin="round"/>
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
          <span className="text-xs font-bold text-[#131311] mt-2.5">Sarah Lin</span>
        </motion.div>

        {/* Center Hero Column */}
        <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8 my-auto">
          {/* Subheading / Tag */}
          <motion.span
            initial={slideUp.initial}
            animate={!isLoading ? slideUp.animate : {}}
            transition={{ ...slideUp.transition, delay: 0.1 }}
            className="text-xs sm:text-sm font-extrabold text-[#131311] tracking-[0.16em] uppercase"
          >
            ONE PITCH. FOUR INVESTORS. ZERO BULLSHIT.
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={slideUp.initial}
            animate={!isLoading ? slideUp.animate : {}}
            transition={{ ...slideUp.transition, delay: 0.15 }}
            className="font-extrabold text-5xl sm:text-7xl lg:text-[5.5rem] tracking-tight text-[#131311] leading-[0.95]"
          >
            Your Pitch,<br />
            Handled.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={slideUp.initial}
            animate={!isLoading ? slideUp.animate : {}}
            transition={{ ...slideUp.transition, delay: 0.22 }}
            className="text-base sm:text-lg text-[#6C6C6A] max-w-lg leading-relaxed font-medium"
          >
            A relentless, real-world investor simulation. No soft feedback. No polite passes. No hassles, and no more stepping into partner meetings hoping for the best.
          </motion.p>

          {/* Main Enter TANK Button */}
          <motion.div
            initial={slideUp.initial}
            animate={!isLoading ? slideUp.animate : {}}
            transition={{ ...slideUp.transition, delay: 0.3 }}
            className="pt-2 flex flex-col items-center gap-3"
          >
            <Link
              href="/auth"
              className="btn-projectone-accent px-8 py-3.5 text-sm sm:text-base group"
            >
              <span className="font-extrabold tracking-wider">ENTER TANK</span>
              <span className="btn-arrow-box">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
