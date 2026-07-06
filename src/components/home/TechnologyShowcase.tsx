"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight, Wifi, Cpu, Scan, Zap, Monitor, Microscope } from "lucide-react";

const technologies = [
  {
    icon: Scan,
    name: "3D CBCT Scanner",
    description: "Advanced 3D imaging for precise diagnosis and treatment planning.",
  },
  {
    icon: Zap,
    name: "Dental Laser",
    description: "Minimally invasive laser treatments for faster healing.",
  },
  {
    icon: Monitor,
    name: "Digital X-Ray",
    description: "90% less radiation with instant, high-resolution imaging.",
  },
  {
    icon: Microscope,
    name: "Dental Microscope",
    description: "Magnified precision for complex endodontic procedures.",
  },
  {
    icon: Cpu,
    name: "CAD/CAM System",
    description: "Computer-aided design for same-day crowns and restorations.",
  },
  {
    icon: Wifi,
    name: "Intraoral Scanner",
    description: "Digital impressions for comfortable, accurate results.",
  },
];

export default function TechnologyShowcase() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {technologies.slice(0, 4).map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`p-6 rounded-2xl border border-neutral-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300 ${
                      i === 0 ? "bg-primary-50/50" : i === 1 ? "bg-teal-50/50 mt-8" : i === 2 ? "bg-accent-50/50" : "bg-violet-50/50 mt-8"
                    }`}
                  >
                    <tech.icon size={28} className="text-primary-600 mb-3" />
                    <h4 className="font-bold text-primary-950 text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {tech.name}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
              Advanced Technology
            </span>
            <h2 className="section-heading text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Powered by{" "}
              <span className="gradient-text">Latest Technology</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-6">
              We invest in the most advanced dental technology to provide
              accurate diagnoses, minimally invasive treatments, and superior
              results. Our commitment to innovation ensures you receive
              world-class care at every visit.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8">
              From 3D imaging and dental lasers to computer-aided design
              systems, our technology enables precise, comfortable, and faster
              treatments with predictable outcomes.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-medium text-neutral-600"
                >
                  <tech.icon size={12} />
                  {tech.name}
                </span>
              ))}
            </div>

            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              Explore Our Technology
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
