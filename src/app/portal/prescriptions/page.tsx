"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, User, Download, Pill, Activity } from "lucide-react";

export default function PortalPrescriptions() {
  const prescriptions = [
    {
      id: "rx-9821",
      date: "June 10, 2026",
      doctor: "Dr. Ajith Madhav",
      title: "Chief Surgeon",
      medications: [
        { name: "Amoxicillin 500mg", type: "Antibiotic", dosage: "1 tablet - thrice a day", timing: "Post Meals", duration: "5 Days" },
        { name: "Paracetamol 650mg", type: "Pain Reliever", dosage: "1 tablet - as needed", timing: "SOS (Post Meals)", duration: "3 Days" },
      ],
      instructions: "Take antibiotics on time to avoid secondary infections. Avoid extremely hot meals for the next 24 hours.",
    },
    {
      id: "rx-9104",
      date: "April 15, 2026",
      doctor: "Dr. Lakshmi Menon",
      title: "Gum Specialist",
      medications: [
        { name: "Chlorhexidine Mouthwash 0.2%", type: "Antiseptic", dosage: "10ml - twice a day", timing: "Rinse after brushing", duration: "10 Days" },
      ],
      instructions: "Do not eat or drink for 30 minutes after rinsing.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Prescriptions
        </h1>
        <p className="text-slate-400 text-sm">View or download your active/past medications prescribed by our specialists</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {prescriptions.map((rx, i) => (
          <motion.div
            key={rx.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            {/* Header info */}
            <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  Prescription ID: #{rx.id}
                </span>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {rx.date}</span>
                  <span className="flex items-center gap-1.5"><User size={12} /> {rx.doctor} ({rx.title})</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Downloading PDF copy of Rx #${rx.id}...`)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-full flex items-center justify-center gap-2 transition-all w-fit"
              >
                <Download size={12} /> Download PDF
              </button>
            </div>

            {/* Med List */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rx.medications.map((med, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                      <div className="p-3 bg-white text-primary-600 rounded-xl h-fit shadow-sm">
                        <Pill size={18} />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-slate-800 text-sm">{med.name}</h5>
                        <p className="text-xs text-slate-400 font-medium">{med.type} • {med.duration}</p>
                        <div className="text-xs text-slate-600 pt-1">
                          <span className="font-semibold">Dosage:</span> {med.dosage}
                        </div>
                        <div className="text-[10px] text-slate-500 italic">
                          {med.timing}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 flex gap-3 text-xs text-amber-800">
                <Activity size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Instructions & Care Notes:</span>
                  <p className="mt-1 leading-relaxed">{rx.instructions}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
