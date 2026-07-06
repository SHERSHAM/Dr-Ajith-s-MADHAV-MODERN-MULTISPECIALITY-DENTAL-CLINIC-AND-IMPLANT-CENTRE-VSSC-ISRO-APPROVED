"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { Scan, Zap, Monitor, Microscope, Cpu, Wifi, Printer, Camera } from "lucide-react";

const technologies = [
  { icon: Scan, name: "3D CBCT Scanner", desc: "Full 3D imaging of your jaw, teeth, and facial structures for precise diagnosis and treatment planning. Provides detailed views impossible with traditional X-rays.", benefits: ["3D visualization", "Implant planning", "Low radiation"] },
  { icon: Zap, name: "Dental Laser", desc: "Advanced diode and Er:YAG lasers for minimally invasive soft and hard tissue treatments. Reduces bleeding, pain, and healing time significantly.", benefits: ["Painless", "Faster healing", "Precise treatment"] },
  { icon: Monitor, name: "Digital X-Ray", desc: "Instant, high-resolution digital radiography with up to 90% less radiation than conventional X-rays. Images are available immediately on screen.", benefits: ["90% less radiation", "Instant results", "High resolution"] },
  { icon: Microscope, name: "Dental Operating Microscope", desc: "High-powered magnification for endodontic and microsurgical procedures. Enables visualization of intricate root canal anatomy for superior outcomes.", benefits: ["25x magnification", "Precision treatment", "Better outcomes"] },
  { icon: Cpu, name: "CAD/CAM System", desc: "Computer-aided design and manufacturing for same-day dental restorations. Custom crowns, bridges, and veneers milled in-house with perfect fit.", benefits: ["Same-day restorations", "Perfect fit", "Digital precision"] },
  { icon: Wifi, name: "Intraoral Scanner", desc: "Digital impression system replacing traditional molds. Comfortable, accurate, and fast digital scans for crowns, bridges, and aligner treatments.", benefits: ["No gag reflex", "Digital accuracy", "Comfortable"] },
  { icon: Printer, name: "3D Printer", desc: "In-house 3D printing for surgical guides, dental models, and temporary restorations. Enables precise implant placement and custom prosthetics.", benefits: ["Surgical guides", "Custom models", "Rapid prototyping"] },
  { icon: Camera, name: "Intraoral Camera", desc: "High-definition intraoral cameras for patient education. See what your dentist sees with detailed images of your teeth and gums on a large screen.", benefits: ["Patient education", "HD imaging", "Documentation"] },
];

export default function TechnologyPage() {
  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Technology</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Advanced <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Dental Technology</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">We invest in the latest technology to provide you with the most accurate, comfortable, and effective treatments.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.1}>
            {technologies.map((tech, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-8 border border-neutral-100 hover:shadow-premium transition-all">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <tech.icon size={28} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{tech.name}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-5">{tech.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.benefits.map((b) => (
                      <span key={b} className="px-3 py-1.5 rounded-full bg-teal-50 text-xs font-medium text-teal-700">{b}</span>
                    ))}
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
