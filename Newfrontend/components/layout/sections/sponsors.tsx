"use client";

import { Icon } from "@/components/ui/icon"; // Your custom Icon wrapper
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";

interface PartnerProps {
  icon: keyof typeof icons;
  name: string;
}

const sponsors: PartnerProps[] = [
  {
    icon: "GraduationCap",
    name: "Kazan State University",
  },
  {
    icon: "MapPin",
    name: "Omsk State Medical",
  },
  {
    icon: "ShieldCheck",
    name: "NMC Approved",
  },
  {
    icon: "Globe",
    name: "WHO Recognized",
  },
  {
    icon: "Medal",
    name: "Top 1000 QS",
  },
  {
    icon: "UserCheck",
    name: "Indian Caretaker",
  },
  {
    icon: "Users",
    name: "1K+ Students Guided",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="partners" className="max-w-[80%] mx-auto pt-12 pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6 text-[#00A3D3] font-semibold">
        Trusted by Leading Universities & Medical Authorities
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-sm md:text-base font-medium"
              title={name}
            >
              <Icon
                name={icon}
                size={32}
                color="#00A3D3"
                className="mr-2"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
