"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { Sparkles, Shield, Wind, Monitor, Coffee, Car, Baby, Accessibility } from "lucide-react";

const facilities = [
  { icon: Sparkles, title: "Modern Treatment Rooms", desc: "5 fully equipped, ergonomic treatment rooms with the latest dental chairs, ceiling-mounted entertainment screens, and ambient lighting for maximum patient comfort.", emoji: "🏥" },
  { icon: Shield, title: "Advanced Sterilization Center", desc: "Dedicated sterilization area with Class B autoclaves, ultrasonic cleaners, and validated protocols ensuring 100% infection control and patient safety.", emoji: "🧼" },
  { icon: Monitor, title: "Digital Imaging Suite", desc: "Complete digital imaging center with 3D CBCT, panoramic X-ray, and intraoral cameras for comprehensive diagnostic capabilities.", emoji: "📸" },
  { icon: Coffee, title: "Patient Lounge", desc: "Comfortable waiting area with complimentary beverages, Wi-Fi, reading materials, and a calming ambiance to ensure a relaxing visit.", emoji: "☕" },
  { icon: Baby, title: "Kids Zone", desc: "Dedicated child-friendly area with colorful decor, toys, cartoon screens, and a play corner to make dental visits fun for little ones.", emoji: "🧸" },
  { icon: Wind, title: "Climate-Controlled Environment", desc: "Centrally air-conditioned facility with HEPA filtration systems maintaining optimal air quality and temperature throughout.", emoji: "❄️" },
  { icon: Car, title: "Convenient Parking", desc: "Ample parking space available near the clinic for hassle-free visits. Wheelchair-accessible entrance and parking spots.", emoji: "🅿️" },
  { icon: Accessibility, title: "Accessibility", desc: "Wheelchair-accessible entrance, ramps, accessible restrooms, and priority assistance for patients with special needs.", emoji: "♿" },
];

export default function FacilitiesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Facilities</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              World-Class <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Facilities</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Experience dental care in a modern, comfortable, and safe environment designed for your well-being.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
            {facilities.map((f, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -4 }} className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-premium transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-3xl">
                      {f.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
