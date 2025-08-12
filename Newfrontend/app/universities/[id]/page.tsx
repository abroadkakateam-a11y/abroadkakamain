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
  Calendar,
  Bookmark,
  FileText,
  Globe2,
  Landmark,
  ClipboardList,
  ArrowRight,
  MoveUpRightIcon,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UniversityData {
  _id: string;
  name: string;
  university: string;
  country: {
    _id: string;
    name: string;
    code: string;
  };
  location: string;
  tagline: string;
  coverImage: string;
  coverImagePublicId: string;
  logo: string;
  logoPublicId: string;
  photos: Array<{
    url: string;
    publicId: string;
    caption: string;
    _id: string;
  }>;
  highlights: Array<{ label: string; value: string; _id: string }>;
  about: string;
  programs: string[];
  duration: string;
  medium: string;
  gpaRequired: string;
  feesUSD: string;
  feesINR: string;
  feeStructure: Array<{ year: number; tuition: number; hostel: number; _id: string }>;
  hostelCost: string;
  approvedBy: string[];
  facilities: string[];
  eligibility: string[];
  admissionSteps: string[];
  documents: string[];
  reviews: Array<{
    name: string;
    image: string;
    rating: number;
    review: string;
    _id: string;
  }>;
  faqs: Array<{ q: string; a: string; _id: string }>;
  comparison: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: string;
  data: {
    university: UniversityData;
  };
}

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

const iconMap: Record<string, any> = {
  Location: MapPin,
  Country: Globe2,
  Duration: Clock,
  Language: Bookmark,
  GPA: Medal,
  Fees: Banknote,
  Hostel: Home,
  Programs: GraduationCap,
  Approval: ShieldCheck,
  Facilities: Building2,
  Students: Users2,
  Established: Calendar,
  Documents: FileText,
  Ministry: Landmark,
  Process: ClipboardList,
};

const getIconForLabel = (label: string) => {
  if (label.includes("Location")) return MapPin;
  if (label.includes("Country")) return Globe;
  if (label.includes("Duration")) return Clock;
  if (label.includes("Language")) return Bookmark;
  if (label.includes("GPA")) return Medal;
  if (label.includes("Fees")) return Banknote;
  if (label.includes("Hostel")) return Home;
  if (label.includes("Program")) return GraduationCap;
  if (label.includes("Approval")) return ShieldCheck;
  if (label.includes("Facilit")) return Building2;
  return MapPin; // default
};

export default function UniversityPage() {
  const { id } = useParams();
  const [universityData, setUniversityData] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/universities/${id}`,
          {
            headers: {
              'api-key': process.env.NEXT_PUBLIC_API_KEY
            }
          }
        );

        if (response.data.status === "success") {
          setUniversityData(response.data.data.university);
        } else {
          throw new Error("Failed to fetch university data");
        }
      } catch (err) {
        console.error("Error fetching university data:", err);
        setError("Failed to load university data");
        toast.error("Failed to load university data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-[#00A3D3]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!universityData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No university data found</p>
      </div>
    );
  }

  // Generate highlights from available data
  const generatedHighlights = [
    { label: "Location", value: universityData.location, _id: "loc" },
    { label: "Duration", value: universityData.duration, _id: "dur" },
    { label: "Medium", value: universityData.medium, _id: "med" },
    { label: "GPA Required", value: universityData.gpaRequired, _id: "gpa" },
    { label: "Total Fees (USD)", value: `$${universityData.feesUSD}`, _id: "fee" },
    { label: "Hostel Cost", value: `$${universityData.hostelCost}`, _id: "host" },
    { label: "Programs", value: `${universityData.programs.length} programs`, _id: "prog" },
  ];

  // Combine API highlights with generated ones
  const allHighlights = [...universityData.highlights, ...generatedHighlights];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-6 lg:py-8"
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
        {allHighlights.map(({ label, value, _id }) => {
          const Icon = getIconForLabel(label);
          return (
            <motion.div
              key={_id}
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
          );
        })}
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

                {/* Photo Gallery */}
                {universityData.photos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 text-sm sm:text-base">Gallery</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {universityData.photos.map((photo) => (
                        <motion.div
                          key={photo._id}
                          whileHover={{ scale: 1.03 }}
                          className="relative aspect-video rounded-lg overflow-hidden"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.caption}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
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
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-[#00A3D3]" />
                        <span>Duration: {universityData.duration}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-[#00A3D3]" />
                        <span>Medium: {universityData.medium}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Medal className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-[#00A3D3]" />
                        <span>GPA Required: {universityData.gpaRequired}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-[#00A3D3]" />
                        <span>
                          Approved By: {universityData.approvedBy.join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">
                      Programs Offered
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {universityData.programs.map((program) => (
                        <Badge
                          key={program}
                          variant="outline"
                          className="flex items-center gap-1 hover:bg-[#00A3D3]/10 hover:text-[#00A3D3] transition-colors text-xs sm:text-sm"
                        >
                          {program}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="font-medium mt-4 mb-2 text-sm sm:text-base">
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
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Total Fees</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Approximate total cost for complete program
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg sm:text-xl text-[#00A3D3]">
                      ${universityData.feesUSD}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      ≈ ₹{universityData.feesINR}
                    </p>
                  </div>
                </div>

                {/* Mobile: Card Layout */}
                <div className="block sm:hidden space-y-3">
                  {universityData.feeStructure.map((item) => (
                    <motion.div
                      key={item._id}
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
                          key={item._id}
                          className="border-b dark:border-gray-800"
                          whileHover={{
                            backgroundColor: "rgba(0, 163, 211, 0.05)",
                          }}
                        >
                          <td className="p-2 sm:p-3">Year {item.year}</td>
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

          {/* Admission Process - Accordion Version */}
          <motion.section variants={fadeIn}>
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#00A3D3]/10 to-[#00A3D3]/5 dark:from-[#00A3D3]/20 dark:to-[#00A3D3]/10 p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg lg:text-xl flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3D3]" />
                  Admission Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <Accordion type="multiple" className="w-full">
                  {/* Eligibility Criteria Accordion */}
                  <AccordionItem value="eligibility">
                    <AccordionTrigger className="hover:no-underline text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00A3D3]/10 flex items-center justify-center">
                          <UserCheck className="w-3 h-3 text-[#00A3D3]" />
                        </div>
                        Eligibility Criteria
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-muted-foreground text-sm sm:text-base pl-2 pt-2">
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Steps for Admission Accordion */}
                  <AccordionItem value="steps">
                    <AccordionTrigger className="hover:no-underline text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00A3D3]/10 flex items-center justify-center">
                          <Calendar className="w-3 h-3 text-[#00A3D3]" />
                        </div>
                        Steps for Admission
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="space-y-3 text-muted-foreground text-sm sm:text-base pl-2 pt-2">
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Documents Required Accordion - Badge Version */}
                  <AccordionItem value="documents">
                    <AccordionTrigger className="hover:no-underline text-sm sm:text-base">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00A3D3]/10 flex items-center justify-center">
                          <FileText className="w-3 h-3 text-[#00A3D3]" />
                        </div>
                        Documents Required
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {universityData.documents.map((doc, index) => (
                          <motion.div
                            key={index}
                            variants={fadeIn}
                            className="flex items-center gap-1"
                          >
                            <Badge variant="outline" className="text-sm font-normal">
                              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                              {doc}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Reviews */}
          {universityData.reviews.length > 0 && (
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
                        key={review._id}
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
                                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating
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
          )}

          {/* FAQs */}
          {universityData.faqs.length > 0 && (
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
                    {universityData.faqs.map(({ q, a, _id }, index) => (
                      <AccordionItem
                        key={_id}
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
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Apply Card */}
          <motion.div variants={fadeIn} className="lg:top-6">
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