"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Receipt,
  ArrowRight,
  Clock,
  User,
  ShieldAlert,
  ArrowUpRight,
  PlusCircle,
  MessageSquare,
} from "lucide-react";

export default function PortalDashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [meRes, appRes] = await Promise.all([
          fetch("/api/auth/me").then((res) => res.json()),
          fetch("/api/appointments").then((res) => res.json()),
        ]);

        if (meRes.user) setUser(meRes.user);
        if (appRes.appointments) setAppointments(appRes.appointments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  // Calculate upcoming appointment details
  const upcomingAppointments = appointments
    .filter((app) => app.status === "PENDING" || app.status === "CONFIRMED")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nextApp = upcomingAppointments[0];
  const nextAppDateStr = nextApp 
    ? `${new Date(nextApp.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${nextApp.time}`
    : "No Appointments";

  // Sum unpaid invoices
  let totalDue = 0;
  appointments.forEach((app) => {
    if (app.invoices) {
      app.invoices.forEach((inv: any) => {
        if (inv.status === "UNPAID") {
          totalDue += inv.amount;
        }
      });
    }
  });

  const stats = [
    { label: "Next Appointment", value: nextAppDateStr, icon: Calendar, color: "text-primary-600 bg-primary-50" },
    { label: "Active Prescriptions", value: "2 Medicines", icon: FileText, color: "text-teal-600 bg-teal-50" },
    { label: "Pending Invoices", value: `₹${totalDue.toLocaleString()} Due`, icon: Receipt, color: "text-accent-600 bg-accent-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl text-white relative overflow-hidden shadow-xl"
        style={{ background: "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 70%, #20c9ad 100%)" }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Welcome back, {user ? user.name.split(" ")[0] : "John"}!
          </h1>
          <p className="text-white/70 max-w-md text-sm md:text-base leading-relaxed">
            {nextApp 
              ? `Your next appointment is scheduled for ${nextAppDateStr} with ${nextApp.doctorName}.`
              : "No upcoming appointments. Keep your smile bright and healthy!"}
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow duration-300"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} flex-shrink-0`}>
              <stat.icon size={22} />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              <span className="block text-lg font-bold text-slate-800 leading-tight">
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions & Next Appointment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Appointment Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
              Upcoming Appointment Details
            </h3>
            <Link href="/portal/appointments" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              All Appointments <ArrowRight size={14} />
            </Link>
          </div>

          {nextApp ? (
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-teal-50 flex items-center justify-center text-2xl flex-shrink-0">
                    👨‍⚕️
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{nextApp.doctorName}</h4>
                    <p className="text-xs text-slate-400">Chief Specialist • MD</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-600 flex items-center gap-1.5">
                    <Calendar size={12} /> {new Date(nextApp.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-semibold text-teal-600 flex items-center gap-1.5">
                    <Clock size={12} /> {nextApp.time}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reason for Visit</span>
                  <span className="font-semibold text-slate-800">{nextApp.reason || "Routine Checkup"}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    nextApp.status === "CONFIRMED" 
                      ? "bg-green-50 text-green-700" 
                      : nextApp.status === "PENDING"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {nextApp.status.charAt(0) + nextApp.status.slice(1).toLowerCase()}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location</span>
                  <span className="font-semibold text-slate-800">Suite 3 (OPD Lounge)</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link href="/portal/appointments" className="flex-1 text-center py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                  Reschedule / Cancel
                </Link>
                <a href="https://wa.me/919567400562" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-md shadow-primary-600/10 transition-all">
                  Contact Desk
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center py-10 space-y-4">
              <span className="text-4xl block">🗓️</span>
              <h4 className="text-lg font-bold text-slate-800">No Upcoming Appointment</h4>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">You do not have any appointments scheduled at the moment. Keep your smile bright and healthy!</p>
              <Link href="/portal/appointments" className="inline-block px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-all shadow-md">
                Schedule Appointment Now
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Patient Actions
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "Book New Appointment", desc: "Schedule online in 1 min", icon: PlusCircle, href: "/portal/appointments", bg: "hover:bg-primary-50 hover:border-primary-100", iconColor: "text-primary-600" },
              { label: "Message Doctors", desc: "Ask questions or upload files", icon: MessageSquare, href: "/portal/messages", bg: "hover:bg-teal-50 hover:border-teal-100", iconColor: "text-teal-600" },
              { label: "Online Bill Payments", desc: "Pay invoices securely", icon: Receipt, href: "/portal/payments", bg: "hover:bg-accent-50 hover:border-accent-100", iconColor: "text-accent-600" },
            ].map((act) => (
              <Link
                key={act.label}
                href={act.href}
                className={`flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow transition-all ${act.bg}`}
              >
                <div className={`p-2.5 rounded-xl bg-slate-50 ${act.iconColor} flex-shrink-0`}>
                  <act.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{act.label}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{act.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
