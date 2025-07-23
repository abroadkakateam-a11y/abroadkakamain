import { BenefitsSection } from "@/components/layout/sections/benefits";
import StudyAbroadHero from "@/components/layout/sections/Bluelable";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import HowWeHelpSection from "@/components/layout/sections/howwework";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { StudentLifeSection } from "@/components/layout/sections/StudentLifeSection";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Abroad KAKA ",
  description: "Welcome to Abroad Kaka! Your Journey Begins",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Abroad KAKA ",
    description: "Welcome to Abroad Kaka! Your Journey Begins",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <HowWeHelpSection />
      <FeaturesSection />
      <StudentLifeSection />
      <ServicesSection />
      <TestimonialSection />
      <StudyAbroadHero/>
      <CommunitySection />
      <FAQSection />
      <FooterSection />
    </>
  );
}

/**
 * 
 *   <PricingSection />
        <TeamSection />
      <ContactSection />
 */