"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/UniversityCard";
import { BACKEND_URL, FRONTEND_API } from "@/config/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Country {
  _id: string;
  name: string;
  code: string;
}

interface University {
  _id: string;
  name: string;
  university: string;
  country: Country;
  location: string;
  tagline: string;
  coverImage?: string;
  logo?: string;
  about: string;
  duration: string;
  feesUSD: string;
  feesINR: string;
  highlights: {
    label: string;
    value: string;
    _id: string;
  }[];
  createdAt: string;
}

interface Pagination {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  status: string;
  results: number;
  data: {
    universities: University[];
    pagination: Pagination;
  };
}

export default function UniversitiesPage() {
  const params = useParams();
  const countryId = params.id as string;
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BACKEND_URL}/api/universities?page=${currentPage}&limit=10&country=${countryId}`,
          {
            headers: { "api-key": `${FRONTEND_API}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [countryId, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data && currentPage < data.data.pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <p className="font-bold">Error</p>
          <p className="block sm:inline">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data || data.results === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative max-w-md mx-auto">
          No universities found for this country.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Universities in{" "}
        {data.data.universities[0]?.country?.name || "this country"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.data.universities.map((university) => (
          <UniversityCard key={university._id} university={university} />
        ))}
      </div>

      {data.data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {data.data.pagination.totalPages}
          </span>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage >= data.data.pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
