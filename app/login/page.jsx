"use client";
import React from "react";
import { supabase } from "../../lib/supabase";

const page = () => {
  const handleGoogleLogin = async () => {
    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : "http://localhost:3000/auth/callback";

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute top-[40%] left-[60%] w-64 h-64 bg-pink-500 rounded-full opacity-10 blur-3xl" />

      {/* Glass Card */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-12 py-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl w-full max-w-md">
        {/* Logo / Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 shadow-inner">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Smart Bookmarks
          </h1>
          <p className="text-sm text-white/40">
            Save and organize your links, beautifully.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="group flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-white/10 cursor-pointer"
        >
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.27 9.76A7.08 7.08 0 0 1 19.07 12c0 .68-.06 1.34-.18 1.98H12v-3.73h7.44A7.1 7.1 0 0 0 5.27 9.76z"
            />
            <path
              fill="#34A853"
              d="M12 19.08a7.07 7.07 0 0 1-6.01-3.37l-3.1 2.4A11.94 11.94 0 0 0 12 24c3.24 0 5.95-1.17 7.94-3.1l-3.17-2.46A7.07 7.07 0 0 1 12 19.08z"
            />
            <path
              fill="#4A90D9"
              d="M4.99 12c0-.69.1-1.36.28-2l-3.1-2.4A11.95 11.95 0 0 0 0 12c0 1.93.46 3.76 1.28 5.38l3.1-2.4A7.05 7.05 0 0 1 4.99 12z"
            />
            <path
              fill="#FBBC05"
              d="M12 4.92c1.76 0 3.35.65 4.6 1.7l3.04-3.04A11.94 11.94 0 0 0 12 0 11.94 11.94 0 0 0 2.9 6.6l3.1 2.4A7.07 7.07 0 0 1 12 4.92z"
            />
          </svg>
          Continue with Google
          <svg
            className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Footer note */}
        <p className="text-xs text-white/25 text-center">
          By continuing, you agree to our{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/50 transition-colors">
            Terms
          </span>{" "}
          &{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/50 transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
