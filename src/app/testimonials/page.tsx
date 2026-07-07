"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Anita Krishnan", treatment: "Dental Implants", rating: 5, text: "Dr. Ajith and his team transformed my smile with dental implants. The entire process was painless, professional, and the results exceeded my expectations!", date: "2 months ago" },
  { name: "Rajesh Menon", treatment: "Smile Design", rating: 5, text: "The smile design treatment at Madhav Dental was life-changing. The digital planning showed me exactly what my new smile would look like.", date: "1 month ago" },
  { name: "Sunitha Nair", treatment: "Root Canal", rating: 5, text: "I was terrified of root canals, but Dr. Rahul made it completely painless. Single-visit treatment. Highly recommend!", date: "3 weeks ago" },
  { name: "Mohammed Ashraf", treatment: "Braces", rating: 5, text: "Dr. Priya is an exceptional orthodontist. My treatment was planned meticulously, and the results are perfect.", date: "1 month ago" },
  { name: "Lakshmi Devi", treatment: "Kids Dentistry", rating: 5, text: "My daughter actually looks forward to dental visits now! Dr. Meera was so gentle and patient.", date: "2 weeks ago" },
  { name: "Vijay Kumar", treatment: "Teeth Whitening", rating: 5, text: "Professional whitening in just one visit. My teeth are several shades brighter. The staff was amazing!", date: "1 week ago" },
  { name: "Priyanka S.", treatment: "Clear Aligners", rating: 5, text: "Invisible aligners were the best choice. No one even noticed I was straightening my teeth!", date: "3 weeks ago" },
  { name: "George Thomas", treatment: "Dental Crown", rating: 5, text: "The zirconia crown looks and feels exactly like my natural tooth. Dr. Ajith is truly skilled.", date: "2 months ago" },
  { name: "Fathima Beevi", treatment: "Scaling", rating: 5, text: "Regular cleanings here keep my gums healthy. The clinic is spotlessly clean and modern.", date: "1 month ago" },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Testimonials</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Patient <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Stories</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Real experiences from patients who trusted us with their smiles.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Rating Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-primary-50 to-teal-50 border border-primary-100">
              <div className="text-5xl font-bold text-primary-950 mb-2" style={{ fontFamily: "var(--font-heading)" }}>4.9</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (<Star key={i} size={24} className="text-accent-400 fill-accent-400" />))}
              </div>
              <p className="text-neutral-500">Based on 500+ Google Reviews</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {reviews.map((review, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-premium transition-all h-full relative">
                  <Quote size={32} className="absolute top-4 right-4 text-primary-50" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (<Star key={j} size={14} className="text-accent-400 fill-accent-400" />))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-950 text-sm">{review.name}</h4>
                      <p className="text-xs text-neutral-400">{review.treatment} • {review.date}</p>
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
