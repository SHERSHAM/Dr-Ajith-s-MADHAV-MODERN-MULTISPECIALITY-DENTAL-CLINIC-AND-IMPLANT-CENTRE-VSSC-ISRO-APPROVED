"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import FloatingParticles from "@/components/animations/FloatingParticles";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <FloatingParticles count={25} />
      
      {/* Back to Login */}
      <Link href="/login" className="absolute top-6 left-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium z-10">
        <ArrowLeft size={16} /> Back to Login
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl font-bold font-heading">M</span>
        </div>

        <h1 className="text-3xl font-bold font-heading mb-2">New Password</h1>
        <p className="text-white/60 text-sm mb-8">Enter your new secure password</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="text-left space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">New Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-teal-400 font-medium text-sm">
              ✓ Password Reset Successfully!
            </div>
            <Link href="/login" className="inline-flex items-center gap-2 btn-primary w-full py-3.5 text-sm font-semibold">
              Return to Login
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
