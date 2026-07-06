"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Bell, ShieldCheck, Lock, EyeOff } from "lucide-react";

export default function PortalSettings() {
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [notifications, setNotifications] = useState({ whatsapp: true, email: true, checkupReminders: true });
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveNotify = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 1000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setSuccess(false), 2500);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
          Portal Settings
        </h1>
        <p className="text-slate-400 text-sm">Configure security updates, email alerts and message options</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Notifications Preference */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            <Bell size={18} className="text-primary-500" /> Notification Preferences
          </h3>

          <div className="space-y-4">
            {[
              { id: "whatsapp", label: "WhatsApp Alerts", desc: "Receive appointment confirmations, status reviews & digital prescriptions directly on WhatsApp." },
              { id: "email", label: "Email Correspondence", desc: "Receive monthly newsletters, bills copy and checkup instructions." },
              { id: "checkupReminders", label: "6-Month Check-up reminders", desc: "Receive early checkup reminders every six months automatically." },
            ].map((pref) => (
              <div key={pref.id} className="flex items-start justify-between gap-4 py-3 border-b border-slate-50">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">{pref.label}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-md">{pref.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[pref.id as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [pref.id]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveNotify}
            disabled={saving}
            className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-primary-600 border border-slate-200 hover:border-primary-300 rounded-xl text-xs font-semibold transition-all w-fit"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            <Lock size={18} className="text-teal-500" /> Change Security Password
          </h3>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            {success && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ShieldCheck size={16} /> Changes successfully updated!
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all"
            >
              {saving ? "Updating..." : "Update Security Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
