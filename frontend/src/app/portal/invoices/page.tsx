"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Receipt, Download, CreditCard, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PortalInvoices() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments) {
          setAppointments(data.appointments);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Map database invoices
  const invoices: any[] = [];
  appointments.forEach((app) => {
    if (app.invoices) {
      app.invoices.forEach((inv: any) => {
        invoices.push({
          id: inv.id,
          displayId: inv.id.slice(0, 6).toUpperCase(),
          date: new Date(inv.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          treatment: app.reason || "Dental Consultation",
          amount: inv.amount,
          paid: inv.status === "PAID" ? inv.amount : 0,
          due: inv.status === "UNPAID" ? inv.amount : 0,
          status: inv.status === "PAID" ? "Paid" : "Unpaid",
        });
      });
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Billing Invoices
        </h1>
        <p className="text-slate-400 text-sm">Review clinical statements, treatment costs, and pending balances</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading billing statements...</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
            <span className="text-4xl block mb-2">🧾</span>
            <h4 className="font-bold text-slate-800 text-sm">No Invoices Found</h4>
            <p className="text-xs text-slate-400 mt-1">You have no statements or bills on file at the moment.</p>
          </div>
        ) : (
          invoices.map((inv) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Invoice Info */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <Calendar size={12} /> {inv.date}
                  </span>
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full">
                    Invoice ID: #{inv.displayId}
                  </span>
                  {inv.status === "Paid" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                      <CheckCircle2 size={12} /> Full Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                      <AlertCircle size={12} /> Pending ₹{inv.due.toLocaleString()}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base">{inv.treatment}</h4>
                  <div className="grid grid-cols-3 gap-6 pt-3 text-xs text-slate-500 max-w-md">
                    <div>
                      <span className="block text-slate-400">Total Billed</span>
                      <span className="font-bold text-slate-700">₹{inv.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Paid Amount</span>
                      <span className="font-bold text-slate-700">₹{inv.paid.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Balance Due</span>
                      <span className={`font-bold ${inv.due > 0 ? "text-amber-600" : "text-slate-700"}`}>
                        ₹{inv.due.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Downloading Invoice PDF #${inv.displayId}...`)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={12} /> Receipt
                </button>
                {inv.due > 0 && (
                  <Link
                    href="/portal/payments"
                    className="px-4 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-primary-600/10"
                  >
                    <CreditCard size={12} /> Pay Now
                  </Link>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
