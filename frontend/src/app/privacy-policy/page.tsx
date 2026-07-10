import { CLINIC } from "@/data/clinic";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-primary-950 mb-8" style={{ fontFamily: "var(--font-heading)" }}>Privacy Policy</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 leading-relaxed">
          <p><strong>Last updated:</strong> January 1, 2025</p>
          <p>At {CLINIC.name}, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide when you book appointments, register for a patient account, or contact us. This includes: name, email, phone number, date of birth, medical history, dental records, insurance information, and payment details.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>How We Use Your Information</h2>
          <p>We use your information to: provide dental services, manage appointments, communicate treatment plans, send appointment reminders, process payments, improve our services, and comply with legal obligations.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Data Security</h2>
          <p>We implement industry-standard security measures including encryption, secure servers, access controls, and regular security audits to protect your personal and medical information.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at: {CLINIC.email} or call {CLINIC.phoneDisplay}.</p>
        </div>
      </div>
    </div>
  );
}
