import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    value: "item-1",
    question: "Is ₹25 lakh really all-inclusive for the entire 6-year MBBS program?",
    answer:
      "Yes! The ₹25 lakh covers tuition fees, hostel accommodation, Indian food, visa assistance, and full guidance. No hidden charges or agent fees.",
  },
  {
    value: "item-2",
    question: "Are the universities NMC (MCI) approved?",
    answer:
      "Absolutely. We only tie up with NMC-approved universities, so you are eligible to take the FMGE/NExT exam and practice in India.",
  },
  {
    value: "item-3",
    question: "Do I need NEET qualification to apply?",
    answer:
      "Yes, NEET qualification is mandatory as per NMC guidelines for Indian students pursuing MBBS abroad.",
  },
  {
    value: "item-4",
    question: "Is Indian food provided in hostels?",
    answer:
      "Yes! We offer healthy and hygienic Indian meals (breakfast, lunch, and dinner) to help you stay comfortable and focused on studies.",
  },
  {
    value: "item-5",
    question: "What support is available once I reach the university?",
    answer:
      "You’ll be guided by an on-campus Indian caretaker, get academic mentorship, and be part of exclusive WhatsApp/Telegram support groups.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-[#00A3D3] mb-2 tracking-wider font-semibold">
          FAQs
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold">Common Questions</h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
