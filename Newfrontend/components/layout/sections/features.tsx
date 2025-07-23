import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "IndianRupee",
    title: "Affordable Packages",
    description:
      "Study MBBS abroad under ₹25 lakh including tuition, hostel, food & visa with zero hidden fees.",
  },
  {
    icon: "ShieldCheck",
    title: "NMC Approved Universities",
    description:
      "Only tie-ups with recognized and NMC-approved institutions that qualify you to practice in India.",
  },
  {
    icon: "Utensils",
    title: "Authentic Indian Meals",
    description:
      "Daily vegetarian Indian food prepared fresh, ensuring you stay healthy and focused.",
  },
  {
    icon: "GraduationCap",
    title: "FMGE/NExT Preparation",
    description:
      "Indian syllabus-aligned education, regular coaching, and mentorship to crack licensing exams.",
  },
  {
    icon: "Globe",
    title: "Global Opportunities",
    description:
      "Get access to globally recognized MBBS degrees that open doors worldwide.",
  },
  {
    icon: "UserCheck",
    title: "Indian Support On-Campus",
    description:
      "Dedicated Indian caretakers and mentors available 24/7 on campus to support your journey.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-[#00A3D3] text-center mb-2 tracking-wider font-semibold">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Abroad Kaka Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        We make your MBBS abroad journey transparent, safe, affordable, and success-driven — from admissions to FMGE success.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-[#00A3D3]/20 p-2 rounded-full ring-8 ring-[#00A3D3]/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="#00A3D3"
                    className="text-[#00A3D3]"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
