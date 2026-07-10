"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { CLINIC } from "@/data/clinic";
import { Award, Heart, Microscope, ShieldCheck, Clock, Users } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="row align-items-center gy-5">
          {/* Content */}
          <div className="col-12 col-lg-6">
            <ScrollReveal>
              <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
                Welcome to {CLINIC.shortName}
              </span>
              <h2 className="section-heading text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Redefining Dental Care with{" "}
                <span className="gradient-text">Precision & Compassion</span>
              </h2>
              <p className="text-neutral-500 text-lg leading-relaxed mb-6">
                At Madhav Modern Multi Speciality Dental Clinic, we combine
                cutting-edge technology with personalized care to deliver
                exceptional dental experiences. Founded by Dr. Ajith Madhav,
                our clinic has been transforming smiles across Kerala for over
                14 years.
              </p>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Every aspect of our practice — from our advanced equipment to our
                meticulously sterilized treatment rooms — is designed to ensure
                your comfort, safety, and satisfaction. We believe everyone
                deserves a healthy, confident smile.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="row g-3">
                {[
                  { icon: ShieldCheck, label: "VSSC • ISRO Approved" },
                  { icon: Award, label: "Award Winning Clinic" },
                  { icon: Microscope, label: "Advanced Technology" },
                  { icon: Heart, label: "Patient-First Care" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="col-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50/50 hover:bg-primary-50 transition-colors h-full">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-primary-900">
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Visual */}
          <div className="col-12 col-lg-6">
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary-100 to-teal-50">
                  {/* Placeholder for clinic image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white shadow-premium flex items-center justify-center">
                        <span className="text-5xl">🏥</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        State-of-the-Art Facility
                      </h3>
                      <p className="text-neutral-500 text-sm">
                        Modern treatment rooms with latest dental technology
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-2 lg:-left-6 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl shadow-premium border border-neutral-100/50 dark:border-slate-800/80 p-2.5 md:p-4 lg:p-5">
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <div className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg md:rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <span className="block text-sm md:text-xl lg:text-2xl font-bold text-primary-950 dark:text-white leading-tight">15,000+</span>
                      <span className="text-[9px] md:text-xs text-neutral-400 dark:text-slate-400 font-medium">Happy Patients</span>
                    </div>
                  </div>
                </div>

                {/* Experience badge */}
                <div className="absolute -top-4 -right-2 lg:-right-4 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl shadow-premium border border-neutral-100/50 dark:border-slate-800/80 p-2.5 md:p-4 lg:p-5">
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <div className="w-8 h-8 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg md:rounded-xl bg-accent-50 dark:bg-accent-950/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <span className="block text-sm md:text-xl lg:text-2xl font-bold text-primary-950 dark:text-white leading-tight">14+</span>
                      <span className="text-[9px] md:text-xs text-neutral-400 dark:text-slate-400 font-medium">Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
