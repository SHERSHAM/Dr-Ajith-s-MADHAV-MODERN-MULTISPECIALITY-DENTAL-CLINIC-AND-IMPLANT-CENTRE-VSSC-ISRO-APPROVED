import { CLINIC } from "@/data/clinic";

export default function RefundPolicyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-primary-950 mb-8" style={{ fontFamily: "var(--font-heading)" }}>Refund Policy</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600 leading-relaxed">
          <p><strong>Last updated:</strong> January 1, 2025</p>
          <p>At {CLINIC.name}, patient satisfaction is our priority. This Refund Policy outlines our guidelines regarding refunds for dental services.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Consultation Fees</h2>
          <p>Consultation fees are non-refundable once the consultation has been completed. If a consultation is cancelled with 24 hours advance notice, a full refund will be processed.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Treatment Payments</h2>
          <p>Advance payments for treatments are refundable if cancellation is made before the treatment begins. Partial refunds may be provided for multi-stage treatments based on the stages completed. Custom-fabricated items (crowns, dentures, aligners) are non-refundable once fabrication begins.</p>

          <h2 className="text-2xl font-bold text-primary-950 mt-10" style={{ fontFamily: "var(--font-heading)" }}>Refund Process</h2>
          <p>Refunds are processed within 7-10 business days via the original payment method. For assistance, contact us at {CLINIC.email} or {CLINIC.phoneDisplay}.</p>
        </div>
      </div>
    </div>
  );
}
