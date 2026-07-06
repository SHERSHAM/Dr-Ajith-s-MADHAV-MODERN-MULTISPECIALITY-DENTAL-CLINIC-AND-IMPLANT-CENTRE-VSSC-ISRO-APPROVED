"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

const posts: Record<string, { title: string; category: string; date: string; readTime: string; content: string[]; emoji: string }> = {
  "importance-of-regular-dental-checkups": {
    title: "The Importance of Regular Dental Check-ups",
    category: "Preventive Care", date: "June 15, 2026", readTime: "5 min", emoji: "🦷",
    content: [
      "Regular dental check-ups are one of the most important things you can do for your oral health. Yet, many people skip their routine visits, only seeing a dentist when they're in pain. By then, a simple issue may have become a complex — and expensive — problem.",
      "During a routine check-up, your dentist examines your teeth, gums, and mouth for signs of decay, gum disease, oral cancer, and other conditions. Early detection is key to successful treatment and can save you time, money, and discomfort in the long run.",
      "Professional cleaning during your visit removes plaque and tartar that regular brushing and flossing can't reach. This helps prevent cavities, gum disease, and bad breath. Your dental hygienist can also provide personalized tips for improving your home care routine.",
      "At Madhav Dental, we recommend comprehensive check-ups every 6 months. During your visit, we use advanced digital X-rays and intraoral cameras to detect issues invisible to the naked eye. Our preventive approach focuses on maintaining your oral health rather than just treating problems.",
      "Don't wait for pain to visit your dentist. Schedule your routine check-up today and invest in a lifetime of healthy smiles.",
    ],
  },
  "dental-implants-guide": {
    title: "Complete Guide to Dental Implants",
    category: "Treatments", date: "June 8, 2026", readTime: "8 min", emoji: "🔬",
    content: [
      "Dental implants are considered the gold standard for replacing missing teeth. Unlike dentures or bridges, implants provide a permanent solution that looks, feels, and functions like natural teeth.",
      "A dental implant consists of three parts: a titanium post that's surgically placed into the jawbone, an abutment that connects the post to the crown, and a custom-made crown that replicates the appearance of a natural tooth.",
      "The implant process typically involves an initial consultation with 3D imaging, surgical placement of the implant, a healing period of 3-6 months for osseointegration (bone fusion), and finally, the placement of the permanent crown.",
      "At Madhav Dental, Dr. Ajith Madhav uses advanced 3D CBCT imaging and computer-guided surgery for precise implant placement. This technology-driven approach results in higher success rates, faster healing, and superior aesthetic outcomes.",
      "Dental implants have a success rate of over 95% and can last a lifetime with proper care. If you're missing one or more teeth, schedule a consultation to learn if implants are right for you.",
    ],
  },
};

const defaultPost = {
  title: "Blog Post", category: "General", date: "2026", readTime: "5 min", emoji: "📝",
  content: ["This blog post is coming soon. Stay tuned for expert dental health insights from our team at Madhav Dental."],
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = posts[slug] || defaultPost;

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><User size={14} /> Dr. Ajith Madhav</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} read</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center mb-12">
              <span className="text-8xl">{post.emoji}</span>
            </div>
          </ScrollReveal>

          <article className="space-y-6">
            {post.content.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className="text-neutral-600 text-lg leading-relaxed">{paragraph}</p>
              </ScrollReveal>
            ))}
          </article>

          <ScrollReveal delay={0.3} className="mt-12">
            <div className="p-8 rounded-2xl bg-primary-50 border border-primary-100 text-center">
              <h3 className="text-xl font-bold text-primary-950 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Need Expert Dental Advice?</h3>
              <p className="text-neutral-500 mb-6">Book a consultation with our specialists today.</p>
              <Link href="/book-appointment" className="inline-flex items-center gap-2 btn-primary">
                Book Appointment
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
