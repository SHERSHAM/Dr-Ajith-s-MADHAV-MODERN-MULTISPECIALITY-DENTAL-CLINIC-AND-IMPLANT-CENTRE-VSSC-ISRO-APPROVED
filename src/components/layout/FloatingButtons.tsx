"use client";

import { motion } from "framer-motion";
import { MessageCircle, Calendar } from "lucide-react";
import { CLINIC } from "@/data/clinic";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingButtons() {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");
  const isAuth =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password");

  if (isPortal || isAuth) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Book Appointment */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <Link
          href="/book-appointment"
          className="hidden md:flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 100%)",
          }}
        >
          <Calendar size={18} />
          Book Appointment
        </Link>
      </motion.div>

      {/* WhatsApp */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href={CLINIC.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl"
          style={{ background: "#25D366" }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} fill="white" />
        </motion.a>
      </motion.div>
    </div>
  );
}
