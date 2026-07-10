"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  CheckCircle2, 
  Hourglass, 
  MessageSquare,
  ArrowRight,
  Armchair,
  Sparkles,
  ClipboardList
} from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayCount: 0,
    waitingCount: 0,
    completedCount: 0,
  });

  // Chair allocations
  const [chairs, setChairs] = useState([
    { id: "Chair 1", patient: "No active patient", status: "Available", color: "text-green-500 bg-green-50 border-green-100" },
    { id: "Chair 2", patient: "No active patient", status: "Available", color: "text-green-500 bg-green-50 border-green-100" },
  ]);

  // Reception notifications/messages
  const receptionMessages = [
    { time: "Just now", text: "Reception: Patient Amit Sharma has checked in for Crown Treatment.", type: "urgent" },
    { time: "10 mins ago", text: "Lab: X-Ray scans uploaded for Patient Kavita Nair's Root Canal consultation.", type: "info" },
  ];

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
          
          // Compute today's counts
          const todayStr = new Date().toISOString().split("T")[0];
          const todayAppts = data.appointments.filter((a: any) => a.date === todayStr);
          const waiting = todayAppts.filter((a: any) => a.status === "ARRIVED" || a.status === "PENDING");
          const completed = todayAppts.filter((a: any) => a.status === "COMPLETED");

          setStats({
            todayCount: todayAppts.length,
            waitingCount: waiting.length,
            completedCount: completed.length,
          });

          // Sync chairs based on active appointments in status IN_PROGRESS/ARRIVED
          const activeChairs = [
            { id: "Chair 1", patient: "No active patient", status: "Available", color: "text-green-600 bg-green-50 border-green-200" },
            { id: "Chair 2", patient: "No active patient", status: "Available", color: "text-green-600 bg-green-50 border-green-200" },
          ];
          
          let chairIdx = 0;
          todayAppts.forEach((app: any) => {
            if (app.status === "ARRIVED" && chairIdx < 2) {
              activeChairs[chairIdx] = {
                id: `Chair ${chairIdx + 1}`,
                patient: app.user?.name || "Patient",
                status: "Occupied (Arrived)",
                color: "text-amber-600 bg-amber-50 border-amber-200",
              };
              chairIdx++;
            }
          });
          setChairs(activeChairs);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-800 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Clinical Workspace
          </h1>
          <p className="text-slate-500 text-sm">Review today's chair assignments, queue wait times, and treatments list</p>
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Today's Consultations", count: stats.todayCount, icon: Users, color: "from-primary-500 to-indigo-600" },
          { label: "Queue Waiting", count: stats.waitingCount, icon: Hourglass, color: "from-amber-500 to-orange-600" },
          { label: "Treatments Completed", count: stats.completedCount, icon: CheckCircle2, color: "from-teal-500 to-emerald-600" },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{s.label}</span>
                <span className="text-3xl font-black text-slate-800 mt-2 block">{s.count}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg shadow-primary-500/5`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Grid Layout - Responsive grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Today's Appointments & Chair Status */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chair Allocations */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2">
                <Armchair size={18} className="text-primary-600" /> Active Chairs Status
              </h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Real-time</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chairs.map((chair) => (
                <div key={chair.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-lg text-slate-600">💺</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800">{chair.id}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${chair.color}`}>{chair.status}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-1">{chair.patient}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Queue */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2">
                <ClipboardList size={18} className="text-primary-600" /> Today's Consultation Queue
              </h2>
              <Link href="/dashboard/appointments" className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto" />
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                🎉 No consultations scheduled for today.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
                {appointments.slice(0, 5).map((app) => (
                  <div key={app.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{app.user?.name || "Patient"}</h4>
                      <p className="text-xs text-slate-400 mt-1">{app.time} • {app.reason || "General Consultation"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        app.status === "COMPLETED" 
                          ? "bg-green-50 text-green-700 border border-green-100" 
                          : app.status === "ARRIVED" 
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "bg-slate-50 text-slate-600 border border-slate-100"
                      }`}>
                        {app.status}
                      </span>
                      <Link href="/dashboard/appointments" className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600">
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Messages & Quick Actions */}
        <div className="space-y-8">
          {/* Messages from Reception */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-primary-600" /> Internal Clinic Notices
              </h2>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>

            <div className="space-y-4">
              {receptionMessages.map((msg, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-slate-400 font-semibold">{msg.time}</span>
                    {msg.type === "urgent" && <span className="text-[8px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full">Urgent</span>}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick clinical updates */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden text-white">
            <div className="absolute top-[-30%] right-[-20%] w-48 h-48 rounded-full bg-primary-600/20 blur-3xl pointer-events-none" />
            <h3 className="font-heading font-bold text-base flex items-center gap-2 mb-2 text-white">
              <Sparkles size={18} className="text-teal-400" /> Clinic Management
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Ensure you mark patients as "Arrived" and click "Complete Consultation" to automatically generate payment invoices.
            </p>
            <Link 
              href="/dashboard/appointments" 
              className="py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary-600/10 hover:bg-primary-700"
            >
              Start Practice Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
