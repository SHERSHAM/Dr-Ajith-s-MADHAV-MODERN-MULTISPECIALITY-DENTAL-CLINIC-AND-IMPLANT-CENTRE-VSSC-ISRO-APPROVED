"use client";

import { motion } from "framer-motion";
import { Stethoscope, FileText, Upload, Plus, AlertCircle, Heart } from "lucide-react";
import { useState } from "react";

export default function PortalMedicalHistory() {
  const [documents, setDocuments] = useState([
    { name: "Allergy Report.pdf", size: "1.2 MB", date: "April 12, 2026" },
    { name: "CBCT Jaw Scan 2025.png", size: "14.5 MB", date: "Nov 20, 2025" },
  ]);

  const historyTimeline = [
    {
      date: "June 10, 2026",
      title: "Consultation & 3D Imaging",
      doctor: "Dr. Ajith Madhav",
      notes: "CBCT jaw scan completed. Evaluated bone structure for implant in region #36. Sufficient bone height confirmed. Recommended implant schedule.",
    },
    {
      date: "April 15, 2026",
      title: "Laser Periodontal Cleaning",
      doctor: "Dr. Lakshmi Menon",
      notes: "Scaling and root planing of lower jaw utilizing diode laser. Healthy soft tissue healing confirmed. Instructed patient on flossing schedule.",
    },
    {
      date: "November 5, 2025",
      title: "Composite Restoration",
      doctor: "Dr. Rahul Krishnan",
      notes: "Esthetic composite restoration performed on right upper molar (#17) due to minor occlusal cavity. Smooth bite confirmation completed.",
    },
  ];

  const handleUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        setDocuments([
          ...documents,
          {
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: new Date().toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }),
          },
        ]);
      }
    };
    fileInput.click();
  };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Baseline Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            <Heart size={16} className="text-rose-500" /> Patient Medical Profile
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block text-slate-400 font-medium">Blood Group</span>
              <span className="font-bold text-slate-800 text-sm">O Positive (O+)</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Chronic Diseases</span>
              <span className="font-bold text-slate-800 text-sm">None</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Heart Conditions</span>
              <span className="font-bold text-slate-800 text-sm">No</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Pregnancy / Lactating</span>
              <span className="font-bold text-slate-800 text-sm">N/A</span>
            </div>
          </div>
        </div>

        {/* Allergies Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            <AlertCircle size={16} className="text-amber-500" /> Known Allergies
          </h3>
          <div className="space-y-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
              Penicillin Allergy
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 ml-2">
              Lactose Intolerance (Mild)
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed mt-2">
              Please inform your doctor if you have other sensitivities.
            </p>
          </div>
        </div>

        {/* Upload documents panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800 text-sm font-heading" style={{ fontFamily: "var(--font-heading)" }}>Upload Records</h3>
            <p className="text-slate-400 text-xs">Upload external X-rays, lab results, or certificates</p>
          </div>
          <button
            onClick={handleUpload}
            className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-primary-600 border border-dashed border-primary-200 hover:border-primary-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Upload size={14} /> Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline of visits */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Treatment & Visit Timeline
          </h3>

          <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-8">
            {historyTimeline.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-md" />
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400">{item.date}</span>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                      <span className="text-xs font-semibold text-slate-400">{item.doctor}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Uploaded Records ({documents.length})
          </h3>

          <div className="space-y-3">
            {documents.map((doc, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4 hover:shadow transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded-xl">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs truncate max-w-[150px]">{doc.name}</h5>
                    <p className="text-slate-400 text-[10px]">{doc.size} • {doc.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Downloading ${doc.name}...`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-[10px] font-semibold text-slate-600 transition-colors"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
