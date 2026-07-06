"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anita Krishnan",
    treatment: "Dental Implants",
    rating: 5,
    text: "Dr. Ajith and his team transformed my smile with dental implants. The entire process was painless, professional, and the results exceeded my expectations. I can now eat and smile with complete confidence!",
    date: "2 months ago",
  },
  {
    name: "Rajesh Menon",
    treatment: "Smile Design",
    rating: 5,
    text: "The smile design treatment at Madhav Dental was life-changing. The digital planning showed me exactly what my new smile would look like. The final result was even better than the simulation!",
    date: "1 month ago",
  },
  {
    name: "Sunitha Nair",
    treatment: "Root Canal",
    rating: 5,
    text: "I was terrified of root canals, but Dr. Rahul made it completely painless. The single-visit treatment was quick, efficient, and I was back to normal the same day. Highly recommend!",
    date: "3 weeks ago",
  },
  {
    name: "Mohammed Ashraf",
    treatment: "Braces",
    rating: 5,
    text: "Dr. Priya is an exceptional orthodontist. My treatment was planned meticulously, and the results are perfect. The staff is warm, welcoming, and always on time. Best dental clinic in Trivandrum!",
    date: "1 month ago",
  },
  {
    name: "Lakshmi Devi",
    treatment: "Kids Dentistry",
    rating: 5,
    text: "My daughter used to be terrified of dentists until we visited Madhav Dental. Dr. Meera was so gentle and patient, now my child actually looks forward to dental visits! The child-friendly setup is wonderful.",
    date: "2 weeks ago",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-teal-600 tracking-wider uppercase mb-4">
            Patient Reviews
          </span>
          <h2 className="section-heading text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            What Our Patients{" "}
            <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="section-subheading mx-auto">
            Real stories from real patients who trusted us with their smiles.
          </p>
        </ScrollReveal>

        {/* Google Rating */}
        <ScrollReveal className="flex justify-center mb-12">
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-neutral-50 border border-neutral-100">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-accent-400 fill-accent-400"
                />
              ))}
            </div>
            <span className="text-lg font-bold text-primary-950">4.9</span>
            <span className="text-neutral-400 text-sm">
              Based on 500+ Google Reviews
            </span>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-premium border border-neutral-100 relative"
            >
              <Quote
                size={48}
                className="absolute top-6 right-8 text-primary-50"
              />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-accent-400 fill-accent-400"
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-950">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-sm text-neutral-400">
                      {testimonials[current].treatment} •{" "}
                      {testimonials[current].date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-200 transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary-500 w-8"
                    : "bg-neutral-200 hover:bg-neutral-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
