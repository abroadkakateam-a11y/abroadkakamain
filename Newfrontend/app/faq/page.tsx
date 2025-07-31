"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "Is Russian MBBS valid in India?",
        answer: [
            "Yes, you can practice in India after MBBS in Russia to enhance your medical profession.",
            "You are required to take a licensing test i.e. NEXT (National Exit Test) to practice in India.",
            "The MBBS degree obtained from recognized medical universities in Russia is considered valid in India.",
            "The National Medical Commission (NMC) recognizes several Russian universities and their medical programs.",
        ]
    },
    {
        question: "Is MBBS in Russia better than India?",
        answer: [
            "Russia is the foremost preference of medical students to pursue MBBS and become a doctor.",
            "Russia's medical universities provide high quality education at an affordable fee.",
            "Russia holds the 8th position for providing top-class medical education.",
            "Russia's medical universities are recognized by MCI, WHO, European Council."
        ]
    },
    // Add all other questions in the same format
    // ...
    {
        question: "Can students earn in Russia?",
        answer: [
            "Yes, international students can work part-time in Russia, provided they obtain the necessary work permit and adhere to local regulations."
        ]
    }
];

const cutOffData = [
    { year: "2021", general: "720 – 138", reserved: "137 – 108" },
    { year: "2022", general: "720 – 150", reserved: "149 – 112" },
    { year: "2023", general: "720 – 140", reserved: "139 – 100" },
    { year: "2024", general: "720 – 164", reserved: "163 – 129" },
];

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.some(ans => ans.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#00A3D3] mb-4">Frequently Asked Questions</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to know about pursuing MBBS in Russia
                </p>
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

            <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border rounded-lg px-6 hover:shadow-md transition-shadow"
                    >
                        <AccordionTrigger className="hover:no-underline py-6 text-left font-medium text-lg">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-muted-foreground">
                            <ul className="space-y-3 list-disc pl-5">
                                {faq.answer.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No questions found matching your search</p>
                </div>
            )}

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Contact our admission counselors for personalized guidance about MBBS in Russia
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button className="bg-[#00A3D3] hover:bg-[#0087b3] px-8 py-6">
                        Chat on WhatsApp
                    </Button>
                    <Button variant="outline" className="px-8 py-6">
                        Request Call Back
                    </Button>
                </div>
            </div>
        </div>
    );
}