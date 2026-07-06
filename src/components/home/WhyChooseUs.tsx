"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import {
  Shield,
  Zap,
  Heart,
  Award,
  Users,
  Microscope,
  Clock,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "Advanced Technology",
    description: "State-of-the-art equipment including 3D CBCT, digital X-rays, dental lasers, and CAD/CAM systems.",
    color: "from-primary-500 to-primary-600",
    bg: "bg-primary-50",
  },
  {
    icon: Shield,
    title: "Sterilization Protocols",
    description: "International-grade sterilization with autoclave validation, ensuring 100% infection control.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Heart,
    title: "Patient-First Care",
    description: "Personalized treatment plans with gentle, compassionate care tailored to your unique needs.",
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Award,
    title: "Expert Specialists",
    description: "Highly qualified specialists with advanced training from premier institutions across India.",
    color: "from-accent-500 to-accent-600",
    bg: "bg-accent-50",
  },
  {
    icon: Zap,
    title: "Painless Procedures",
    description: "Advanced anesthesia techniques and laser dentistry for virtually pain-free dental treatments.",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description: "Extended clinic hours, emergency services, and same-day appointments for your convenience.",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-200/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Why Madhav Dental
          </span>
          <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Why Patients <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="section-subheading mx-auto">
            From advanced technology to compassionate care, discover what makes
            us the preferred choice for dental care in Thiruvananthapuram.
          </p>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="group p-7 rounded-2xl border border-neutral-100 hover:border-primary-100 bg-white hover:shadow-premium transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    size={24}
                    className={`bg-gradient-to-br ${feature.color} bg-clip-text`}
                    style={{ color: "var(--color-primary-600)" }}
                  />
                </div>
                <h3 className="text-lg font-bold text-primary-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {feature.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
