"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Plus, 
  Trash, 
  Check, 
  Printer, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export default function DoctorPrescriptions() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selected appointment
  const [selectedApptId, setSelectedApptId] = useState("");
  
  // Medicines list
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; instructions: string }[]>([
    { name: "", dosage: "", instructions: "" }
  ]);
  const [generalInstructions, setGeneralInstructions] = useState("");
  const [digitalSign, setDigitalSign] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Predefined treatment templates to make practice lightning-fast!
  const TEMPLATES = [
    {
      name: "Standard Post-Extraction Template",
      general: "Take medicines after food. Avoid hot/spicy foods for 24 hours.",
      medicines: [
        { name: "Amoxicillin 500mg", dosage: "1-0-1 (Twice daily)", instructions: "5 Days - After food" },
        { name: "Paracetamol 650mg", dosage: "1-1-1 (Thrice daily)", instructions: "3 Days - For pain control" },
        { name: "Chlorhexidine Mouthwash", dosage: "10ml rinse", instructions: "Twice daily starting tomorrow" },
      ],
    },
    {
      name: "Root Canal Post-Op Template",
      general: "Avoid chewing from the treated side. Follow up in 7 days for permanent restoration.",
      medicines: [
        { name: "Ibuprofen 400mg", dosage: "1-0-1 (Twice daily)", instructions: "3 Days - After food" },
        { name: "Amoxicillin 500mg", dosage: "1-0-1 (Twice daily)", instructions: "5 Days - If swelling persists" },
      ],
    },
  ];

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          // Allow prescription for active/completed/arrived appointments
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", instructions: "" }]);
  };

  const handleRemoveMedicine = (idx: number) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleMedicineChange = (idx: number, field: string, val: string) => {
    const updated = [...medicines];
    updated[idx] = { ...updated[idx], [field]: val };
    setMedicines(updated);
  };

  const applyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setMedicines(tpl.medicines);
    setGeneralInstructions(tpl.general);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApptId) return;
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedApptId,
          medicines,
          instructions: generalInstructions,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Clear input form
        setMedicines([{ name: "", dosage: "", instructions: "" }]);
        setGeneralInstructions("");
        setDigitalSign(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-800 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Clinical Prescriptions
        </h1>
        <p className="text-slate-500 text-sm">Create clinical drug statements, apply quick templates, and digitally sign PDFs</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-3xl flex items-center gap-3">
          <CheckCircle2 size={24} className="text-green-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Prescription Saved Successfully!</h4>
            <p className="text-xs text-green-600 mt-1">The prescription is now active in the database and visible in the Patient Portal.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prescription Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Patient Appointment */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Active Patient</label>
              <select
                required
                value={selectedApptId}
                onChange={(e) => {
                  setSelectedApptId(e.target.value);
                  setSuccess(false);
                }}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm bg-white"
              >
                <option value="">-- Choose patient appointment slot --</option>
                {appointments.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.user?.name} ({app.reason || "Consultation"}) - {app.date} {app.time}
                  </option>
                ))}
              </select>
            </div>

            {/* Predefined Templates */}
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Templates Shortcut</span>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((tpl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => applyTemplate(tpl)}
                    className="px-3 py-2 bg-slate-50 hover:bg-primary-50 hover:border-primary-300 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 transition-all"
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Medicines List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Medicines & Dosages</span>
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="text-xs text-primary-600 hover:text-primary-700 font-bold flex items-center gap-1"
                >
                  <Plus size={14} /> Add Medicine
                </button>
              </div>

              {medicines.map((med, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 relative space-y-3">
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(idx)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-200"
                    >
                      <Trash size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Drug Name</label>
                      <input
                        type="text"
                        placeholder="Amoxicillin 500mg"
                        required
                        value={med.name}
                        onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Dosage</label>
                      <input
                        type="text"
                        placeholder="1-0-1 (After Food)"
                        required
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Instructions</label>
                      <input
                        type="text"
                        placeholder="5 Days"
                        required
                        value={med.instructions}
                        onChange={(e) => handleMedicineChange(idx, "instructions", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">General Instructions (Optional)</label>
              <textarea
                rows={3}
                value={generalInstructions}
                onChange={(e) => setGeneralInstructions(e.target.value)}
                placeholder="Type diet restrictions, rinse instructions, or follow-up instructions..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-xs resize-none"
              />
            </div>

            {/* Digital Signature */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="digiSign"
                checked={digitalSign}
                onChange={(e) => setDigitalSign(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300"
              />
              <label htmlFor="digiSign" className="text-xs font-semibold text-slate-600 cursor-pointer">
                Digitally sign this prescription with my clinical credentials
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-primary-950/5 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all"
            >
              {submitting ? "Saving..." : "Generate & Sign Prescription"} <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Quick Printing layout / instructions */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-slate-200 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
            <h3 className="font-heading font-bold text-base flex items-center gap-2 mb-2 text-white">
              <Printer size={18} className="text-teal-400" /> Print Guide
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Prescriptions saved in this portal are automatically synced to the patient's portal, where they can print or download them instantly!
            </p>
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Printer size={12} /> Test Page Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
