"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check user auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error:", e);
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("tank_active_pitch");
      localStorage.removeItem("tank_intake_data");
      localStorage.removeItem("tank_company_data");
      localStorage.removeItem("tank_intake_complete");
      localStorage.removeItem("tank_pitch_files");
      window.location.href = "/auth";
    }
  };

  const isLandingPage = pathname === "/";

  // Landing page (/): Centered TANK logo
  if (isLandingPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/80 backdrop-blur-md transition-all py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="w-16" />
            <Link
              href="/"
              className="flex items-center group focus-visible:outline-none"
            >
              <span className="font-extrabold text-2xl tracking-tight text-[#131311]">
                TANK
              </span>
            </Link>
            <div className="w-16 flex justify-end">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="text-xs font-bold text-[#6C6C6A] hover:text-[#131311] uppercase tracking-wider"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="text-xs font-bold text-[#131311] hover:text-[#DE7356] uppercase tracking-wider"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Main Page Navbar: Floating ProjectOne Header Pill
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 ${
        scrolled ? "bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo: TANK */}
        <Link
          href="/"
          className="flex items-center group focus-visible:outline-none"
        >
          <span className="font-extrabold text-2xl tracking-tight text-[#131311]">
            TANK
          </span>
        </Link>

        {/* Floating Dark Nav Pill (ProjectOne signature) */}
        <div className="hidden lg:flex items-center bg-[#131311] text-white rounded-full p-1.5 pl-6 gap-6 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          <nav className="flex items-center gap-6 text-[12px] font-bold uppercase tracking-wider text-zinc-300">
            <Link
              href="/home#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it works
            </Link>

            <Link
              href="/home#why-us"
              className="hover:text-white transition-colors"
            >
              Why Us
            </Link>
            <Link
              href="/home#faqs"
              className="hover:text-white transition-colors"
            >
              FAQs
            </Link>

            {/* Auth Link in Nav Pill */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400"
                title={`Signed in as ${user.email}`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/auth"
                className="hover:text-white text-zinc-300 transition-colors flex items-center gap-1"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>

          {/* Action Button inside Pill in #DE7356 with rounded-full arrow box */}
          <Link
            href="/pitch"
            className="inline-flex items-center gap-2.5 bg-[#DE7356] text-[#131311] font-extrabold text-[12px] uppercase tracking-wider px-4 py-2 rounded-full border border-[#131311] shadow-[2px_2px_0px_#131311] hover:bg-[#e57c60] active:translate-x-[1px] active:translate-y-[1px] transition-all"
          >
            <span>PITCH YOUR IDEA</span>
            <span className="w-5 h-5 bg-[#131311] text-white rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-[11px] font-bold uppercase text-[#6C6C6A] hover:text-[#131311] px-2 py-1"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="text-[11px] font-extrabold uppercase text-[#131311] hover:text-[#DE7356] px-2 py-1"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/pitch"
            className="inline-flex items-center gap-1.5 bg-[#DE7356] text-[#131311] font-extrabold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#131311] shadow-[2px_2px_0px_#131311]"
          >
            <span>PITCH</span>
            <span className="w-4 h-4 bg-[#131311] text-white rounded-full flex items-center justify-center">
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 bg-[#131311] text-white rounded-full focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 bg-[#131311] text-white rounded-2xl border border-zinc-800 shadow-xl space-y-3 font-bold text-xs uppercase tracking-wider">
          <Link
            href="/home#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white border-b border-zinc-800"
          >
            How it works
          </Link>

          <Link
            href="/home#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white border-b border-zinc-800"
          >
            Why Us
          </Link>
          <Link
            href="/home#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-zinc-300 hover:text-white border-b border-zinc-800"
          >
            FAQs
          </Link>

          {user ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleSignOut();
              }}
              className="w-full text-left py-2 text-zinc-300 hover:text-white border-b border-zinc-800"
            >
              Sign Out ({user.email})
            </button>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-zinc-300 hover:text-white border-b border-zinc-800"
            >
              Sign In / Sign Up
            </Link>
          )}

          <div className="pt-2">
            <Link
              href="/pitch"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 bg-[#DE7356] text-[#131311] font-black uppercase rounded-full shadow-[2px_2px_0px_#000]"
            >
              <span>PITCH YOUR IDEA</span>
              <span className="w-5 h-5 bg-[#131311] text-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
