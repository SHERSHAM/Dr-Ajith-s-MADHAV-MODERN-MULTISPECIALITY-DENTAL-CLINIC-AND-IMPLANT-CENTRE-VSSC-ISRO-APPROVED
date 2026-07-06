import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageLoader from "@/components/animations/PageLoader";
import MouseGlow from "@/components/animations/MouseGlow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr Ajith’s MADHAV MODERN MULTISPECIALITY DENTAL CLINIC | Premium Dental Care in Thiruvananthapuram",
  description: "Experience world-class dental care at Thiruvananthapuram's most advanced multi-speciality dental clinic. Expert specialists, cutting-edge technology, and compassionate care for your perfect smile.",
  keywords: "dental clinic, dentist, Thiruvananthapuram, dental implants, root canal, braces, smile design, cosmetic dentistry, Kerala, Kazhakuttam",
  authors: [{ name: "Dr. Ajith Madhav" }],
  openGraph: {
    title: "Madhav Modern Multi Speciality Dental Clinic",
    description: "Premium dental care in Thiruvananthapuram. VSSC/ISRO approved. 14+ years of excellence.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <PageLoader />
        <ScrollProgress />
        <MouseGlow />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
