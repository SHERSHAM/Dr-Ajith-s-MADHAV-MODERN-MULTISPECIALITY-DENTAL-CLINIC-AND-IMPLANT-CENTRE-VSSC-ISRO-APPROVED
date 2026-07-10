"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { DOCTORS } from "@/data/doctors";
import { ArrowRight, Star } from "lucide-react";

export default function FeaturedDoctors() {
  const featured = DOCTORS.slice(0, 4);

  return (
    <section className="section-padding bg-neutral-50/50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Expert Team
          </span>
          <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Meet Our <span className="gradient-text">Specialists</span>
          </h2>
          <p className="section-subheading mx-auto">
            Our team of highly qualified dental specialists brings years of
            expertise and a passion for creating beautiful, healthy smiles.
          </p>
        </ScrollReveal>

        <StaggerReveal className="row gy-4" staggerDelay={0.1}>
          {featured.map((doctor) => (
            <StaggerItem key={doctor.id} className="col-12 col-md-6 col-lg-3">
              <Link href={`/doctors/${doctor.slug}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group card-premium p-1 h-full"
                >
                  {/* Photo area */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 to-teal-50 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
                        <span className="text-3xl">👨‍⚕️</span>
                      </div>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium flex items-center gap-1">
                        View Profile <ArrowRight size={14} />
                      </span>
                    </div>
                    {/* Founder badge */}
                    {doctor.isFounder && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold shadow-lg">
                        ★ Founder
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-5">
                    <h3 className="font-bold text-primary-950 text-lg mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 text-sm font-medium mb-2">
                      {doctor.title}
                    </p>
                    <p className="text-neutral-400 text-xs mb-3">
                      {doctor.qualification}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500 font-medium">
                        {doctor.experience}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="text-accent-400 fill-accent-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ScrollReveal delay={0.4} className="text-center mt-12">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
          >
            View All Doctors
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
