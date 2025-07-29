"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GraduationCap,
  MapPin,
  ShieldCheck,
  Globe,
  Medal,
  UserCheck,
  Users,
  Banknote,
  Building2,
  BookOpen,
  Clock,
  Shield,
  Home,
  Utensils,
  Users2,
  Phone,
  Mail,
  School,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const universityData = {
  name: "Astana State Medical University",
  university: "Astana University",
  location: "Astana, Kazakhstan",
  tagline: "Top Ranked NMC Approved Medical University in Central Asia",
  coverImage:
    "https://images.unsplash.com/photo-1695722099520-564bb36a3a6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGFnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
  logo: "https://images.unsplash.com/photo-1738464024478-2a60ac914513?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9nbyUyMGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D",
  established: 1964,
  // Highlights
  highlights: [
    { icon: GraduationCap, label: "Established", value: "1964" },
    { icon: MapPin, label: "City", value: "Astana" },
    { icon: ShieldCheck, label: "NMC Approved", value: "Yes" },
    { icon: Globe, label: "WHO Listed", value: "Yes" },
    { icon: Medal, label: "QS Rank", value: "Top 1000" },
    { icon: UserCheck, label: "Indian Caretaker", value: "Available" },
    { icon: Users, label: "Indian Students", value: "500+" },
  ],
  // About
  about: `Astana State Medical University is a leading public university in Kazakhstan offering high-quality education and global recognition. The university provides advanced infrastructure, well-equipped laboratories, and a safe environment for international students.`,
  // Program Details
  programs: ["MBBS"],
  duration: "5 Years + 1 Year Internship",
  medium: "English",
  gpaRequired: "50% in PCB",
  // Fees
  feesUSD: "27,000 USD",
  feesINR: "22 Lacs",
  feeStructure: [
    { year: 1, tuition: 4500, hostel: 800 },
    { year: 2, tuition: 4500, hostel: 800 },
    { year: 3, tuition: 4500, hostel: 800 },
    { year: 4, tuition: 4500, hostel: 800 },
    { year: 5, tuition: 4500, hostel: 800 },
    { year: 6, tuition: 4500, hostel: 800 },
  ],
  hostelCost: "800$/YEAR",
  // Approvals
  approvedBy: ["NMC", "WHO", "Ministry of Education, Kazakhstan"],
  // Facilities
  facilities: [
    "Indian Food",
    "Separate Hostels",
    "24/7 Security",
    "Modern Labs",
    "Hospital Attached",
  ],
  // Admission
  eligibility: [
    "Must be NEET qualified",
    "Minimum 50% in PCB for General Category",
    "Minimum 40% for Reserved Category",
    "Minimum age: 17 years by 31st December",
  ],
  admissionSteps: [
    "Apply online through official website",
    "Submit academic documents",
    "Receive Admission Letter",
    "Pay university fees",
    "Apply for Visa",
    "Book tickets and fly to university",
  ],
  documents: [
    "10th & 12th Marksheet",
    "NEET Scorecard",
    "Passport",
    "Birth Certificate",
    "Passport Size Photographs",
    "HIV Test Report",
    "Police Clearance Certificate",
  ],
  // Reviews
  reviews: [
    {
      name: "Rupendra Singh",
      image:
        "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-00_MBBS_Abroad_couselling.pdf_uw7zpq.png",
      rating: 5,
      review:
        "Really helpful and detailed information about colleges and counseling provided will be eternally thankful to you",
    },
  ],
  // FAQs
  faqs: [
    {
      q: "Is this university NMC approved?",
      a: "Yes, Astana State Medical University is approved by NMC and WHO recognized.",
    },
    {
      q: "Is Indian food available?",
      a: "Yes, Indian mess facility is available within hostels.",
    },
  ],
  // Comparison Data
  comparison: [
    {
      college: "Dhaka National Medical College",
      university: "Dhaka University",
      feesUSD: "53,000 USD",
      feesINR: "42 Lacs",
      seatBooking: "10,000 USD",
      admissionTime: "25,000 USD",
      hostel: "100$/MONTH",
      gpaRequired: "9 GPA",
    },
    {
      college: "Astana State Medical University",
      university: "Astana University",
      feesUSD: "27,000 USD",
      feesINR: "22 Lacs",
      seatBooking: "5,000 USD",
      admissionTime: "12,000 USD",
      hostel: "800$/YEAR",
      gpaRequired: "7.5 GPA",
    },
  ],
};

export default function UniversityPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8"
    >
      {/* Hero Section */}
      <motion.section variants={fadeIn}>
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 lg:mb-10 h-48 sm:h-64 md:h-80 lg:h-96">
          <Image
            src={universityData.coverImage || "/placeholder.svg"}
            alt="University Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4 lg:gap-6 w-full">
              <motion.div
                className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg overflow-hidden border-2 sm:border-4 border-white flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={universityData.logo || "/placeholder.svg"}
                  alt="University Logo"
                  fill
                  className="object-cover bg-white"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.h1
                  className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {universityData.name}
                </motion.h1>
                <motion.p
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 mt-1 sm:mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {universityData.tagline}
                </motion.p>
                <motion.div
                  className="flex flex-col xs:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    size="sm"
                    className="bg-[#00A3D3] hover:bg-[#0087b3] text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
                  >
                    Apply Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-white border-white bg-white/5 hover:bg-white/10 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
                  >
                    Download Brochure
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Facts */}
      <motion.section
        variants={fadeIn}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-12"
      >
        {universityData.highlights.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            variants={fadeIn}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm border dark:border-gray-700 text-center"
          >
            <div className="bg-[#00A3D3]/10 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 lg:mb-3">
              <Icon className="text-[#00A3D3] w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </div>
            <h4 className="font-medium text-xs sm:text-sm dark:text-white leading-tight">
              {label}
            </h4>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">
              {value}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* About Section */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  About the University
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {universityData.about}
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Program Details */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">
                      Course Information
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                      <li className="flex items-center gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Duration: {universityData.duration}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Medium: {universityData.medium}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>
                          Approved By: {universityData.approvedBy.join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {universityData.facilities.map((facility) => (
                        <Badge
                          key={facility}
                          variant="outline"
                          className="flex items-center gap-1 hover:bg-[#00A3D3]/10 hover:text-[#00A3D3] transition-colors text-xs sm:text-sm"
                        >
                          {facility.includes("Food") && (
                            <Utensils className="w-3 h-3" />
                          )}
                          {facility.includes("Hostel") && (
                            <Home className="w-3 h-3" />
                          )}
                          {facility.includes("Security") && (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          {facility.includes("Students") && (
                            <Users2 className="w-3 h-3" />
                          )}
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Fee Structure */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Fee Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="mb-4 grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium mb-1 text-sm sm:text-base">
                      Total Course Fees
                    </h4>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00A3D3]">
                      {universityData.feesUSD}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      ≈ {universityData.feesINR}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-medium mb-1 text-sm sm:text-base">
                      Hostel Charges
                    </h4>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                      {universityData.hostelCost}
                    </p>
                  </motion.div>
                </div>

                {/* Mobile: Card Layout */}
                <div className="block sm:hidden space-y-3">
                  {universityData.feeStructure.map((item) => (
                    <motion.div
                      key={item.year}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">
                          Year {item.year}
                        </h4>
                        <span className="text-sm font-bold text-[#00A3D3]">
                          ${item.tuition + item.hostel}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>Tuition: ${item.tuition}</div>
                        <div>Hostel: ${item.hostel}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: Table Layout */}
                <div className="hidden sm:block">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                        <th className="p-2 sm:p-3 font-medium">Year</th>
                        <th className="p-2 sm:p-3 font-medium text-right">
                          Tuition Fee (USD)
                        </th>
                        <th className="p-2 sm:p-3 font-medium text-right">
                          Hostel Fee (USD)
                        </th>
                        <th className="p-2 sm:p-3 font-medium text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {universityData.feeStructure.map((item) => (
                        <motion.tr
                          key={item.year}
                          className="border-b dark:border-gray-800"
                          whileHover={{
                            backgroundColor: "rgba(0, 163, 211, 0.05)",
                          }}
                        >
                          <td className="p-2 sm:p-3">{item.year}</td>
                          <td className="p-2 sm:p-3 text-right">
                            ${item.tuition}
                          </td>
                          <td className="p-2 sm:p-3 text-right">
                            ${item.hostel}
                          </td>
                          <td className="p-2 sm:p-3 text-right font-medium">
                            ${item.tuition + item.hostel}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Admission Process */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Admission Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div>
                    <h4 className="font-medium mb-3 text-sm sm:text-base">
                      Eligibility Criteria
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                      {universityData.eligibility.map((point, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          variants={fadeIn}
                        >
                          <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-[#00A3D3]/10 text-[#00A3D3] rounded-full text-xs mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-sm sm:text-base">
                      Steps for Admission
                    </h4>
                    <ol className="space-y-3 text-muted-foreground text-sm sm:text-base">
                      {universityData.admissionSteps.map((step, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          variants={fadeIn}
                        >
                          <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-[#00A3D3] text-white rounded-full text-xs mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">
                    Documents Required
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {universityData.documents.map((doc) => (
                      <Badge
                        key={doc}
                        variant="secondary"
                        className="font-normal hover:bg-[#00A3D3]/10 hover:text-[#00A3D3] transition-colors text-xs sm:text-sm"
                      >
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Fee Comparison Table */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <Banknote className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Fee Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                {/* Mobile: Card Layout */}
                <div className="block lg:hidden space-y-4">
                  {universityData.comparison.map((item, index) => (
                    <motion.div
                      key={index}
                      className="border dark:border-gray-700 rounded-lg p-4"
                      variants={fadeIn}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="mb-3">
                        <h4 className="font-medium text-sm sm:text-base">
                          {item.college}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {item.university}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Total Fees
                          </p>
                          <p className="font-medium">{item.feesUSD}</p>
                          <p className="text-muted-foreground text-xs">
                            ≈ {item.feesINR}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            GPA Required
                          </p>
                          <p className="font-bold text-[#00A3D3]">
                            {item.gpaRequired}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">
                            Seat Booking
                          </p>
                          <p className="font-medium text-amber-600 dark:text-amber-400">
                            {item.seatBooking}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Hostel</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {item.hostel}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t dark:border-gray-700">
                        <p className="text-muted-foreground text-xs mb-1">
                          Admission Fee
                        </p>
                        <p className="font-medium text-sm">
                          {item.admissionTime}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: Table Layout */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800/50 text-left">
                        <th className="p-3 lg:p-4 font-medium">
                          <div className="flex items-center gap-2">
                            <School className="w-4 h-4" />
                            College
                          </div>
                        </th>
                        <th className="p-3 lg:p-4 font-medium">University</th>
                        <th className="p-3 lg:p-4 font-medium text-right">
                          <div className="flex items-center justify-end gap-1">
                            Total Fees
                          </div>
                        </th>
                        <th className="p-3 lg:p-4 font-medium text-right">
                          <div className="flex items-center justify-end gap-1">
                            Seat Booking
                          </div>
                        </th>
                        <th className="p-3 lg:p-4 font-medium text-right">
                          <div className="flex items-center justify-end gap-1">
                            Admission
                          </div>
                        </th>
                        <th className="p-3 lg:p-4 font-medium text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Home className="w-4 h-4" />
                            Hostel
                          </div>
                        </th>
                        <th className="p-3 lg:p-4 font-medium text-right">
                          <div className="flex items-center justify-end gap-1">
                            <StarIcon className="w-4 h-4" />
                            GPA
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {universityData.comparison.map((item, index) => (
                        <motion.tr
                          key={index}
                          className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          variants={fadeIn}
                          whileHover={{ scale: 1.01 }}
                        >
                          <td className="p-3 lg:p-4 font-medium text-sm">
                            {item.college}
                          </td>
                          <td className="p-3 lg:p-4 text-sm">
                            {item.university}
                          </td>
                          <td className="p-3 lg:p-4 text-right">
                            <div className="font-medium text-sm">
                              {item.feesUSD}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              ≈ {item.feesINR}
                            </div>
                          </td>
                          <td className="p-3 lg:p-4 text-right font-medium text-amber-600 dark:text-amber-400 text-sm">
                            {item.seatBooking}
                          </td>
                          <td className="p-3 lg:p-4 text-right font-medium text-sm">
                            {item.admissionTime}
                          </td>
                          <td className="p-3 lg:p-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              {item.hostel}
                            </span>
                          </td>
                          <td className="p-3 lg:p-4 text-right font-bold text-[#00A3D3] text-sm">
                            {item.gpaRequired}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Reviews */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Student Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {universityData.reviews.map((review) => (
                    <motion.div
                      key={review.name}
                      className="border dark:border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage
                            src={review.image || "/placeholder.svg"}
                          />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {review.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            {review.name}
                          </h4>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        "{review.review}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* FAQs */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Accordion type="single" collapsible>
                  {universityData.faqs.map(({ q, a }, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b dark:border-gray-800"
                    >
                      <AccordionTrigger className="hover:no-underline py-3 sm:py-4 text-left text-sm sm:text-base">
                        {q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 sm:pb-4 text-muted-foreground text-sm sm:text-base">
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Apply Card */}
          <motion.div variants={fadeIn} className="lg:sticky lg:top-6">
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  Apply Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <form className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      NEET Score
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 text-sm"
                      placeholder="Your NEET score"
                    />
                  </div>
                  <Button className="w-full bg-[#00A3D3] hover:bg-[#0087b3] text-sm sm:text-base">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00A3D3]/10 p-2 rounded-full">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Call us at
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        +1 (234) 567-890
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00A3D3]/10 p-2 rounded-full">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Email us at
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        info@medadmissions.com
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base bg-transparent"
                  >
                    Chat with Counselor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Similar Universities */}
          <motion.div variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  Similar Universities
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                        <Image
                          src={universityData.coverImage || "/placeholder.svg"}
                          alt="University"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base truncate">
                          University Name
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Country
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
