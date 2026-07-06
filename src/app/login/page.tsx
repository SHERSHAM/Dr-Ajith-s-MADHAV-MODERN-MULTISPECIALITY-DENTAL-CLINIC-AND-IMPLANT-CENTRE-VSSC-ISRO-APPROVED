"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Phone, ShieldCheck } from "lucide-react";
import FloatingParticles from "@/components/animations/FloatingParticles";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({ email: "", password: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login flow
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/portal/dashboard";
    }, 1500);
  };

  const handleSendOtp = () => {
    if (!formData.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <FloatingParticles count={25} />
      
      {/* Back to Home */}
      <Link href="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium z-10">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center"
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl font-bold font-heading">M</span>
        </div>

        <h1 className="text-3xl font-bold font-heading mb-2">Welcome Back</h1>
        <p className="text-white/60 text-xs mb-8">Access Dr Ajith’s MADHAV MODERN MULTISPECIALITY DENTAL CLINIC Patient Portal</p>

        {/* Tab Selector */}
        <div className="flex gap-2 p-1 rounded-full bg-white/5 border border-white/10 mb-6">
          <button
            onClick={() => { setLoginMethod("email"); setOtpSent(false); }}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              loginMethod === "email" ? "bg-white text-primary-950 shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
              loginMethod === "phone" ? "bg-white text-primary-950 shadow-md" : "text-white/60 hover:text-white"
            }`}
          >
            Phone OTP
          </button>
        </div>

        <form onSubmit={handleSubmit} className="text-left space-y-5">
          {loginMethod === "email" ? (
            <>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-white/60">Password</label>
                  <Link href="/forgot-password" className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
                    Forgot Password?
                  </Link>
                </div>
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
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {otpSent && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Enter OTP</label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="XXXXXX"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm tracking-[0.25em] text-center font-bold transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}

          {loginMethod === "phone" && !otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || !formData.phone}
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 bg-white text-primary-950 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          )}
        </form>

        <p className="mt-8 text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Register Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
