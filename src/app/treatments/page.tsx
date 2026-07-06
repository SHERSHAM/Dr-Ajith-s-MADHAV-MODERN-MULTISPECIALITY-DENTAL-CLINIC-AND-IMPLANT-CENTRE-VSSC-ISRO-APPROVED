"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/data/treatments";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const treatmentIcons: Record<string, string> = {
  "dental-implants": "🦷", "root-canal": "🔬", braces: "😁", "clear-aligners": "✨",
  "cosmetic-dentistry": "💎", "smile-design": "😊", "teeth-whitening": "🌟",
  "scaling-polishing": "🛡️", crowns: "👑", bridges: "🌉", dentures: "🦷",
  "kids-dentistry": "👶", "oral-surgery": "⚕️", "wisdom-tooth": "⚡",
  "laser-dentistry": "🔴", "preventive-dentistry": "❤️", "emergency-dental": "🚨",
};

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...TREATMENT_CATEGORIES];
  const filtered = activeCategory === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Comprehensive <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Dental Treatments</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              From preventive care to advanced cosmetic procedures, we offer 17+ specialized
              treatments under one roof with the latest technology.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Category Filter */}
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06} key={activeCategory}>
            {filtered.map((treatment) => (
              <StaggerItem key={treatment.id}>
                <Link href={`/treatments/${treatment.slug}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group bg-white rounded-2xl p-7 border border-neutral-100 hover:border-primary-100 hover:shadow-premium transition-all duration-300 h-full"
                  >
                    <div className="text-4xl mb-4">{treatmentIcons[treatment.id] || "🦷"}</div>
                    <div className="inline-block px-2.5 py-1 rounded-full bg-primary-50 text-xs font-medium text-primary-600 mb-3">
                      {treatment.category}
                    </div>
                    <h3 className="font-bold text-primary-950 text-xl mb-2 group-hover:text-primary-600 transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {treatment.name}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">{treatment.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-teal-600">{treatment.price}</span>
                      <span className="text-xs text-neutral-400">{treatment.duration}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-primary-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
