"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ChevronDown, Search } from "lucide-react";

const faqCategories = [
  {
    name: "General",
    faqs: [
      { q: "What are your clinic hours?", a: "We are open Monday to Saturday from 9:00 AM to 9:00 PM, and Sunday from 10:00 AM to 2:00 PM. Emergency services are available 24/7." },
      { q: "Do I need an appointment?", a: "While walk-ins are welcome, we recommend booking an appointment to ensure minimal wait times and dedicated attention from our specialists." },
      { q: "What safety protocols do you follow?", a: "We follow international-grade sterilization protocols with autoclave validation, disposable supplies, and comprehensive infection control measures." },
      { q: "Is parking available?", a: "Yes, we have convenient parking available for patients near our clinic on Amman Kovil Road, Kazhakuttam." },
    ],
  },
  {
    name: "Treatments",
    faqs: [
      { q: "Is dental treatment painful?", a: "We use advanced anesthesia techniques and laser technology to ensure virtually painless treatments. Patient comfort is our top priority." },
      { q: "How long does a dental implant procedure take?", a: "The surgical placement takes about 30-60 minutes. The complete process including healing takes 3-6 months for the implant to fully integrate." },
      { q: "At what age should my child visit a dentist?", a: "We recommend the first dental visit by age 1 or when the first tooth appears. Early visits help establish good oral health habits." },
      { q: "How often should I get dental check-ups?", a: "We recommend comprehensive check-ups every 6 months for optimal oral health and early detection of any issues." },
    ],
  },
  {
    name: "Payments",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept cash, debit/credit cards, UPI, net banking, and EMI options for eligible treatments." },
      { q: "Do you offer EMI options?", a: "Yes, we offer easy EMI options for major treatments. Speak with our front desk for available plans and eligibility." },
      { q: "Is there a consultation fee?", a: "We have a nominal consultation fee which is adjusted against treatment costs if you proceed with the recommended treatment." },
    ],
  },
  {
    name: "Insurance",
    faqs: [
      { q: "Do you accept dental insurance?", a: "Yes, we work with most major dental insurance providers. Please contact us with your insurance details for verification." },
      { q: "Can you help with insurance claims?", a: "Absolutely. Our team will assist you with all necessary documentation and claim processing for a hassle-free experience." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="border border-neutral-100 rounded-xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50/50 transition-colors">
        <span className="font-semibold text-primary-950 text-sm pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-neutral-400 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-neutral-500 text-sm leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("General");

  const activeData = faqCategories.find((c) => c.name === activeCategory);
  const filtered = search
    ? faqCategories.flatMap((c) => c.faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())))
    : activeData?.faqs || [];

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">FAQ</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Frequently Asked <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Questions</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Find answers to common questions about our dental services.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="relative mb-10">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
              />
            </div>
          </ScrollReveal>

          {!search && (
            <ScrollReveal className="mb-8">
              <div className="flex flex-wrap gap-2">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.name ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-primary-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          )}

          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
