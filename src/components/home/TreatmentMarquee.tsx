"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import MarqueeStrip from "@/components/animations/MarqueeStrip";

const marqueeItems = [
  "Dental Implants",
  "Smile Design",
  "Root Canal",
  "Clear Aligners",
  "Teeth Whitening",
  "Cosmetic Dentistry",
  "Laser Dentistry",
  "Kids Dentistry",
  "Oral Surgery",
  "Braces",
  "Crowns & Bridges",
  "Emergency Care",
];

export default function TreatmentMarquee() {
  return (
    <section className="py-8 bg-primary-50/30 border-y border-primary-100/30">
      <MarqueeStrip speed={40} className="py-4">
        {marqueeItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary-300 whitespace-nowrap"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            {item}
          </span>
        ))}
      </MarqueeStrip>
    </section>
  );
}
