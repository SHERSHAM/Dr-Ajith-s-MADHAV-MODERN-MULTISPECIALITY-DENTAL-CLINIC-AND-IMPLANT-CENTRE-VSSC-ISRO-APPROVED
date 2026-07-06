"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  Bell,
  MessageSquare,
  Users,
  LifeBuoy,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/portal/appointments", icon: Calendar },
  { name: "Medical History", href: "/portal/medical-history", icon: Stethoscope },
  { name: "Prescriptions", href: "/portal/prescriptions", icon: FileText },
  { name: "Lab Reports", href: "/portal/lab-reports", icon: FileSpreadsheet },
  { name: "Invoices", href: "/portal/invoices", icon: Receipt },
  { name: "Payments", href: "/portal/payments", icon: CreditCard },
  { name: "Messages", href: "/portal/messages", icon: MessageSquare },
  { name: "Family Members", href: "/portal/family", icon: Users },
  { name: "Support Support", href: "/portal/support", icon: LifeBuoy },
  { name: "Profile", href: "/portal/profile", icon: User },
  { name: "Settings", href: "/portal/settings", icon: Settings },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 z-30 sticky top-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="font-bold text-slate-800 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Patient Portal
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 sticky top-0 h-screen overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <div>
            <span className="block font-bold text-slate-800 text-xs leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Dr Ajith’s MADHAV MODERN MULTISPECIALITY DENTAL CLINIC
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Patient Portal
            </span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary-50 text-primary-600"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <link.icon size={18} className={active ? "text-primary-600" : "text-slate-400"} />
                {link.name.replace(" Support", "")}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 mt-6 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50/50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 p-6 flex flex-col h-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <span className="font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Patient Portal
                  </span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
                {sidebarLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-primary-50 text-primary-600"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <link.icon size={18} className={active ? "text-primary-600" : "text-slate-400"} />
                      {link.name.replace(" Support", "")}
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 mt-6 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 z-10">
          <h2 className="text-xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            {sidebarLinks.find((l) => l.href === pathname)?.name.replace(" Support", "") || "Dashboard"}
          </h2>
          <div className="flex items-center gap-6">
            <Link href="/portal/notifications" className="relative p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 ring-2 ring-white" />
            </Link>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                J
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-800 leading-tight">John Doe</span>
                <span className="text-[10px] font-medium text-slate-400">Patient ID: #MD-1402</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Router */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
