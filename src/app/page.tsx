import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import TreatmentMarquee from "@/components/home/TreatmentMarquee";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClinicStats from "@/components/home/ClinicStats";
import TreatmentsOverview from "@/components/home/TreatmentsOverview";
import TechnologyShowcase from "@/components/home/TechnologyShowcase";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import AppointmentCTA from "@/components/home/AppointmentCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TreatmentMarquee />
      <IntroSection />
      <WhyChooseUs />
      <ClinicStats />
      <TreatmentsOverview />
      <FeaturedDoctors />
      <TechnologyShowcase />
      <TestimonialsCarousel />
      <AppointmentCTA />
    </>
  );
}
