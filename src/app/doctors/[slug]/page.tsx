"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { DOCTORS } from "@/data/doctors";
import { Calendar, Clock, Languages, Award, ArrowLeft, Star, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export default function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) return notFound();

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/doctors" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Doctors
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              {doctor.name}
            </h1>
            <p className="text-teal-400 text-xl font-medium">{doctor.title}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white -mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-premium overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                    <span className="text-6xl">👨‍⚕️</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3"><Clock size={16} className="text-primary-500" /><span className="text-sm"><strong>Experience:</strong> {doctor.experience}</span></div>
                  <div className="flex items-center gap-3"><Calendar size={16} className="text-primary-500" /><span className="text-sm"><strong>Timings:</strong> {doctor.timings}</span></div>
                  <div className="flex items-center gap-3"><Languages size={16} className="text-primary-500" /><span className="text-sm"><strong>Languages:</strong> {doctor.languages.join(", ")}</span></div>
                  <div className="flex items-center gap-3"><Award size={16} className="text-primary-500" /><span className="text-sm"><strong>Qualification:</strong> {doctor.qualification}</span></div>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={16} className="text-accent-400 fill-accent-400" />))}
                    <span className="text-sm text-neutral-500 ml-2">5.0</span>
                  </div>
                  <Link href="/book-appointment" className="block w-full text-center btn-primary mt-4">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>About {doctor.name}</h2>
                <p className="text-neutral-600 leading-relaxed mb-8 text-lg">{doctor.bio}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h3 className="text-xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Areas of Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {doctor.expertise.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/50">
                      <CheckCircle2 size={18} className="text-teal-500" />
                      <span className="text-sm font-medium text-primary-900">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <h3 className="text-xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Specialization</h3>
                <p className="text-neutral-600 leading-relaxed">{doctor.specialization}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
