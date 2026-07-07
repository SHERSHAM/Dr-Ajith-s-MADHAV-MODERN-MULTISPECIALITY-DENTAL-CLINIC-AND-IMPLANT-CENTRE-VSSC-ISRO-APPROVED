"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { CLINIC } from "@/data/clinic";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Contact <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Us</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">We&apos;re here to help. Reach out to us for appointments, queries, or emergencies.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-primary-950 mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                  Reach Out to Us
                </h2>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: Phone, label: "Phone", value: CLINIC.phoneDisplay, href: `tel:${CLINIC.phone}`, color: "bg-primary-50 text-primary-600" },
                    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: CLINIC.whatsapp, color: "bg-green-50 text-green-600" },
                    { icon: Mail, label: "Email", value: CLINIC.email, href: `mailto:${CLINIC.email}`, color: "bg-teal-50 text-teal-600" },
                    { icon: MapPin, label: "Address", value: CLINIC.address.full, href: "#map", color: "bg-accent-50 text-accent-600" },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 hover:border-primary-100 hover:shadow-lg transition-all group">
                      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary-950 text-sm">{label}</h4>
                        <p className="text-neutral-500 text-sm">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-primary-950 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Opening Hours</h3>
                <div className="space-y-3 mb-10">
                  {[
                    { day: "Monday – Saturday", hours: CLINIC.hours.weekdays },
                    { day: "Sunday", hours: CLINIC.hours.sunday },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between items-center py-3 border-b border-neutral-50">
                      <span className="text-sm font-medium text-primary-900">{day}</span>
                      <span className="text-sm text-neutral-500 flex items-center gap-1.5"><Clock size={14} />{hours}</span>
                    </div>
                  ))}
                  <p className="text-xs text-teal-600 font-medium mt-2">🚨 Emergency services available 24/7</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl border border-neutral-100 shadow-premium p-8 md:p-10">
                <h3 className="text-xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                    { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    { name: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-primary-900 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 btn-primary py-4"
                  >
                    {submitted ? "Message Sent! ✓" : <><Send size={16} /> Send Message</>}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal className="mt-16">
            <div className="rounded-3xl overflow-hidden border border-neutral-100 shadow-premium h-[400px] bg-neutral-100">
              <iframe
                src={CLINIC.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
