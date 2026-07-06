"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload, Eye, User, Calendar } from "lucide-react";

export default function PortalMessages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "clinic",
      text: "Hello John, Dr. Ajith reviewed your 3D CBCT scan. The bone density in the region of interest is sufficient for implant placement. We are good to go ahead with the first surgical step on July 12.",
      time: "July 5, 2026, 4:10 PM",
    },
    {
      id: 2,
      sender: "patient",
      text: "Thank you for the update! Should I fast before the procedure or take any medications?",
      time: "July 5, 2026, 5:15 PM",
    },
    {
      id: 3,
      sender: "clinic",
      text: "You do not need to fast. Please have a light breakfast 1 hour before the appointment. We have sent the pre-surgical medicine kit details to your Prescriptions tab. Please start them as instructed.",
      time: "July 6, 2026, 11:20 AM",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "patient",
        text: inputMessage,
        time: new Date().toLocaleString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      },
    ]);
    setInputMessage("");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
      {/* Clinic Chat Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            M
          </div>
          <div>
            <span className="block font-bold text-slate-800 text-sm leading-tight">Clinic Consultation Desk</span>
            <span className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Support
            </span>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/20">
        {messages.map((msg) => {
          const isPatient = msg.sender === "patient";
          return (
            <div key={msg.id} className={`flex ${isPatient ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md rounded-2xl px-4 py-3 text-sm shadow-sm ${
                isPatient
                  ? "bg-primary-600 text-white rounded-tr-none"
                  : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
              }`}>
                <p>{msg.text}</p>
                <span className={`block text-[9px] mt-1.5 ${isPatient ? "text-white/60 text-right" : "text-slate-400"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Inputs */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center gap-2 bg-white rounded-b-3xl">
        <button
          type="button"
          onClick={() => alert("Upload file/imaging reports panel opening...")}
          className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          title="Attach files"
        >
          <Upload size={18} />
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 py-3 px-4 rounded-xl bg-slate-50 border border-transparent focus:border-slate-200 outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400"
          required
        />
        <button
          type="submit"
          className="p-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/10 transition-all flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
