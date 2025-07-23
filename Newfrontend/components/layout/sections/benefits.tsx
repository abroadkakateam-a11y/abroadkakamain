import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "IndianRupee",
    title: "Budget-Friendly MBBS",
    description:
      "Study at NMC-approved universities abroad with tuition, hostel, and food — all under ₹25 Lakh. No hidden fees.",
  },
  {
    icon: "ShieldCheck",
    title: "Safe & Supportive Campus",
    description:
      "Separate secure hostels, Indian caretakers, and round-the-clock guidance ensure a home-like environment overseas.",
  },
  {
    icon: "Utensils",
    title: "Indian Meals Daily",
    description:
      "Get nutritious, authentic Indian food three times a day — because good food means better focus and comfort.",
  },
  {
    icon: "GraduationCap",
    title: "FMGE/NExT Coaching",
    description:
      "Succeed with Indian curriculum-aligned teaching, experienced faculty, and early clinical exposure from Day 1.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg mb-2 tracking-wider" style={{ color: "#00A3D3" }}>
            Benefits
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Students Choose Abroad Kaka
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            From affordable education to Indian support abroad — we’ve got every step of your MBBS journey covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="#00A3D3"
                    className="mb-6"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
