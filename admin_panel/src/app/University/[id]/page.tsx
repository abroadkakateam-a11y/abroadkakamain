// app/universities/[id]/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { useEffect, useState } from "react";

interface Country {
  _id: string;
  name: string;
  code: string;
}

interface Highlight {
  label: string;
  value: string;
  _id: string;
}

interface University {
  _id: string;
  name: string;
  university: string;
  country: Country;
  location: string;
  tagline: string;
  coverImage?: string;
  coverImagePublicId?: string;
  logo?: string;
  logoPublicId?: string;
  established: string;
  highlights: Highlight[];
  about: string;
  programs: string[];
  duration: string;
  medium: string;
  gpaRequired: string;
  feesUSD: string;
  feesINR: string;
  hostelCost: string;
  approvedBy: string[];
  facilities: string[];
  eligibility: string[];
  admissionSteps: string[];
  documents: string[];
  comparison: any[];
  feeStructure: any[];
  reviews: any[];
  faqs: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

async function getUniversityData(id: string): Promise<University | null> {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/universities/${id}`, {
      headers: { "api-key": FRONTEND_API },
    });

    return response.data.data.university;
  } catch (error) {
    console.error("Failed to fetch university data:", error);
    return null;
  }
}

export default function UniversityDetailPage() {
  const params = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const universityData = await getUniversityData(params.id as string);
        if (!universityData) {
          notFound();
          return;
        }
        setUniversity(universityData);
      } catch (error) {
        console.error("Error fetching university:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchUniversity();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!university) {
    return notFound();
  }

  const hasCoverImage = !!university.coverImage;
  const hasLogo = !!university.logo;
  const hasHighlights = university.highlights.length > 0;
  const hasPrograms = university.programs.length > 0;
  const hasApprovedBy = university.approvedBy.length > 0;
  const hasFacilities = university.facilities.length > 0;
  const hasEligibility = university.eligibility.length > 0;
  const hasAdmissionSteps = university.admissionSteps.length > 0;
  const hasDocuments = university.documents.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image Section */}
      {hasCoverImage && (
        <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
          <Image
            src={university.coverImage || "/coverPlaceholder.svg"}
            alt={`${university.name} cover`}
            fill
            className="object-cover h-full w-full"
            priority
          />
        </div>
      )}

      {/* University Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {hasLogo && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={university.logo || "/placeholder.svg"}
              alt={`${university.name} logo`}
              width={128}
              height={128}
              className="object-cover h-full w-full"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{university.name}</h1>
            <Badge variant="outline">{university.country.name}</Badge>
          </div>

          {university.tagline && (
            <p className="text-lg text-gray-600 mb-4">{university.tagline}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {university.established && (
              <Badge variant="secondary">Est. {university.established}</Badge>
            )}
            {university.location && (
              <Badge variant="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {university.location}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      {hasHighlights && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {university.highlights.map((highlight) => (
                <div key={highlight._id} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-500">
                    {highlight.label}
                  </h3>
                  <p className="text-lg font-semibold">{highlight.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          {university.about && (
            <Card>
              <CardHeader>
                <CardTitle>About {university.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{university.about}</p>
              </CardContent>
            </Card>
          )}

          {/* Programs Section */}
          {hasPrograms && (
            <Card>
              <CardHeader>
                <CardTitle>Programs Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {university.programs.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Admission Requirements */}
          {(university.gpaRequired ||
            hasEligibility ||
            hasAdmissionSteps ||
            hasDocuments) && (
            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {university.gpaRequired && (
                  <div>
                    <h3 className="font-medium mb-2">GPA Requirement</h3>
                    <p>{university.gpaRequired}</p>
                  </div>
                )}

                {hasEligibility && (
                  <div>
                    <h3 className="font-medium mb-2">Eligibility Criteria</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {university.eligibility.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasAdmissionSteps && (
                  <div>
                    <h3 className="font-medium mb-2">Admission Process</h3>
                    <ol className="list-decimal pl-5 space-y-1">
                      {university.admissionSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {hasDocuments && (
                  <div>
                    <h3 className="font-medium mb-2">Required Documents</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {university.documents.map((doc, index) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {university.duration && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Duration
                  </h3>
                  <p>{university.duration} years</p>
                </div>
              )}

              {university.medium && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Medium of Instruction
                  </h3>
                  <p>{university.medium}</p>
                </div>
              )}

              {university.feesUSD && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Tuition Fees (USD)
                  </h3>
                  <p>${university.feesUSD}</p>
                </div>
              )}

              {university.feesINR && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Tuition Fees (INR)
                  </h3>
                  <p>₹{university.feesINR}</p>
                </div>
              )}

              {university.hostelCost && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Hostel Cost
                  </h3>
                  <p>₹{university.hostelCost}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Approved By */}
          {hasApprovedBy && (
            <Card>
              <CardHeader>
                <CardTitle>Approved By</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {university.approvedBy.map((org, index) => (
                    <li key={index}>{org}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Facilities */}
          {hasFacilities && (
            <Card>
              <CardHeader>
                <CardTitle>Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {university.facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
