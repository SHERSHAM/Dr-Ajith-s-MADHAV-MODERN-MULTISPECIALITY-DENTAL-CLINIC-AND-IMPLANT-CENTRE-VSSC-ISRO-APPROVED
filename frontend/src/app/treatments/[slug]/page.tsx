"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { TREATMENTS } from "@/data/treatments";
import { ArrowLeft, CheckCircle2, Calendar, Clock, IndianRupee, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="border border-neutral-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors">
        <span className="font-semibold text-primary-950 text-sm pr-4">{question}</span>
        <ChevronDown size={18} className={`text-neutral-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-neutral-500 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) return notFound();

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/treatments" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors">
              <ArrowLeft size={16} /> All Treatments
            </Link>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium mb-4">{treatment.category}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>{treatment.name}</h1>
            <div className="flex flex-wrap gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {treatment.duration}</span>
              <span className="flex items-center gap-1.5"><IndianRupee size={14} /> {treatment.price}</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* Description */}
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Overview</h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-12">{treatment.description}</p>
          </ScrollReveal>

          {/* Benefits */}
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-12">
              {treatment.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 p-4 rounded-xl bg-teal-50/50 border border-teal-100/50">
                  <CheckCircle2 size={18} className="text-teal-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-primary-900">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Procedure */}
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Procedure Steps</h2>
            <div className="space-y-4 mb-12">
              {treatment.procedure.map((step, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} className="flex items-start gap-4 p-4 rounded-xl bg-primary-50/30 border border-primary-100/30">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-600">
                    {i + 1}
                  </div>
                  <span className="text-neutral-700 text-sm pt-1">{step}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Recovery */}
          <ScrollReveal delay={0.3}>
            <h2 className="text-2xl font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Recovery</h2>
            <div className="p-6 rounded-2xl bg-accent-50/50 border border-accent-100/50 mb-12">
              <p className="text-neutral-600 leading-relaxed">{treatment.recovery}</p>
            </div>
          </ScrollReveal>

          {/* FAQs */}
          <ScrollReveal delay={0.4}>
            <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Frequently Asked Questions</h2>
            <div className="space-y-3 mb-12">
              {treatment.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.5}>
            <div className="text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100">
              <h3 className="text-2xl font-bold text-primary-950 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Ready to Get Started?
              </h3>
              <p className="text-neutral-500 mb-6">Book your consultation for {treatment.name} today.</p>
              <Link href="/book-appointment" className="inline-flex items-center gap-2 btn-primary">
                <Calendar size={16} /> Book Appointment
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
