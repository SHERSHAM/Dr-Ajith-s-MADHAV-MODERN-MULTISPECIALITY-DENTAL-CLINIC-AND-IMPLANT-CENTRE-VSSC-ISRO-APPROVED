"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { DOCTORS } from "@/data/doctors";
import { ArrowRight, Star, Calendar, Clock, Languages } from "lucide-react";

export default function DoctorsPage() {
  const founder = DOCTORS.find((d) => d.isFounder);
  const others = DOCTORS.filter((d) => !d.isFounder);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Our Team</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Meet Our <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Expert Doctors</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Our team of highly qualified dental specialists combines expertise,
              compassion, and innovation to deliver the best possible care.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Founder Spotlight */}
      {founder && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100 p-8 md:p-12 lg:p-16">
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-accent-500 text-white text-sm font-semibold shadow-lg">
                  ★ Founder & Chief Dental Surgeon
                </div>
                <div className="row align-items-center gy-5">
                  <div className="col-12 col-lg-6">
                    <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden bg-white shadow-premium">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-teal-100">
                        <div className="w-32 h-32 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                          <span className="text-6xl">👨‍⚕️</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {founder.name}
                    </h2>
                    <p className="text-teal-600 font-semibold text-lg mb-1">{founder.title}</p>
                    <p className="text-neutral-500 text-sm mb-6">{founder.qualification}</p>
                    <p className="text-neutral-600 leading-relaxed mb-6">{founder.bio}</p>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Clock size={16} className="text-primary-500" />
                        <span><strong>Experience:</strong> {founder.experience}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Calendar size={16} className="text-primary-500" />
                        <span><strong>Timings:</strong> {founder.timings}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <Languages size={16} className="text-primary-500" />
                        <span><strong>Languages:</strong> {founder.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-primary-900 mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((item) => (
                          <span key={item} className="px-3 py-1.5 rounded-full bg-white text-xs font-medium text-primary-700 border border-primary-100">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href="/book-appointment" className="inline-flex items-center gap-2 btn-primary">
                      <Calendar size={16} /> Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Other Doctors */}
      <section className="section-padding bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="gradient-text">Specialist Team</span>
            </h2>
            <p className="section-subheading mx-auto">
              Each specialist brings unique expertise to ensure you receive the best possible care.
            </p>
          </ScrollReveal>

          <StaggerReveal className="row gy-4" staggerDelay={0.1}>
            {others.map((doctor) => (
              <StaggerItem key={doctor.id} className="col-12 col-md-6 col-lg-4">
                <motion.div whileHover={{ y: -8 }} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-premium transition-all duration-300 h-full">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                      <span className="text-4xl">👨‍⚕️</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-950 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 text-sm font-semibold mb-1">{doctor.title}</p>
                    <p className="text-neutral-400 text-xs mb-4">{doctor.qualification}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-3">{doctor.bio}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-neutral-500">{doctor.experience}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="text-accent-400 fill-accent-400" />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/doctors/${doctor.slug}`} className="flex-1 text-center py-2.5 rounded-lg border border-primary-200 text-primary-600 text-sm font-semibold hover:bg-primary-50 transition-colors">
                        View Profile
                      </Link>
                      <Link href="/book-appointment" className="flex-1 text-center py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                        Book
                      </Link>
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
