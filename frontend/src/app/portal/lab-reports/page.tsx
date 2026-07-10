"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Download, Calendar, User, Eye } from "lucide-react";

export default function PortalLabReports() {
  const reports = [
    {
      id: "lab-4902",
      name: "Complete Blood Hemogram & Clotting Time",
      category: "Hematology (Pre-surgical)",
      date: "June 9, 2026",
      doctor: "Dr. Ajith Madhav",
      size: "820 KB",
      status: "Verified",
    },
    {
      id: "lab-4811",
      name: "CBCT Jaw Scan (Reconstructive Orthopantomogram)",
      category: "3D Radiology & Imaging",
      date: "June 10, 2026",
      doctor: "Dr. Ajith Madhav",
      size: "14.2 MB",
      status: "Verified",
    },
    {
      id: "lab-3801",
      name: "Periodontal Pathogen Swab analysis",
      category: "Microbiology Analysis",
      date: "April 14, 2026",
      doctor: "Dr. Lakshmi Menon",
      size: "1.1 MB",
      status: "Verified",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Lab Reports & Diagnostics
        </h1>
        <p className="text-slate-400 text-sm">Access your dental scans, radiological records, and pre-treatment blood check results</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Referred By</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-400 rounded-lg flex-shrink-0">
                        <FileSpreadsheet size={16} />
                      </div>
                      <div>
                        <span className="block font-bold text-slate-800 text-xs sm:text-sm">{report.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">ID: #{report.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">{report.category}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{report.date}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{report.doctor}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => alert(`Opening diagnostic preview for ${report.name}...`)}
                        className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors"
                        title="View Report"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => alert(`Downloading report copy: ${report.name}...`)}
                        className="p-2 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 hover:text-primary-600 transition-colors"
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
