"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, ArrowRight, Check, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);

  useEffect(() => {
    // Check if error query parameters were passed from OAuth callback
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      const errDesc = params.get("error_description");
      if (errDesc) {
        setErrorMessage(decodeURIComponent(errDesc.replace(/\+/g, " ")));
      } else if (err) {
        setErrorMessage(decodeURIComponent(err.replace(/\+/g, " ")));
      }
    }

    // Check if Supabase keys are configured
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const hasKeys =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder") &&
      Boolean(key) &&
      !key?.includes("placeholder");

    setIsConfigured(hasKeys);

    // If user is already logged in, redirect to home
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push("/home");
      }
    });
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!isConfigured) {
      setErrorMessage(
        "Supabase credentials not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file."
      );
      setLoading(false);
      return;
    }

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          router.push("/home");
          router.refresh();
        }
      } else {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          setErrorMessage(error.message);
        } else if (data.session) {
          router.push("/home");
          router.refresh();
        } else {
          setSuccessMessage(
            "Account created! Please check your email inbox to confirm your registration."
          );
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google") => {
    if (!isConfigured) {
      setErrorMessage(
        "Supabase credentials not configured yet. Please set NEXT_PUBLIC_SUPABASE_URL in .env.local."
      );
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#FAF8F5] text-[#131311] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        {/* Return Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6C6C6A] hover:text-[#131311] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Landing</span>
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-[24px] border-[1.5px] border-[#131311] p-8 sm:p-10 shadow-[4px_4px_0px_#131311]">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <span className="font-extrabold text-3xl tracking-tight text-[#131311]">
              TANK
            </span>
            <p className="text-xs sm:text-sm text-[#6C6C6A] font-medium mt-1">
              {mode === "signin"
                ? "Enter your credentials to access the simulator"
                : "Create an account to start stress-testing your startup"}
            </p>
          </div>

          {/* Mode Switcher Pills */}
          <div className="grid grid-cols-2 p-1 bg-[#F3F2EA] border-[1.5px] border-[#131311] rounded-full mb-8">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all ${
                mode === "signin"
                  ? "bg-[#131311] text-white shadow-[1px_1px_0px_#000]"
                  : "text-[#6C6C6A] hover:text-[#131311]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-extrabold uppercase tracking-wider rounded-full transition-all ${
                mode === "signup"
                  ? "bg-[#131311] text-white shadow-[1px_1px_0px_#000]"
                  : "text-[#6C6C6A] hover:text-[#131311]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Configuration Banner if missing keys */}
          {!isConfigured && (
            <div className="mb-6 p-4 rounded-xl border-[1.5px] border-[#DE7356] bg-[#DE7356]/10 text-xs text-[#131311] space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-[#131311]">
                <AlertCircle className="w-4 h-4 text-[#DE7356]" />
                <span>Supabase Setup Required</span>
              </div>
              <p className="text-[11px] text-[#6C6C6A] leading-relaxed">
                Add your Supabase project URL and anon key to{" "}
                <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-mono text-[10px]">
                  .env.local
                </code>{" "}
                to enable live database authentication.
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl border border-red-300 bg-red-50 text-red-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl px-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@startup.com"
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl pl-10 pr-4 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
                <Mail className="w-4 h-4 text-[#6C6C6A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#131311] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  minLength={6}
                  className="w-full bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl pl-10 pr-10 py-3 text-sm font-semibold text-[#131311] placeholder-[#6C6C6A] focus:outline-none focus:ring-2 focus:ring-[#DE7356]"
                />
                <Lock className="w-4 h-4 text-[#6C6C6A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6C6C6A] hover:text-[#131311]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-projectone-accent justify-center py-3.5 text-xs sm:text-sm disabled:opacity-50"
              >
                <span>
                  {loading
                    ? "PROCESSING..."
                    : mode === "signin"
                    ? "SIGN IN TO TANK"
                    : "CREATE TANK ACCOUNT"}
                </span>
                <span className="btn-arrow-box">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-white px-3 text-[#6C6C6A]">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleOAuthSignIn("google")}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FAF8F5] border-[1.5px] border-[#131311] rounded-xl text-xs font-bold hover:bg-[#F3F2EA] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
