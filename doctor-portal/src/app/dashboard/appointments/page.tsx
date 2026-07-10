"use client";

import { useEffect, useState } from "react";
import { 
  Calendar,
  CheckCircle2, 
  Hourglass, 
  Stethoscope, 
  Armchair, 
  FileEdit,
  Save,
  Check
} from "lucide-react";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    setLoading(true);
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string, additional: any = {}) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...additional }),
      });

      if (response.ok) {
        // Optimistic state update or full refresh
        fetchAppointments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotes = async (id: string) => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesText }),
      });

      if (response.ok) {
        setEditingNotesId(null);
        fetchAppointments();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditNotes = (id: string, currentNotes: string) => {
    setEditingNotesId(id);
    setNotesText(currentNotes || "");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-800 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Clinical Schedules
        </h1>
        <p className="text-slate-500 text-sm">Verify patient check-ins, record observation notes, and assign chairs</p>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto" />
          <p className="text-xs text-slate-400 mt-2">Loading appointments schedule...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <span className="text-4xl block mb-2">📅</span>
          <h4 className="font-bold text-slate-800 text-sm">No Appointments Scheduled</h4>
          <p className="text-xs text-slate-400 mt-1">There are no patient visits logged in the clinic system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {appointments.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col xl:flex-row xl:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <Calendar size={12} /> {app.date} at {app.time}
                  </span>
                  {app.chairNumber && (
                    <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-semibold text-teal-700 flex items-center gap-1.5">
                      <Armchair size={12} /> {app.chairNumber}
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    app.status === "COMPLETED" 
                      ? "bg-green-50 text-green-700 border border-green-100" 
                      : app.status === "ARRIVED" 
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : app.status === "PENDING"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : "bg-slate-50 text-slate-600 border border-slate-100"
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-base">{app.user?.name || "Patient Profile"}</h4>
                  <p className="text-xs text-slate-400 mt-1">Phone: {app.user?.phone || "N/A"} • Treatment: {app.reason || "General Consultation"}</p>
                </div>

                {/* Observation / Clinical Notes Block */}
                <div className="pt-2">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Clinical Observations</span>
                  {editingNotesId === app.id ? (
                    <div className="flex flex-col gap-2 max-w-xl">
                      <textarea
                        rows={3}
                        value={notesText}
                        onChange={(e) => setNotesText(e.target.value)}
                        placeholder="Type clinical observations, diagnosis, or recommendations..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-xs resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNotes(app.id)}
                          disabled={submitting}
                          className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-bold hover:bg-primary-700 flex items-center gap-1 shadow-sm"
                        >
                          <Save size={12} /> {submitting ? "Saving..." : "Save Notes"}
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl max-w-xl">
                      <p className="text-xs text-slate-600 italic flex-1">
                        {app.notes || "No clinical observations recorded yet."}
                      </p>
                      <button
                        onClick={() => handleEditNotes(app.id, app.notes)}
                        className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700"
                      >
                        <FileEdit size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex flex-wrap gap-2 xl:self-center">
                {app.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(app.id, "CONFIRMED")}
                      className="px-4 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-md shadow-primary-600/5 flex items-center gap-1.5"
                    >
                      <Check size={14} /> Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "CANCELLED")}
                      className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      Reject
                    </button>
                  </>
                )}

                {app.status === "CONFIRMED" && (
                  <button
                    onClick={() => updateStatus(app.id, "ARRIVED", { chairNumber: "Chair 1" })}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/5 flex items-center gap-1.5"
                  >
                    <Armchair size={14} /> Mark Arrived (Assign Chair)
                  </button>
                )}

                {app.status === "ARRIVED" && (
                  <button
                    onClick={() => updateStatus(app.id, "COMPLETED")}
                    className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 shadow-md shadow-green-600/5 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Complete & Bill
                  </button>
                )}

                {app.status === "COMPLETED" && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
                    <CheckCircle2 size={14} /> Treatment Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
