"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video, FileText, CheckCircle2, AlertCircle, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export default function PortalAppointments() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter dynamic appointments
  const upcomingAppointments = appointments.filter((apt) => {
    const isPastDate = new Date(apt.date) < new Date(new Date().setHours(0,0,0,0));
    return apt.status !== "CANCELLED" && apt.status !== "COMPLETED" && !isPastDate;
  });

  const pastAppointments = appointments.filter((apt) => {
    const isPastDate = new Date(apt.date) < new Date(new Date().setHours(0,0,0,0));
    return apt.status === "CANCELLED" || apt.status === "COMPLETED" || isPastDate;
  });

  const handleCancelApt = async (id: string) => {
    setCancellingId(id);
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "CANCELLED" }),
      });
      if (res.ok) {
        await fetchAppointments();
        alert("Appointment cancelled successfully.");
      } else {
        alert("Failed to cancel appointment. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred. Please try again.");
    } finally {
      setCancellingId(null);
    }
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
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto" />
            <p className="text-xs text-slate-450 mt-2">Loading appointments...</p>
          </div>
        ) : activeTab === "upcoming" ? (
          upcomingAppointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
              <span className="text-4xl block mb-2">🗓️</span>
              <h4 className="font-bold text-slate-800 text-sm">No Upcoming Appointments</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">You don't have any upcoming visits scheduled.</p>
              <Link href="/portal/appointments" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow transition-all inline-block">
                Schedule One Now
              </Link>
            </div>
          ) : (
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
                      <Calendar size={12} /> {new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5 w-fit">
                      <Clock size={12} /> {apt.time}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit ${
                      apt.status === "CONFIRMED" 
                        ? "bg-green-50 text-green-700" 
                        : apt.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      <CheckCircle2 size={12} /> {apt.status.charAt(0) + apt.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{apt.doctorName}</h4>
                    <p className="text-xs text-slate-400 mb-2">Chief Specialist • MD</p>
                    <p className="text-sm font-semibold text-primary-600">{apt.reason || "Routine Checkup"}</p>
                    <p className="text-xs text-slate-500 mt-1">In-Person Clinic Visit</p>
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
          )
        ) : pastAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <span className="text-4xl block mb-2">📜</span>
            <h4 className="font-bold text-slate-800 text-sm">No Past Visits</h4>
            <p className="text-xs text-slate-400 mt-1">You have no records of completed appointments.</p>
          </div>
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
                    <Calendar size={12} /> {new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Clock size={12} /> {apt.time}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    apt.status === "COMPLETED" 
                      ? "bg-slate-100 text-slate-600" 
                      : "bg-red-50 text-red-700"
                  }`}>
                    <CheckCircle2 size={12} /> {apt.status.charAt(0) + apt.status.slice(1).toLowerCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">{apt.doctorName}</h4>
                  <p className="text-xs text-slate-400 mb-2">Chief Specialist • MD</p>
                  <p className="text-sm font-semibold text-slate-600">{apt.reason || "Routine Checkup"}</p>
                  <p className="text-xs text-slate-400 mt-1">In-Person Clinic Visit</p>
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
