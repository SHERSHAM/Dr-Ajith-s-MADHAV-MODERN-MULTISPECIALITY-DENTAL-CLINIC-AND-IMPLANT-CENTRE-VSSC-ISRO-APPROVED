"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { TREATMENTS } from "@/data/treatments";
import { ArrowRight } from "lucide-react";

const treatmentIcons: Record<string, string> = {
  "dental-implants": "🦷",
  "root-canal": "🔬",
  braces: "😁",
  "clear-aligners": "✨",
  "cosmetic-dentistry": "💎",
  "smile-design": "😊",
  "teeth-whitening": "🌟",
  "scaling-polishing": "🛡️",
  crowns: "👑",
  bridges: "🌉",
  dentures: "🦷",
  "kids-dentistry": "👶",
  "oral-surgery": "⚕️",
  "wisdom-tooth": "⚡",
  "laser-dentistry": "🔴",
  "preventive-dentistry": "❤️",
  "emergency-dental": "🚨",
};

export default function TreatmentsOverview() {
  const featured = TREATMENTS.slice(0, 8);

  return (
    <section className="section-padding bg-neutral-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Our Services
          </span>
          <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Comprehensive{" "}
            <span className="gradient-text">Dental Treatments</span>
          </h2>
          <p className="section-subheading mx-auto">
            From preventive care to advanced cosmetic procedures, we offer a
            complete range of dental treatments under one roof.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerDelay={0.06}
        >
          {featured.map((treatment) => (
            <StaggerItem key={treatment.id}>
              <Link href={`/treatments/${treatment.slug}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-100 hover:shadow-premium transition-all duration-300 h-full"
                >
                  <div className="text-4xl mb-4">
                    {treatmentIcons[treatment.id] || "🦷"}
                  </div>
                  <h3 className="font-bold text-primary-950 mb-2 group-hover:text-primary-600 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                    {treatment.name}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {treatment.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                      {treatment.price}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.4} className="text-center mt-12">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 btn-primary"
          >
            View All Treatments
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
