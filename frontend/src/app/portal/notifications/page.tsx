"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, Receipt, FileText, CheckCircle2 } from "lucide-react";

export default function PortalNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Appointment Confirmed",
      desc: "Your implant check-up with Dr. Ajith Madhav on July 12, 10:30 AM has been successfully confirmed. Please arrive 10 minutes early.",
      date: "July 5, 2026",
      read: false,
      icon: Calendar,
      color: "text-primary-600 bg-primary-50 border-primary-100",
    },
    {
      id: 2,
      type: "billing",
      title: "Invoice Generated - #INV-2041",
      desc: "An invoice of ₹25,000 has been generated for your first stage surgical implant procedure. Due balance: ₹2,500.",
      date: "June 10, 2026",
      read: true,
      icon: Receipt,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      id: 3,
      type: "medical",
      title: "New Digital Prescription",
      desc: "Dr. Ajith Madhav uploaded a new prescription post-implant consultation checklist. View medication guidelines in the portal.",
      date: "June 10, 2026",
      read: true,
      icon: FileText,
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            In-App Notifications
          </h1>
          <p className="text-slate-400 text-sm">View and track reminders, invoice alerts & clinical reports updates</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-full transition-all"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border bg-white shadow-sm flex items-start justify-between gap-4 transition-all hover:shadow-md ${
                !n.read ? "border-primary-100 bg-primary-50/5" : "border-slate-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${n.color} flex-shrink-0`}>
                  <n.icon size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold text-sm ${!n.read ? "text-slate-800" : "text-slate-600"}`}>{n.title}</h4>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    )}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xl">{n.desc}</p>
                  <span className="block text-[10px] text-slate-400 font-semibold pt-1">{n.date}</span>
                </div>
              </div>

              <button
                onClick={() => clearNotification(n.id)}
                className="text-slate-400 hover:text-slate-600 text-xs font-medium"
              >
                Clear
              </button>
            </motion.div>
          ))
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 space-y-3 shadow-sm">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <Bell size={20} />
            </div>
            <h4 className="font-bold text-slate-600 text-sm">All caught up!</h4>
            <p className="text-xs">No active notifications available</p>
          </div>
        )}
      </div>
    </div>
  );
}
