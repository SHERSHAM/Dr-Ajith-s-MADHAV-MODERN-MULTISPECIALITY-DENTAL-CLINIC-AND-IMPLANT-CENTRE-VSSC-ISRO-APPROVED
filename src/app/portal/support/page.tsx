"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, PlusCircle, Calendar, MessageSquare, ChevronDown, CheckCircle2, Clock } from "lucide-react";

export default function PortalSupport() {
  const [tickets, setTickets] = useState([
    { id: "t-1002", category: "Billing & Payments", subject: "Refund on double payment check", status: "Resolved", date: "June 12, 2026", desc: "I made a double payment via UPI for my scaling procedure. The bank confirmed both were debited. Please refund one instance." },
    { id: "t-1005", category: "Lab Reports", subject: "CBCT Jaw Scan download failing", status: "Open", date: "June 10, 2026", desc: "The CBCT Jaw Scan report is showing a network error when I attempt to download the high-resolution file. Can you assist?" },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ category: "Billing & Payments", subject: "", desc: "" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.desc) return;

    setTickets([
      ...tickets,
      {
        id: `t-${1000 + Math.floor(Math.random() * 9000)}`,
        category: newTicket.category,
        subject: newTicket.subject,
        status: "Open",
        date: new Date().toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }),
        desc: newTicket.desc,
      },
    ]);
    setNewTicket({ category: "Billing & Payments", subject: "", desc: "" });
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Help & Patient Support
          </h1>
          <p className="text-slate-400 text-sm">Submit support requests, ask billing questions, or report technical portal issues</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-semibold shadow-md shadow-primary-600/10 flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlusCircle size={16} /> Open Support Ticket
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((t) => {
          const isExpanded = expandedId === t.id;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : t.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/30 transition-colors"
              >
                <div className="space-y-2 flex-1 pr-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-500">
                      {t.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Ticket ID: #{t.id}</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      t.status === "Resolved" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {t.status === "Resolved" ? <CheckCircle2 size={12} /> : <Clock size={12} />} {t.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{t.subject}</h4>
                  <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar size={10} /> Created: {t.date}
                  </div>
                </div>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-50 bg-slate-50/10"
                  >
                    <div className="p-5 text-xs sm:text-sm text-slate-600 space-y-4">
                      <div>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</span>
                        <p className="leading-relaxed">{t.desc}</p>
                      </div>
                      {t.status === "Resolved" && (
                        <div className="p-3 bg-green-50/50 border border-green-100 rounded-xl text-green-800 text-xs">
                          <span className="font-bold">Clinic Response:</span>
                          <p className="mt-1">We have initiated a refund of ₹22,500. It will reflect in your account within 3 business days.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Create Ticket Modal */}
      <AnimatePresence>
        {addOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddOpen(false)}
              className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-slate-700 space-y-6"
              >
                <h3 className="text-xl font-bold font-heading text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Open New Support Ticket
                </h3>

                <form onSubmit={handleCreateTicket} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all bg-white"
                    >
                      <option value="Billing & Payments">Billing & Payments</option>
                      <option value="Lab Reports">Lab Reports</option>
                      <option value="Appointments">Appointments</option>
                      <option value="Other / General Inquiry">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Issue with download..."
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Details Description</label>
                    <textarea
                      rows={4}
                      placeholder="Detail your request..."
                      value={newTicket.desc}
                      onChange={(e) => setNewTicket({ ...newTicket, desc: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setAddOpen(false)}
                      className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary-600/10 transition-all"
                    >
                      Create Ticket
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
