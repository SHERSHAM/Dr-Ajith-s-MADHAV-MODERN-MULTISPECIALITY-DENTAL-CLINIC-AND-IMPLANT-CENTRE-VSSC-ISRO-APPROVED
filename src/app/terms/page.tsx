import { CLINIC } from "@/data/clinic";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-primary-950 mb-8" style={{ fontFamily: "var(--font-heading)" }}>Terms & Conditions</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 leading-relaxed">
          <p><strong>Last updated:</strong> January 1, 2025</p>
          <p>By accessing and using the website and services of {CLINIC.name}, you agree to be bound by these Terms and Conditions.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Services</h2>
          <p>We provide dental consultation, diagnostic, and treatment services. All treatments are performed by qualified dental professionals. Treatment plans are customized to individual patient needs and are subject to clinical assessment.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Appointments</h2>
          <p>Appointments can be booked online or by phone. We request 24 hours notice for cancellations. Repeated no-shows may affect future booking privileges. Emergency appointments are accommodated based on availability.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Payment</h2>
          <p>Payment is due at the time of service unless otherwise arranged. We accept cash, cards, UPI, and offer EMI options for eligible treatments. Treatment cost estimates are provided before procedures begin.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Contact</h2>
          <p>For questions, contact us at {CLINIC.email} or {CLINIC.phoneDisplay}.</p>
        </div>
      </div>
    </div>
  );
}
