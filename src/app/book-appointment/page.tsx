"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { TREATMENTS } from "@/data/treatments";
import { DOCTORS } from "@/data/doctors";
import { Calendar, User, Clock, CheckCircle2, ArrowLeft, ArrowRight, Phone } from "lucide-react";

const steps = ["Treatment", "Doctor", "Date & Time", "Your Details", "Confirmation"];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
  "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
];

export default function BookAppointmentPage() {
  const [step, setStep] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedTreatment;
      case 1: return !!selectedDoctor;
      case 2: return !!selectedDate && !!selectedTime;
      case 3: return !!formData.name && !!formData.phone;
      default: return false;
    }
  };

  const nextDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  return (
    <>
      <section className="relative pt-32 pb-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-sm font-semibold text-teal-400 tracking-wider uppercase mb-4">Book Now</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Book Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #20c9ad, #50e0c5)" }}>Appointment</span>
            </h1>
            <p className="text-lg text-white/60">Quick and easy appointment booking in just a few steps.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="section-padding bg-white -mt-8">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Progress */}
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i <= step ? "bg-primary-600 text-white shadow-lg" : "bg-neutral-100 text-neutral-400"
                  }`}>
                    {i < step ? <CheckCircle2 size={18} /> : i + 1}
                  </div>
                  <span className={`hidden md:block ml-2 text-xs font-medium ${i <= step ? "text-primary-600" : "text-neutral-400"}`}>{s}</span>
                  {i < steps.length - 1 && <div className={`w-8 md:w-16 h-0.5 mx-2 ${i < step ? "bg-primary-500" : "bg-neutral-200"}`} />}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Select Treatment</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                    {TREATMENTS.map((t) => (
                      <button key={t.id} onClick={() => setSelectedTreatment(t.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          selectedTreatment === t.id ? "border-primary-500 bg-primary-50 shadow-md" : "border-neutral-100 hover:border-primary-200"
                        }`}>
                        <h4 className="font-semibold text-primary-950 text-sm">{t.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1">{t.duration} • {t.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Select Doctor</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DOCTORS.map((d) => (
                      <button key={d.id} onClick={() => setSelectedDoctor(d.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all ${
                          selectedDoctor === d.id ? "border-primary-500 bg-primary-50 shadow-md" : "border-neutral-100 hover:border-primary-200"
                        }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-teal-200 flex items-center justify-center text-lg">👨‍⚕️</div>
                          <div>
                            <h4 className="font-semibold text-primary-950 text-sm">{d.name}</h4>
                            <p className="text-xs text-teal-600">{d.title}</p>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-400">{d.timings}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Select Date & Time</h2>
                  <h3 className="font-semibold text-primary-950 mb-3 text-sm">Choose Date</h3>
                  <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                    {nextDays.map((d) => {
                      const dateStr = d.toISOString().split("T")[0];
                      return (
                        <button key={dateStr} onClick={() => setSelectedDate(dateStr)}
                          className={`flex-shrink-0 w-16 py-3 rounded-xl text-center border-2 transition-all ${
                            selectedDate === dateStr ? "border-primary-500 bg-primary-50" : "border-neutral-100 hover:border-primary-200"
                          }`}>
                          <p className="text-xs text-neutral-400">{d.toLocaleDateString("en", { weekday: "short" })}</p>
                          <p className="text-lg font-bold text-primary-950">{d.getDate()}</p>
                          <p className="text-xs text-neutral-400">{d.toLocaleDateString("en", { month: "short" })}</p>
                        </button>
                      );
                    })}
                  </div>
                  <h3 className="font-semibold text-primary-950 mb-3 text-sm">Choose Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button key={time} onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                          selectedTime === time ? "border-primary-500 bg-primary-50 text-primary-600" : "border-neutral-100 text-neutral-600 hover:border-primary-200"
                        }`}>
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-primary-950 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Your Details</h2>
                  <div className="space-y-5">
                    {[
                      { name: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
                      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX", required: true },
                      { name: "email", label: "Email (Optional)", type: "email", placeholder: "your@email.com", required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-primary-900 mb-2">{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder} required={field.required}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
                          value={formData[field.name as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2">Notes (Optional)</label>
                      <textarea rows={3} placeholder="Any special requirements or concerns?"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm resize-none"
                        value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-primary-950 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Appointment Booked!</h2>
                  <p className="text-neutral-500 mb-8 max-w-md mx-auto">Your appointment has been successfully scheduled. You will receive a confirmation via WhatsApp and email shortly.</p>
                  <div className="bg-neutral-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-neutral-500">Treatment</span><span className="font-medium text-primary-950">{TREATMENTS.find((t) => t.id === selectedTreatment)?.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-neutral-500">Doctor</span><span className="font-medium text-primary-950">{DOCTORS.find((d) => d.id === selectedDoctor)?.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-neutral-500">Date</span><span className="font-medium text-primary-950">{selectedDate && new Date(selectedDate).toLocaleDateString("en", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-neutral-500">Time</span><span className="font-medium text-primary-950">{selectedTime}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-neutral-500">Patient</span><span className="font-medium text-primary-950">{formData.name}</span></div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm ${
                  step === 0 ? "opacity-0" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all ${
                  canProceed()
                    ? "text-white shadow-lg hover:shadow-xl"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
                style={canProceed() ? { background: "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 100%)" } : {}}
              >
                {step === 3 ? "Confirm Booking" : "Continue"} <ArrowRight size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
