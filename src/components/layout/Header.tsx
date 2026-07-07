"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLINIC } from "@/data/clinic";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Story", href: "/about" },
      { name: "Meet Our Doctors", href: "/doctors" },
      { name: "Technology", href: "/technology" },
      { name: "Facilities", href: "/facilities" },
    ],
  },
  {
    name: "Treatments",
    href: "/treatments",
    children: [
      { name: "All Treatments", href: "/treatments" },
      { name: "Dental Implants", href: "/treatments/dental-implants" },
      { name: "Root Canal", href: "/treatments/root-canal-treatment" },
      { name: "Braces & Aligners", href: "/treatments/braces" },
      { name: "Cosmetic Dentistry", href: "/treatments/cosmetic-dentistry" },
      { name: "Smile Design", href: "/treatments/smile-design" },
      { name: "Kids Dentistry", href: "/treatments/kids-dentistry" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const isAuth =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (isPortal || isAuth) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPortal, isAuth]);

  useEffect(() => {
    // Check initial theme class
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    }
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  if (isPortal || isAuth) return null;

  return (
    <>
      {/* Top bar */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className="hidden lg:block bg-primary-950 text-white/80 text-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {CLINIC.address.line1}, {CLINIC.address.line2}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {CLINIC.hours.weekdays}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CLINIC.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={13} />
              {CLINIC.phoneDisplay}
            </a>
            <a
              href={`mailto:${CLINIC.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={13} />
              {CLINIC.email}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-primary-950/5 border-b border-neutral-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 100%)",
                }}
              >
                M
              </motion.div>
              <div className="hidden sm:block">
                <span className="block text-xs font-bold text-primary-950 leading-tight tracking-tight max-w-[200px]" style={{ fontFamily: "var(--font-heading)" }}>
                  Dr Ajith’s MADHAV MODERN MULTISPECIALITY DENTAL CLINIC
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      scrolled
                        ? "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                        : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50/80"
                    }`}
                  >
                    {link.name}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-premium border border-neutral-100 overflow-hidden py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA + Mobile menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-neutral-100/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <Link
                href="/book-appointment"
                className="hidden md:inline-flex items-center gap-2 btn-primary text-sm"
              >
                <Calendar size={16} />
                Book Appointment
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile header */}
              <div className="flex items-center justify-between px-4 h-20 border-b border-neutral-100">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 100%)",
                    }}
                  >
                    M
                  </div>
                  <span className="text-xs font-bold text-primary-950 leading-tight max-w-[180px]" style={{ fontFamily: "var(--font-heading)" }}>
                    Dr Ajith’s MADHAV MODERN MULTISPECIALITY DENTAL CLINIC
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3.5 px-3 text-lg font-medium text-neutral-800 hover:text-primary-600 border-b border-neutral-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="pl-6 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-neutral-500 hover:text-primary-600 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-neutral-100">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 w-full mb-3 py-3 rounded-xl border border-neutral-200 text-neutral-800 font-medium text-sm transition-all"
                >
                  {theme === "light" ? (
                    <>
                      <Moon size={16} /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun size={16} /> Light Mode
                    </>
                  )}
                </button>
                <Link
                  href="/book-appointment"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-primary py-4 text-base"
                >
                  <Calendar size={18} />
                  Book Appointment
                </Link>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex items-center justify-center gap-2 w-full mt-3 py-3 text-primary-700 font-medium"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
