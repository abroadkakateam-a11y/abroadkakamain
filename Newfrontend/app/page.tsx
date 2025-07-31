import { BenefitsSection } from "@/components/layout/sections/benefits";
import StudyAbroadHero from "@/components/layout/sections/Bluelable";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { PlaneSection } from "@/components/layout/sections/FlyingPlan";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import HowWeHelpSection from "@/components/layout/sections/howwework";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { StudentLifeSection } from "@/components/layout/sections/StudentLifeSection";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { YoutubeVideoGallery } from "@/components/layout/sections/YoutubeVide";

export const metadata = {
  title: "Abroad KAKA ",
  description: "Welcome to Abroad Kaka! Your Journey Begins",
  openGraph: {
    type: "website",
    title: "Abroad KAKA ",
    description: "Welcome to Abroad Kaka! Your Journey Begins",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Welcome to Abroad Kaka! Your Journey Begins",
      },
    ],
  },
};

export default function Home() {
  const video = [
    {
      title: "NOSMA Russia Campus & Hostel Tour | Abroad MBBS under 25 Lakh ",
      category: "Student Journey",
      src: "kHZE58RvHaE",
    },
    {
      title: "Complete Details about MBBS in Georgia | All Pros & Cons",
      category: "Life Abroad",
      src: "_T-AK-XVE9s",
    },
    {
      title: "Abroad MBBS Honest Reviews by Students | Omsk university Russia |",
      category: "Guides",
      src: "iXU7rSjF8sU",
    },
    {
      title: "MBBS in 1.5 Lakh per semester | Chechen University Russia",
      category: "Testimonials",
      src: "pxbZkn4Cw54",
    },

    {
      title: "Dagestan University Final Year Student's Experience | MBBS from Russia | Shocking Truth by Students",
      category: "Testimonials",
      src: "P9HElPTxF_0",
    },

  ]
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <PlaneSection />
      <BenefitsSection />
      <HowWeHelpSection />
      <FeaturesSection />
      <YoutubeVideoGallery videos={video} />
      <StudentLifeSection />
      <TestimonialSection />
      <StudyAbroadHero />
      <CommunitySection />
      <FAQSection />
      <FooterSection />
    </>
  );
}

/**
 * 
 *   

      <ServicesSection />    
<PricingSection />
        <TeamSection />
      <ContactSection />
 */