"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (data.post) setPost(data.post);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50/50 text-center px-4">
        <span className="text-6xl mb-4">🔍</span>
        <h2 className="text-2xl font-bold text-primary-950 mb-2">Article Not Found</h2>
        <p className="text-neutral-500 mb-6">The article you are looking for does not exist or has been moved.</p>
        <Link href="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center mb-12">
              <span className="text-8xl">{post.emoji}</span>
            </div>
          </ScrollReveal>

          <article className="space-y-6">
            {post.content.map((paragraph: string, i: number) => (
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
