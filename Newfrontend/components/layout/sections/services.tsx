import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "NMC Approved University Admission",
    description: "Guaranteed admission in a recognized medical university abroad.",
    pro: 0,
  },
  {
    title: "Visa & Documentation Support",
    description: "We handle your visa, translations, and apostille/attestation paperwork.",
    pro: 0,
  },
  {
    title: "Indian Hostel & Food Arrangement",
    description: "Nutritious Indian meals and safe, separate hostel for boys and girls.",
    pro: 0,
  },
  {
    title: "FMGE/NExT Coaching (On Request)",
    description: "Exam-focused coaching support from Indian faculty.",
    pro: 1,
  },
  {
    title: "Airport Pickup & Local Setup",
    description: "Airport pickup, SIM card, bank setup, and local registration done for you.",
    pro: 0,
  },
  {
    title: "Personal Mentorship & Caretaker",
    description: "Indian caretaker on campus for all-time support and emergencies.",
    pro: 0,
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-[#00A3D3] text-center mb-2 tracking-wider font-semibold">
        What's Included
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Transparent & Student-Centric Services
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Abroad Kaka offers end-to-end MBBS support — from admission and arrival to coaching and comfort.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
