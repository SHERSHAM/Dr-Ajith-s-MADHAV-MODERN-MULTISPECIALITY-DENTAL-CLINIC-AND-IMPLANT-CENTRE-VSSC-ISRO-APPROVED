"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, PlusCircle, Trash2, Calendar, Smile, ShieldAlert } from "lucide-react";

export default function PortalFamily() {
  const [family, setFamily] = useState([
    { id: "fam-1", name: "Jane Doe", relation: "Spouse", age: 34, lastVisit: "April 10, 2026", idNo: "#MD-3902" },
    { id: "fam-2", name: "Sarah Doe", relation: "Child", age: 6, lastVisit: "May 20, 2026", idNo: "#MD-8401" },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", relation: "Spouse", age: "" });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.age) return;

    setFamily([
      ...family,
      {
        id: `fam-${family.length + 1}`,
        name: newMember.name,
        relation: newMember.relation,
        age: Number(newMember.age),
        lastVisit: "N/A - Not visited",
        idNo: `#MD-${Math.floor(1000 + Math.random() * 9000)}`,
      },
    ]);
    setNewMember({ name: "", relation: "Spouse", age: "" });
    setAddOpen(false);
  };

  const handleRemoveMember = (id: string) => {
    if (confirm("Are you sure you want to remove this family member link?")) {
      setFamily(family.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-heading" style={{ fontFamily: "var(--font-heading)" }}>
            Family Members Management
          </h1>
          <p className="text-slate-400 text-sm">Add or link family profiles to manage appointments and records together</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-semibold shadow-md shadow-primary-600/10 flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlusCircle size={16} /> Link New Member
        </button>
      </div>

      {/* Grid of members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {family.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between gap-4"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl flex-shrink-0">
                {member.relation === "Child" ? "👧" : "👩"}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800">{member.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-semibold text-slate-500">
                    {member.relation}
                  </span>
                </div>
                <p className="text-xs text-slate-400">ID: {member.idNo} • Age: {member.age} years</p>
                <div className="text-xs text-slate-500 pt-2 flex items-center gap-1">
                  <Calendar size={12} className="text-slate-400" />
                  <span>Last checkup: {member.lastVisit}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemoveMember(member.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 transition-colors"
              title="Remove Profile"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
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
                  Link Family Profile
                </h3>

                <form onSubmit={handleAddMember} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Member Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Relation</label>
                      <select
                        value={newMember.relation}
                        onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all bg-white"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Age</label>
                      <input
                        type="number"
                        placeholder="30"
                        value={newMember.age}
                        onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-400 outline-none text-sm text-slate-800 transition-all"
                        required
                      />
                    </div>
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
                      Add Profile
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
