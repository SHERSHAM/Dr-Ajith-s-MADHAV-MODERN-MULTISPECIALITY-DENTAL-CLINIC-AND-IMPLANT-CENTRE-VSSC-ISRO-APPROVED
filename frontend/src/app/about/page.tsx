"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { CLINIC } from "@/data/clinic";
import {
  Heart, Eye, Target, Shield, Award, Microscope,
  Users, Star, CheckCircle2, Sparkles
} from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every patient is treated with genuine care and empathy." },
  { icon: Target, title: "Excellence", desc: "We strive for perfection in every procedure and interaction." },
  { icon: Shield, title: "Integrity", desc: "Honest, transparent communication and ethical practices." },
  { icon: Sparkles, title: "Innovation", desc: "Embracing the latest technology and techniques in dentistry." },
  { icon: Users, title: "Teamwork", desc: "A collaborative team working together for your best outcome." },
  { icon: Star, title: "Trust", desc: "Building lasting relationships based on trust and reliability." },
];

const timeline = [
  { year: "2012", title: "Foundation", desc: "Dr. Ajith Madhav established the clinic with a vision for advanced dental care." },
  { year: "2015", title: "Expansion", desc: "Added multi-speciality services and advanced treatment rooms." },
  { year: "2018", title: "VSSC Approved", desc: "Received prestigious VSSC • ISRO approval for excellence in dental care." },
  { year: "2020", title: "Technology Upgrade", desc: "Introduced 3D CBCT, dental lasers, and CAD/CAM systems." },
  { year: "2023", title: "15,000+ Patients", desc: "Crossed the milestone of 15,000 happy patients served." },
  { year: "2025", title: "Digital Transformation", desc: "Launched digital patient portal and tele-dentistry services." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Our Story of{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>
                Transforming Smiles
              </span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed">
              Founded by Dr. Ajith Madhav with a vision to bring world-class dental care
              to Kerala, Madhav Modern Multi Speciality Dental Clinic has been setting
              new standards in dentistry for over 14 years.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="row align-items-center gy-5">
            <div className="col-12 col-lg-6">
              <ScrollReveal>
                <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">Our Journey</span>
                <h2 className="section-heading text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                  A Legacy of <span className="gradient-text">Dental Excellence</span>
                </h2>
                <p className="text-neutral-500 text-lg leading-relaxed mb-6">
                  What began as a small dental practice in 2012 has grown into one of
                  Thiruvananthapuram&apos;s most trusted and advanced multi-speciality dental
                  clinics. Dr. Ajith Madhav&apos;s relentless pursuit of excellence and
                  innovation has been the driving force behind this transformation.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  Today, we house a team of highly specialized dentists, the latest
                  dental technology, and a warm, welcoming environment where every
                  patient feels valued. Our VSSC • ISRO approval stands as a testament
                  to our commitment to quality and safety.
                </p>
                <div className="row g-3">
                  {[
                    { value: 14, suffix: "+", label: "Years" },
                    { value: 15000, suffix: "+", label: "Patients" },
                    { value: 25000, suffix: "+", label: "Procedures" },
                  ].map((stat, i) => (
                    <div key={i} className="col-4">
                      <div className="text-center p-4 rounded-xl bg-primary-50/50 h-full">
                        <div className="text-2xl font-bold text-primary-900" style={{ fontFamily: "var(--font-heading)" }}>
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="col-12 col-lg-6">
              <ScrollReveal direction="right">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white shadow-premium flex items-center justify-center">
                      <span className="text-5xl">🏥</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Our Clinic</h3>
                    <p className="text-neutral-500 text-sm">Modern, comfortable, world-class</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="row gy-4">
            <ScrollReveal className="col-12 col-md-6">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-premium h-full">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Our Vision</h3>
                <p className="text-neutral-500 leading-relaxed">
                  To be the most trusted and innovative dental care provider in India,
                  setting global standards in clinical excellence, patient experience,
                  and digital healthcare delivery, making world-class dentistry
                  accessible to every individual.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="col-12 col-md-6">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-neutral-100 shadow-premium h-full">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mb-6">
                  <Target size={28} className="text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Our Mission</h3>
                <p className="text-neutral-500 leading-relaxed">
                  To deliver personalized, technology-driven dental care with
                  compassion and integrity. We aim to transform dental experiences
                  by combining cutting-edge technology with evidence-based treatments
                  and a patient-first philosophy.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">Core Values</span>
            <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Values That <span className="gradient-text">Guide Us</span>
            </h2>
          </ScrollReveal>

          <StaggerReveal className="row gy-4" staggerDelay={0.08}>
            {values.map((value, i) => (
              <StaggerItem key={i} className="col-12 col-md-6 col-lg-4">
                <motion.div whileHover={{ y: -4 }} className="p-7 rounded-2xl border border-neutral-100 hover:border-primary-100 hover:shadow-lg transition-all h-full">
                  <value.icon size={24} className="text-primary-600 mb-4" />
                  <h4 className="font-bold text-primary-950 text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>{value.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-neutral-50/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">Milestones</span>
            <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary-100" />
            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-premium border border-neutral-100 ml-16 md:ml-0">
                      <span className="text-sm font-bold text-teal-600">{item.year}</span>
                      <h4 className="font-bold text-primary-950 text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h4>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-md z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ISRO Badge */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary-50 to-teal-50 border border-primary-100">
              <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-white shadow-premium flex items-center justify-center">
                <Award size={36} className="text-primary-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  VSSC • ISRO Approved
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  We are proud to be an ISRO VSSC approved dental care provider,
                  a recognition of our unwavering commitment to quality, safety,
                  and clinical excellence. This prestigious approval reflects our
                  adherence to the highest standards of dental care.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
