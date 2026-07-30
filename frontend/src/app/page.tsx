import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingWhy } from "@/components/landing/landing-why";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingWorkflow } from "@/components/landing/landing-workflow";
import { LandingTestimonials } from "@/components/landing/landing-testimonials";
import { LandingFaq } from "@/components/landing/landing-faq";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingWhy />
        <LandingStats />
        <LandingWorkflow />
        <LandingTestimonials />
        <LandingFaq />
      </main>
      <LandingFooter />
    </div>
  );
}
