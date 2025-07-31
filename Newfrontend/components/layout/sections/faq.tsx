"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const cutOffData = [
    { year: "2021", general: "720 – 138", reserved: "137 – 108" },
    { year: "2022", general: "720 – 150", reserved: "149 – 112" },
    { year: "2023", general: "720 – 140", reserved: "139 – 100" },
    { year: "2024", general: "720 – 164", reserved: "163 – 129" },
];

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}
const FAQList: FAQProps[] = [
  {
    value: "item-1",
    question: "Is an MBBS degree from Russia valid in India?",
    answer:
      "Yes! MBBS from NMC-recognized Russian universities is valid in India. You must pass the NEXT exam (replacing FMGE) and complete a 1-year internship in India to practice.",
  },
  {
    value: "item-2",
    question: "What is the cost of MBBS in Russia compared to India?",
    answer:
      "Russia offers highly subsidized fees (₹2.4–5.1L/year) with no donations/capitation fees, making it far cheaper than Indian private colleges (₹9L+/year).",
  },
  {
    value: "item-3",
    question: "Is NEET mandatory for MBBS in Russia?",
    answer:
      "Yes. NEET is compulsory (min. 164 for General, 108 for SC/ST/OBC). Some universities may accept lower scores, but NMC mandates NEET for eligibility.",
  },
  {
    value: "item-4",
    question: "Can I practice in India after MBBS in Russia?",
    answer:
      "Yes, after clearing NEXT-1 (theory), a 1-year internship in India, and NEXT-2 (practical). There’s no attempt limit for NEXT, ensuring flexibility.",
  },
  {
    value: "item-5",
    question: "Is the medium of instruction English?",
    answer:
      "Yes! All lectures, exams, and clinical training are in English. Russian language classes are taught as a supplementary subject.",
  },
  {
    value: "item-6",
    question: "How safe is Russia for Indian students?",
    answer:
      "Russian cities are generally safe with robust security. Universities provide dedicated support, and political unrest rarely affects student areas.",
  },
  {
    value: "item-7",
    question: "What are job prospects after MBBS in Russia?",
    answer:
      "You can practice in India (after NEXT), pursue PG abroad, or work in Russia by clearing their licensing exam. Global recognition opens opportunities worldwide.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:max-w-6xl py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-[#00A3D3] mb-2 tracking-wider font-semibold">
          FAQs
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold">Common Questions</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">NEET Cut-Off Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-3 text-left">Year</th>
                    <th className="p-3 text-left">General</th>
                    <th className="p-3 text-left">OBC/SC/ST</th>
                  </tr>
                </thead>
                <tbody>
                  {cutOffData.map((row) => (
                    <tr key={row.year} className="border-b dark:border-gray-800">
                      <td className="p-3">{row.year}</td>
                      <td className="p-3">{row.general}</td>
                      <td className="p-3">{row.reserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Key Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">NEET Score</h3>
              <p className="text-muted-foreground">General: 164+ | Reserved: 129+</p>
            </div>
            <div>
              <h3 className="font-medium">12th Marks</h3>
              <p className="text-muted-foreground">50% in PCB (40% for reserved)</p>
            </div>
            <div>
              <h3 className="font-medium">Age Limit</h3>
              <p className="text-muted-foreground">No upper age limit for NEET</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">Quick Facts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Duration</h3>
              <p className="text-muted-foreground">6 years (including internship)</p>
            </div>
            <div>
              <h3 className="font-medium">Annual Fees</h3>
              <p className="text-muted-foreground">₹2.4 - 5.1 Lakhs</p>
            </div>
            <div>
              <h3 className="font-medium">Indian Students</h3>
              <p className="text-muted-foreground">20,000+ currently studying</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.slice(0, 5).map(({ question, answer, value }) => ( // Only show first 5 FAQs
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* See More FAQ Section */}
      <div className="mt-12 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00A3D3] hover:bg-[#0087B4] transition-colors"
        >
          View All FAQs
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
