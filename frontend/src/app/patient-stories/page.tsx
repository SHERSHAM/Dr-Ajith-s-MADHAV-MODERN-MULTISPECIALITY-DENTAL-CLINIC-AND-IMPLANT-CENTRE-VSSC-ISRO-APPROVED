"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { Star, Quote } from "lucide-react";

const stories = [
  { name: "Anita K.", age: 45, treatment: "Full Mouth Rehabilitation", story: "After years of neglecting my dental health, I was embarrassed to smile. Dr. Ajith designed a complete treatment plan that included implants, crowns, and veneers. Over 6 months, my smile was completely transformed. I now smile confidently in every photo. The team made me feel comfortable throughout the journey.", rating: 5, duration: "6 months" },
  { name: "Rajesh M.", age: 32, treatment: "Smile Design", story: "I had always been self-conscious about my crooked front teeth. The Digital Smile Design process at Madhav Dental was incredible — I could see exactly what my new smile would look like before treatment even began. The final result exceeded my expectations. It has genuinely changed my confidence.", rating: 5, duration: "3 weeks" },
  { name: "Baby Sarah", age: 6, treatment: "Pediatric Dentistry", story: "Our daughter Sarah was terrified of dentists. Dr. Meera's gentle approach and the fun, child-friendly setup completely changed her attitude. She now looks forward to her dental visits! The team's patience and kindness with children is remarkable.", rating: 5, duration: "Ongoing" },
  { name: "George T.", age: 55, treatment: "Dental Implants", story: "I lost two front teeth in an accident and was devastated. Dr. Ajith performed immediate implant placement and within months, I had permanent, natural-looking teeth. No one can tell they're implants. The technology they use is truly world-class.", rating: 5, duration: "4 months" },
];

export default function PatientStoriesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Patient Stories</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Real <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Patient Stories</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Inspiring stories of transformation from patients who trusted us with their smiles.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <StaggerReveal className="space-y-8" staggerDelay={0.15}>
            {stories.map((s, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ scale: 1.01 }} className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-premium relative">
                  <Quote size={40} className="absolute top-6 right-8 text-primary-50" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-950 text-lg">{s.name}, {s.age}</h3>
                      <p className="text-teal-600 text-sm font-medium">{s.treatment}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed mb-6 italic text-lg">&ldquo;{s.story}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(s.rating)].map((_, j) => (<Star key={j} size={16} className="text-accent-400 fill-accent-400" />))}
                    </div>
                    <span className="text-xs text-neutral-400">Treatment duration: {s.duration}</span>
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
