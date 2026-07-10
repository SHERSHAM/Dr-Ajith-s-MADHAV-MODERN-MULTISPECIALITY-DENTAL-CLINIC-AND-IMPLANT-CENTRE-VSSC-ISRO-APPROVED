"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { useState } from "react";
import { X } from "lucide-react";

const galleryItems = [
  { id: 1, title: "Reception Area", category: "Clinic", aspect: "aspect-[4/3]", emoji: "🏥" },
  { id: 2, title: "Treatment Room 1", category: "Clinic", aspect: "aspect-square", emoji: "🪥" },
  { id: 3, title: "3D CBCT Scanner", category: "Equipment", aspect: "aspect-[3/4]", emoji: "🔬" },
  { id: 4, title: "Dental Laser Unit", category: "Equipment", aspect: "aspect-[4/3]", emoji: "⚡" },
  { id: 5, title: "Our Team", category: "Team", aspect: "aspect-[4/3]", emoji: "👥" },
  { id: 6, title: "Sterilization Room", category: "Clinic", aspect: "aspect-square", emoji: "🧼" },
  { id: 7, title: "Kids Corner", category: "Clinic", aspect: "aspect-[3/4]", emoji: "🧸" },
  { id: 8, title: "Digital X-Ray", category: "Equipment", aspect: "aspect-[4/3]", emoji: "📸" },
  { id: 9, title: "Consultation Room", category: "Clinic", aspect: "aspect-square", emoji: "💬" },
  { id: 10, title: "CAD/CAM System", category: "Equipment", aspect: "aspect-[4/3]", emoji: "💻" },
  { id: 11, title: "Team Photo", category: "Team", aspect: "aspect-[4/3]", emoji: "📷" },
  { id: 12, title: "Waiting Lounge", category: "Clinic", aspect: "aspect-[3/4]", emoji: "🛋️" },
];

const categories = ["All", "Clinic", "Equipment", "Team"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Gallery</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Clinic Gallery</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Take a virtual tour of our modern, state-of-the-art facility.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-primary-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <StaggerReveal className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4" staggerDelay={0.06} key={activeCategory}>
            {filtered.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setLightbox(item.id)}
                  className={`break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative ${item.aspect} bg-gradient-to-br from-primary-100 to-teal-50 border border-neutral-100`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl block mb-2">{item.emoji}</span>
                      <p className="text-primary-900 font-medium text-sm">{item.title}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <span className="text-white font-semibold text-sm">{item.title}</span>
                      <span className="block text-white/60 text-xs">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
        >
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/60 hover:text-white">
            <X size={32} />
          </button>
          <div className="max-w-2xl w-full aspect-video rounded-2xl bg-gradient-to-br from-primary-800 to-teal-800 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-8xl block mb-4">{galleryItems.find((i) => i.id === lightbox)?.emoji}</span>
              <h3 className="text-2xl font-bold">{galleryItems.find((i) => i.id === lightbox)?.title}</h3>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
