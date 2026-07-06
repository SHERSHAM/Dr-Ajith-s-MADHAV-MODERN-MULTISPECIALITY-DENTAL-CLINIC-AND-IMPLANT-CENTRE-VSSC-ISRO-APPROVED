"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, FileText, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export default function PortalAppointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const upcomingAppointments = [
    {
      id: "apt-101",
      doctor: "Dr. Ajith Madhav",
      title: "Chief Surgeon • Prosthodontist",
      treatment: "Dental Implants (Abutment Fitting)",
      date: "July 12, 2026",
      time: "10:30 AM",
      status: "Confirmed",
      type: "In-Person Clinic Visit",
    },
    {
      id: "apt-102",
      doctor: "Dr. Priya Nair",
      title: "Senior Orthodontist",
      treatment: "Invisalign Progress Check",
      date: "August 5, 2026",
      time: "3:00 PM",
      status: "Confirmed",
      type: "In-Person Clinic Visit",
    },
  ];

  const pastAppointments = [
    {
      id: "apt-99",
      doctor: "Dr. Ajith Madhav",
      title: "Chief Surgeon",
      treatment: "Dental Implant Consultation & 3D scan",
      date: "June 10, 2026",
      time: "11:00 AM",
      status: "Completed",
      type: "In-Person Clinic Visit",
    },
    {
      id: "apt-98",
      doctor: "Dr. Lakshmi Menon",
      title: "Gum Specialist",
      treatment: "Laser Gum Scaling & Deep Cleanse",
      date: "April 15, 2026",
      time: "2:30 PM",
      status: "Completed",
      type: "In-Person Clinic Visit",
    },
  ];

  const handleCancelApt = (id: string) => {
    setCancellingId(id);
    setTimeout(() => {
      setCancellingId(null);
      alert("Appointment cancellation request sent to the front desk. You will receive a WhatsApp confirmation shortly.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Appointments Schedule
          </h1>
          <p className="text-slate-400 text-sm">View or manage your clinic appointments</p>
        </div>
        <Link
          href="/book-appointment"
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-semibold shadow-md shadow-primary-600/10 flex items-center gap-2 transition-all hover:scale-105"
        >
          Book New Appointment
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-4 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "upcoming"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`py-4 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "past"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Past Visits
        </button>
      </div>

      {/* List container */}
      <div className="space-y-4">
        {activeTab === "upcoming" ? (
          upcomingAppointments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-4 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5 w-fit">
                    <Calendar size={12} /> {apt.date}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5 w-fit">
                    <Clock size={12} /> {apt.time}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 w-fit">
                    <CheckCircle2 size={12} /> {apt.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{apt.doctor}</h4>
                  <p className="text-xs text-slate-400 mb-2">{apt.title}</p>
                  <p className="text-sm font-semibold text-primary-600">{apt.treatment}</p>
                  <p className="text-xs text-slate-500 mt-1">{apt.type}</p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 flex-wrap">
                <button
                  onClick={() => alert("Reschedule module opening...")}
                  className="flex-1 md:w-32 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={12} /> Reschedule
                </button>
                <button
                  onClick={() => handleCancelApt(apt.id)}
                  disabled={cancellingId === apt.id}
                  className="flex-1 md:w-32 px-4 py-2.5 rounded-xl border border-rose-100 text-rose-500 text-xs font-semibold hover:bg-rose-50/50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle size={12} /> {cancellingId === apt.id ? "Processing..." : "Cancel Visit"}
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          pastAppointments.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-85"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Calendar size={12} /> {apt.date}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Clock size={12} /> {apt.time}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                    <CheckCircle2 size={12} /> {apt.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">{apt.doctor}</h4>
                  <p className="text-xs text-slate-400 mb-2">{apt.title}</p>
                  <p className="text-sm font-semibold text-slate-600">{apt.treatment}</p>
                  <p className="text-xs text-slate-400 mt-1">{apt.type}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert("Downloading treatment invoice...")}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <FileText size={12} /> View Invoice
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
