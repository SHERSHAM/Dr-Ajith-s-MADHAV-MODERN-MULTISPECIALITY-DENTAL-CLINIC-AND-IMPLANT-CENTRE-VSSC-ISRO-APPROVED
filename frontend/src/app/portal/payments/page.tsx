"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, IndianRupee, Landmark, Smartphone, CheckCircle2 } from "lucide-react";

export default function PortalPayments() {
  const [payAmount, setPayAmount] = useState("2500");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const baseHistory = [
    { id: "tx-88021", date: "June 10, 2026", desc: "First Stage Surgical Implant", amount: 22500, method: "Credit Card (Visa)", ref: "Razorpay_9A0284" },
    { id: "tx-86104", date: "April 15, 2026", desc: "Gum Deep Scaling Visit", amount: 6500, method: "UPI (Google Pay)", ref: "UPI_9104829104" },
    { id: "tx-75010", date: "Nov 5, 2025", desc: "Esthetic Filling Restorations", amount: 2800, method: "Net Banking (SBI)", ref: "SBI_284902840" },
  ];

  const [paymentHistory, setPaymentHistory] = useState(baseHistory);

  useEffect(() => {
    const paid = localStorage.getItem("implant_invoice_paid") === "true";
    setIsPaid(paid);
    if (paid) {
      setPayAmount("0");
      setPaymentHistory([
        { id: "tx-89104", date: new Date().toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }), desc: "Implant Stage 1 Due Payment Balance", amount: 2500, method: "UPI (Google Pay)", ref: "Razorpay_9A0300" },
        ...baseHistory
      ]);
    }
  }, [success]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      localStorage.setItem("implant_invoice_paid", "true");
      setIsPaid(true);
      setPayAmount("0");
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Payments & Checkout
        </h1>
        <p className="text-slate-400 text-sm">Make online payments or view your historical transaction records</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
              Pay Due Balance
            </h3>

            {success ? (
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Payment Successful!</h4>
                <p className="text-xs text-slate-400">Your billing statement has been updated. Receipt emailed.</p>
              </motion.div>
            ) : (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amount to Pay</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm font-semibold text-slate-800 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "upi", label: "UPI", icon: Smartphone },
                      { id: "card", label: "Card", icon: CreditCard },
                      { id: "net", label: "Net Bank", icon: Landmark },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-xs font-medium gap-1.5 transition-all ${
                          paymentMethod === method.id
                            ? "border-primary-500 bg-primary-50 text-primary-600"
                            : "border-slate-100 text-slate-500 hover:border-slate-200"
                        }`}
                      >
                        <method.icon size={16} />
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-md shadow-primary-600/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? "Processing payment..." : `Pay ₹${Number(payAmount).toLocaleString()}`}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-2 border-t border-slate-50">
                  <ShieldCheck size={12} className="text-teal-500" />
                  Secured by Razorpay Integration.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Transaction History
          </h3>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Transaction / Treatment</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Reference ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
                  {paymentHistory.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <span className="block font-bold text-slate-800 text-xs sm:text-sm">{tx.desc}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">ID: #{tx.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{tx.method}</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-400">{tx.ref}</td>
                      <td className="px-6 py-4 text-xs text-slate-400">{tx.date}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-800">₹{tx.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
