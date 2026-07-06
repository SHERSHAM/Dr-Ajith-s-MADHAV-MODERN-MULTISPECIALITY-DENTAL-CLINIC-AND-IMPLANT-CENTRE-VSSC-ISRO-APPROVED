"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Receipt, Download, CreditCard, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PortalInvoices() {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const paid = localStorage.getItem("implant_invoice_paid") === "true";
    setIsPaid(paid);
  }, []);

  const invoices = [
    {
      id: "inv-2041",
      date: "June 10, 2026",
      treatment: "Dental Implants (First Stage Surgery)",
      amount: 25000,
      paid: isPaid ? 25000 : 22500,
      due: isPaid ? 0 : 2500,
      status: isPaid ? "Paid" : "Partial",
    },
    {
      id: "inv-1891",
      date: "April 15, 2026",
      treatment: "Laser Periodontal Curettage & Swab scan",
      amount: 6500,
      paid: 6500,
      due: 0,
      status: "Paid",
    },
    {
      id: "inv-1502",
      date: "November 5, 2025",
      treatment: "Esthetic Restoration (#17 Molar)",
      amount: 2800,
      paid: 2800,
      due: 0,
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Billing Invoices
        </h1>
        <p className="text-slate-400 text-sm">Review clinical statements, treatment costs, and pending balances</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {invoices.map((inv) => (
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
                  Invoice ID: #{inv.id}
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
                onClick={() => alert(`Downloading Invoice PDF #${inv.id}...`)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={12} /> Receipt
              </button>
              {inv.due > 0 && (
                <Link
                  href="/portal/payments"
                  className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-md shadow-primary-600/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <CreditCard size={12} /> Pay Due Balance
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
