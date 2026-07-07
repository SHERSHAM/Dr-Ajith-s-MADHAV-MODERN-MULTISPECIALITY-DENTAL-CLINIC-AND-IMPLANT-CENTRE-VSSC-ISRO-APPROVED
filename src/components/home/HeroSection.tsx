"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Shield, Award, Clock } from "lucide-react";
import FloatingParticles from "@/components/animations/FloatingParticles";
import RippleButton from "@/components/animations/RippleButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Particles */}
      <FloatingParticles count={40} />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-400/10 rounded-full blur-[80px] animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-fluid relative z-10 py-24 md:py-32" style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: 'clamp(1rem, 3vw, 3rem)', paddingRight: 'clamp(1rem, 3vw, 3rem)' }}>
        <div className="row align-items-center gy-5">
          {/* Content */}
          <div className="col-12 col-lg-7 pe-lg-5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8"
            >
              <Shield size={14} className="text-teal-400" />
              <span>VSSC • ISRO Approved</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Where{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad 0%, #50e0c5 100%)" }}>
                  Smiles
                </span>
              </span>
              <br />
              Meet{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #d4a012 100%)" }}>
                Excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              Experience premium dental care at Thiruvananthapuram&apos;s most
              advanced multi-speciality clinic. Cutting-edge technology,
              compassionate experts, stunning results.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <RippleButton href="/book-appointment" size="lg">
                Book Appointment
                <ArrowRight size={18} />
              </RippleButton>

              <RippleButton variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30">
                <Play size={16} />
                Virtual Tour
              </RippleButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { icon: Award, label: "14+ Years", sub: "Experience" },
                { icon: Shield, label: "15,000+", sub: "Happy Patients" },
                { icon: Clock, label: "Same Day", sub: "Appointments" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={18} className="text-teal-400" />
                  </div>
                  <div>
                    <span className="block text-white font-bold text-sm">
                      {label}
                    </span>
                    <span className="block text-white/40 text-xs">{sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="col-12 col-lg-5 d-none d-lg-flex justify-content-end relative"
          >
            <div className="relative w-full aspect-square max-w-sm xl:max-w-lg ml-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/5 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-white/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
              <div className="absolute inset-16 rounded-full border border-teal-400/20 animate-spin-slow" style={{ animationDuration: "25s" }} />

              {/* Central card */}
              <div className="absolute inset-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-8 shadow-2xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-primary-500 flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-4xl">🦷</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  Premium Dental Care
                </h3>
                <p className="text-white/50 text-sm text-center">
                  Advanced multi-speciality treatments with world-class expertise
                </p>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -left-4 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <span className="text-teal-400 text-xs font-semibold">✓ Painless Treatments</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 -right-4 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <span className="text-accent-400 text-xs font-semibold">⭐ 4.9 Google Rating</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 left-8 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
              >
                <span className="text-white/80 text-xs font-semibold">🏥 Latest Technology</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
