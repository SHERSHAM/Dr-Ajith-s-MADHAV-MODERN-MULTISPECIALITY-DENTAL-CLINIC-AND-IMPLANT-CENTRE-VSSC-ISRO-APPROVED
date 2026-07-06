"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { CLINIC } from "@/data/clinic";

export default function AppointmentCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />

      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
        <ScrollReveal>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-6">
              Start Your Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Your Perfect Smile Is{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>
                Just One Click Away
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Book your appointment today and take the first step toward a
              healthier, more beautiful smile. Our expert team is ready to
              welcome you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full font-semibold text-base hover:bg-neutral-100 transition-all hover:scale-105 shadow-xl"
              >
                <Calendar size={18} />
                Book Appointment
                <ArrowRight size={16} />
              </Link>
              <a
                href={`tel:${CLINIC.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 transition-all"
              >
                <Phone size={18} />
                Call: {CLINIC.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
