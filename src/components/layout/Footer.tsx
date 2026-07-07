"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { CLINIC } from "@/data/clinic";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Doctors", href: "/doctors" },
    { name: "Treatments", href: "/treatments" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  Treatments: [
    { name: "Dental Implants", href: "/treatments/dental-implants" },
    { name: "Root Canal", href: "/treatments/root-canal-treatment" },
    { name: "Braces", href: "/treatments/braces" },
    { name: "Smile Design", href: "/treatments/smile-design" },
    { name: "Teeth Whitening", href: "/treatments/teeth-whitening" },
    { name: "Kids Dentistry", href: "/treatments/kids-dentistry" },
    { name: "Cosmetic Dentistry", href: "/treatments/cosmetic-dentistry" },
    { name: "Laser Dentistry", href: "/treatments/laser-dentistry" },
  ],
  "Patient Info": [
    { name: "Book Appointment", href: "/book-appointment" },
    { name: "Patient Portal", href: "/portal/dashboard" },
    { name: "Patient Stories", href: "/patient-stories" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Refund Policy", href: "/refund-policy" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const isAuth =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  if (isPortal || isAuth) return null;

  return (
    <footer className="relative bg-primary-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      {/* CTA Section */}
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-16">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16" style={{ background: "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 60%, #20c9ad 100%)" }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Ready for Your Best Smile?
                </h3>
                <p className="text-white/70 text-lg max-w-lg">
                  Book your appointment today and experience world-class dental care
                  with our expert team.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-all hover:scale-105"
                >
                  Book Appointment
                  <ArrowUpRight size={18} />
                </Link>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="row gy-5 gx-4">
          {/* Brand */}
          <div className="col-12 col-lg-5">
            <ScrollReveal>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b63f7 0%, #20c9ad 100%)",
                  }}
                >
                  M
                </div>
                <div>
                  <span className="block text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Madhav Dental
                  </span>
                  <span className="block text-xs text-white/40 tracking-wider uppercase">
                    Multi Speciality Clinic
                  </span>
                </div>
              </Link>
              <p className="text-white/50 mb-8 max-w-sm leading-relaxed">
                Experience world-class dental care with cutting-edge technology
                and a compassionate team dedicated to your smile.
              </p>

              {/* Contact info */}
              <div className="space-y-3 mb-8">
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  <span>{CLINIC.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  <span>{CLINIC.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white/60">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{CLINIC.address.full}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Clock size={16} />
                  <span>Mon-Sat: {CLINIC.hours.weekdays}</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { label: "f", href: CLINIC.social.facebook },
                  { label: "in", href: CLINIC.social.instagram },
                  { label: "yt", href: CLINIC.social.youtube },
                ].map(({ label, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <ScrollReveal key={title} delay={i * 0.1} className="col-6 col-md-4 col-lg-2">
              <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/30 flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400" /> for healthy
            smiles
          </p>
        </div>
      </div>
    </footer>
  );
}
