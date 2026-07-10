"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, User, Mail, Lock, Phone } from "lucide-react";
import FloatingParticles from "@/components/animations/FloatingParticles";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      window.location.href = "/portal/dashboard";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
        className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white text-center my-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-3xl font-bold font-heading">M</span>
        </div>

        <h1 className="text-3xl font-bold font-heading mb-2">Create Account</h1>
        <p className="text-white/60 text-sm mb-8">Register as a patient to access the portal</p>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs text-center font-medium leading-relaxed mb-4">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-xl border border-white/10 focus:border-white/30 outline-none text-sm transition-all"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Password</label>
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
            className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:shadow-xl hover:shadow-teal-400/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-6"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-8 text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Login Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
