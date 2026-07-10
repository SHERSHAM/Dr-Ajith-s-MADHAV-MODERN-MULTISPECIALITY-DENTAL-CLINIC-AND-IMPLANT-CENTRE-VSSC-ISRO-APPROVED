"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal, { StaggerItem } from "@/components/animations/StaggerReveal";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
      })
      .catch((err) => console.error("CMS load error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Blog</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Dental Health <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Insights</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">Expert dental health tips, treatment guides, and clinic news from our team.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4 animate-pulse">
                  <div className="aspect-[16/10] bg-neutral-100 rounded-xl" />
                  <div className="h-4 bg-neutral-100 rounded w-1/3" />
                  <div className="h-6 bg-neutral-100 rounded w-3/4" />
                  <div className="h-4 bg-neutral-100 rounded w-full" />
                  <div className="h-4 bg-neutral-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl block mb-4">📭</span>
              <h3 className="text-xl font-bold text-primary-950 mb-2">No Blog Posts Yet</h3>
              <p className="text-neutral-500">Check back later for expert dental health articles.</p>
            </div>
          ) : (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article whileHover={{ y: -6 }} className="group bg-white rounded-2xl border border-neutral-100 hover:shadow-premium transition-all h-full overflow-hidden">
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center">
                        <span className="text-6xl">{post.emoji}</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-primary-50 text-xs font-medium text-primary-600">{post.category}</span>
                          <span className="text-xs text-neutral-400 flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                        </div>
                        <h3 className="font-bold text-primary-950 text-lg mb-2 group-hover:text-primary-600 transition-colors leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {post.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-neutral-400 flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                          <span className="text-primary-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read More <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>
    </>
  );
}
