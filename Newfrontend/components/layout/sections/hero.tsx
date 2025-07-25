"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Lock, BadgeCheck } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { PlaneSection } from "./FlyingPlan";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const countries = [
  { code: "ru", name: "Russia" },
  { code: "uz", name: "Uzbekistan" }, // Fixed country code
  { code: "kz", name: "Kazakhstan" },
  { code: "ge", name: "Georgia" },
];

const people = [
  {
    id: 1,
    name: "Bhupendra Singh",
    designation: "Astana State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-20-30_MBBS_Abroad_couselling.pdf_zvr0ta.png",
    comment: "We are very satisfied with your services. Every supportive knowledge you gave to us was very helpful. Thank you so much",
    rating: 5.0,
  },
  {
    id: 2,
    name: "Anjali Choudhary",
    designation: "OMSK State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-16_MBBS_Abroad_couselling.pdf_bbarnh.png",
    comment: "Completely satisfied with the services. Whether it was for doubt discussion or preference list making or any queries regarding fee, course or colleges",
    rating: 5.0,
  },
  {
    id: 3,
    name: "Rupendra Singh",
    designation: "Kazak National Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-00_MBBS_Abroad_couselling.pdf_uw7zpq.png",
    comment: "Really helpful and detailed information about colleges and counseling provided will be eternally thankful to you",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Harshita",
    designation: "Krasnoyarsk State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-26_MBBS_Abroad_couselling.pdf_azfpdr.png",
    comment: "It was immensely helpful. I couldn't have done it properly if college kaka wouldn't be there.",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Parvendra",
    designation: "Osh State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-06_MBBS_Abroad_couselling.pdf_lmirmg.png",
    comment: "It was good. Good rules made and reply to query was good",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Raxandha Mansuri",
    designation: "Semey State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-21-36_MBBS_Abroad_couselling.pdf_ngesb2.png",
    comment: "Excellent Service...The Prefrence List You peoples made was Pretty good...Thank You Very Much College Kaka Team",
    rating: 5.0,
  },
  {
    id: 7,
    name: "Lakshay Manju",
    designation: "Samara State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-20_MBBS_Abroad_couselling.pdf_cexc6e.png",
    comment: "Yeah, it was good for me, being a fresher, you've guided me about several rules and the steps of counselling. Thank you sir.",
    rating: 5.0,
  },
  {
    id: 8,
    name: "Manish Prajapati",
    designation: "TVER State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-06_MBBS_Abroad_couselling.pdf_pgctpa.png",
    comment: "I am very much satisfied with your counselling services and Thank you sir for supporting.",
    rating: 5.0,
  },
  {
    id: 9,
    name: "Gourav Vora",
    designation: "Kemerovo State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-21-52_MBBS_Abroad_couselling.pdf_q0eami.png",
    comment: "Very good effort for students and parents.",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Vikram Bhati",
    designation: "Siberian State Medical University",
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-38_MBBS_Abroad_couselling.pdf_jluwbw.png",
    comment: "I feel very support and made this journey ease.",
    rating: 4.8,
  },
];

export const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <section className="w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-[#00A3D3]/10 dark:from-gray-900/80 dark:to-[#00A3D3]/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-10 dark:opacity-5" />
      </div>

      <div className="relative mx-auto my-10 flex max-w-full flex-col items-center justify-center">
        {/* Decorative borders */}
        <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-700">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-700">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
       



        {/* Main heading */}
        <div className="px-4 py-10 md:py-10">
          {/* Live badge */}
        <div className="flex justify-center">
          <Badge variant="outline" className="text-sm py-6 h-3 mb-8">
            <span className="mr-2 text-primary">
              <Badge className="bg-[#00A3D3] text-white hover:bg-[#00A3D3]/80">Live</Badge>
            </span>
            <span>New Admissions Open!</span>
          </Badge>
        </div>
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
            {"Welcome to "
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            <motion.span
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.7,
                ease: "easeInOut",
              }}
              className="mx-2 inline-block bg-gradient-to-r from-[#00A3D3] to-blue-500 bg-clip-text text-transparent"
            >
              Abroad Kaka
            </motion.span>
            {"Your Journey Begins"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index + 10}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.9 + index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-2xl py-6 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            We're more than just an MBBS consultancy — we're your academic family abroad. Get expert guidance, Indian support, and everything you need to become a doctor.
          </motion.p>

          {/* Trusted Students Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full py-8 rounded-xl mb-8"
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Trusted Students Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="w-full mb-8"
                >
                  <div className="max-w-6xl mx-auto px-4">


                    {/* Student avatars - full width */}
                    <div className="w-full mb-8">
                      <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                          Trusted by 1000+ students across India
                          <BadgeCheck className="w-6 h-6 text-green-500" />
                        </h3>
                        <div className="w-full flex justify-center">
                          <AnimatedTooltip items={people} />
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1 }}
                      className="relative z-10 flex flex-row sm:flex-row items-center justify-center gap-4 mt-8"
                    >
                      <Button
                        className="w-full sm:w-auto bg-[#00A3D3] hover:bg-[#0087b3] font-semibold px-8 py-6 text-lg"
                        size="lg"
                      >
                        Start Your MBBS Journey
                        <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full sm:w-auto font-semibold px-8 py-6 text-lg border-2"
                        size="lg"
                      >
                        <Link
                          href="https://wa.me/7412028919?text=Hello%2C%20I%20would%20love%20to%20know%20more%20about%20abroad%20kaka."
                          target="_blank"
                        >
                          Chat on WhatsApp
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* Trust indicators - full width grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
                  <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">100% Genuine</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Verified universities with no fake promises
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Secure Process</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  End-to-end encrypted documentation
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">No Hidden Fees</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Transparent pricing with no surprises
                </p>
              </div>
            </motion.div>
          </div>


          {/* Preview image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-2 shadow-xl overflow-hidden dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753444119/SG6FlsGLskI-HD_ftjwew.jpg" // Replace with your actual image
                alt="University preview"
                className="aspect-video w-full object-cover"
                height={720}
                width={1280}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/*
{/* Countries served - full width above 
                    <div className="w-full mb-8">
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 text-center">
                        SERVING STUDENTS IN
                      </h4>
                      <div className="flex flex-wrap justify-center gap-6">
                        {countries.map((country) => (
                          <motion.div
                            key={country.code}
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center"
                          >
                            <img
                              src={`https://flagcdn.com/w80/${country.code}.png`}
                              alt={country.name}
                              className="w-12 h-9 rounded shadow-lg object-cover"
                            />
                            <span className="text-sm mt-2 text-slate-600 dark:text-slate-400 font-medium">
                              {country.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
*/