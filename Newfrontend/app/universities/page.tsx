"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { PlaneSection } from "@/components/layout/sections/FlyingPlan";
import { FooterSection } from "@/components/layout/sections/footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";

// Constants
const DEFAULT_UNIVERSITY_COVER = "/university-placeholder.jpg";
const DEFAULT_UNIVERSITY_LOGO = "/university-logo-placeholder.png";

// Types
type Country = {
    _id: string;
    name: string;
    code: string;
};

type Highlight = {
    label: string;
    value: string;
    _id: string;
};

type University = {
    _id: string;
    name: string;
    university: string;
    country: Country;
    location: string;
    tagline: string;
    coverImage: string;
    logo: string;
    established: string;
    highlights: Highlight[];
    about: string;
};

type ApiResponse = {
    status: string;
    results: number;
    data: {
        universities: University[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
};

type ApiResponseCountry = {
    status: string;
    results: number;
    data: {
        countries: Country[];
    };
};

export default function UniversitiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [selectedCountryId, setSelectedCountryId] = useState<string>("all");
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCountries, setIsLoadingCountries] = useState(true);
    const [universities, setUniversities] = useState<University[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const fetchUniversities = useCallback(async (page = 1, limit = 10, country = "all", search = "") => {
        try {
            setIsLoading(true);

            // Build URL parameters more cleanly
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
            });

            if (country !== "all") {
                params.append("country", country);
            }
            if (search.trim() !== "") {
                params.append("search", search.trim());
            }

            const response = await axios.get<ApiResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/universities?${params.toString()}`,
                {
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY
                    }
                }
            );

            setUniversities(response.data.data.universities);
            setPagination(response.data.data.pagination);
        } catch (error) {
            toast.error("Failed to fetch universities", {
                description: "Please try again later.",
            });
            console.error("Error fetching universities:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchCountries = useCallback(async () => {
        try {
            setIsLoadingCountries(true);
            const response = await axios.get<ApiResponseCountry>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/country`,
                {
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY
                    }
                }
            );
            setCountries(response.data.data.countries);
        } catch (error) {
            toast.error("Failed to fetch countries", {
                description: "Please try again later.",
            });
            console.error("Error fetching countries:", error);
        } finally {
            setIsLoadingCountries(false);
        }
    }, []);

    useEffect(() => {
        fetchUniversities();
        fetchCountries();
    }, [fetchUniversities, fetchCountries]);

    useEffect(() => {
        const countryQuery = selectedCountryId === "all" ? "all" : selectedCountryId;
        fetchUniversities(1, pagination.limit, countryQuery, debouncedSearchTerm);
        // Reset pagination when search or country changes
        setPagination(prev => ({ ...prev, page: 1 }));
    }, [selectedCountryId, debouncedSearchTerm, pagination.limit]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            const countryQuery = selectedCountryId === "all" ? "all" : selectedCountryId;
            fetchUniversities(newPage, pagination.limit, countryQuery, debouncedSearchTerm);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage, endPage;

        if (pagination.totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = pagination.totalPages;
        } else {
            const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
            const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

            if (pagination.page <= maxPagesBeforeCurrent) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (pagination.page + maxPagesAfterCurrent >= pagination.totalPages) {
                startPage = pagination.totalPages - maxVisiblePages + 1;
                endPage = pagination.totalPages;
            } else {
                startPage = pagination.page - maxPagesBeforeCurrent;
                endPage = pagination.page + maxPagesAfterCurrent;
            }
        }

        // Previous Page Button
        items.push(
            <PaginationItem key="prev">
                <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.page - 1);
                    }}
                    className={
                        pagination.page === 1 ? "pointer-events-none opacity-50" : undefined
                    }
                    aria-label="Previous page"
                />
            </PaginationItem>
        );

        // First Page
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                        isActive={1 === pagination.page}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <span className="px-4">...</span>
                    </PaginationItem>
                );
            }
        }

        // Page Numbers
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            items.push(
                <PaginationItem key={pageNum}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                        }}
                        isActive={pageNum === pagination.page}
                    >
                        {pageNum}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last Page
        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <span className="px-4">...</span>
                    </PaginationItem>
                );
            }
            items.push(
                <PaginationItem key={pagination.totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.totalPages);
                        }}
                        isActive={pagination.totalPages === pagination.page}
                    >
                        {pagination.totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Next Page Button
        items.push(
            <PaginationItem key="next">
                <PaginationNext
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.page + 1);
                    }}
                    className={
                        pagination.page === pagination.totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                    }
                    aria-label="Next page"
                />
            </PaginationItem>
        );

        return items;
    };

    return (
        <div className="bg-gray-50">

            {/* Universities List Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

                            <h2 className="text-3xl font-bold">All Universities</h2>

                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            {isLoadingCountries ? (
                                <div className="w-[180px] h-10 bg-gray-200 rounded-md animate-pulse" />
                            ) : (
                                <Select onValueChange={setSelectedCountryId} value={selectedCountryId}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Countries</SelectItem>
                                        {countries.map((country: Country) => (
                                            <SelectItem key={country._id} value={country._id}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <Card key={i} className="overflow-hidden border-0 shadow-sm animate-pulse">
                                    <div className="h-48 w-full bg-gray-200" />
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative -mt-10">
                                                <div className="w-16 h-16 rounded-xl border-4 border-white bg-gray-300 shadow-md" />
                                            </div>
                                            <div className="flex-1 pt-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                                <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                            <div className="h-3 bg-gray-200 rounded w-5/6" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : universities.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-gray-600">No universities found</h3>
                            <p className="text-gray-500 mt-2">
                                {searchTerm ? `No results found for "${searchTerm}"` : "Please check back later"}
                            </p>
                            {searchTerm && (
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchTerm("");
                                    }}
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {universities.map((uni) => (
                                    <motion.div
                                        key={uni._id}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                    >
                                        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm h-full flex flex-col">
                                            {/* Cover Image with University Name Overlay */}
                                            <div className="relative h-48 w-full">
                                                <Image
                                                    src={uni.coverImage || DEFAULT_UNIVERSITY_COVER}
                                                    alt={`${uni.name} cover image`}
                                                    className="w-full h-full object-cover"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = DEFAULT_UNIVERSITY_COVER;
                                                    }}
                                                    priority={false}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-4 left-4">
                                                    <h3 className="text-xl font-bold text-white drop-shadow-md">{uni.name}</h3>
                                                    <p className="text-white/90 mb-2 text-sm">
                                                        {uni.location}, {uni.country?.name}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* University Content */}
                                            <CardContent className="p-4 flex-1">
                                                {/* Logo and Basic Info */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="relative -mt-10">
                                                        <div className="w-16 h-16 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden">
                                                            <Image
                                                                src={uni.logo || DEFAULT_UNIVERSITY_LOGO}
                                                                alt={`${uni.name} logo`}
                                                                width={64}
                                                                height={64}
                                                                className="w-full h-full object-contain bg-white"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = DEFAULT_UNIVERSITY_LOGO;
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 pt-1">
                                                        <p className="text-sm text-muted-foreground">{uni.university}</p>
                                                        {uni.established && (
                                                            <p className="text-xs text-muted-foreground">Est. {uni.established}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Tagline/About */}
                                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
                                                    {uni.tagline || uni.about}
                                                </p>

                                                {/* Highlights */}
                                                {uni.highlights?.length > 0 && (
                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                        {uni.highlights.slice(0, 4).map((highlight) => (
                                                            <div
                                                                key={highlight._id}
                                                                className="bg-[#00A3D3]/10 p-3 rounded-lg border border-[#00A3D3]/20"
                                                            >
                                                                <p className="text-xs font-medium text-[#00A3D3]">{highlight.label}</p>
                                                                <p className="font-semibold text-sm">{highlight.value}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>

                                            {/* Action Button */}
                                            <CardFooter className="p-4 pt-0">
                                                <Button
                                                    className="w-full bg-[#00A3D3] hover:bg-[#0087b3]"
                                                    asChild
                                                >
                                                    <Link href={`/universities/${uni._id}`}>
                                                        View University Details
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="mt-12">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-sm text-gray-600">
                                            Showing {(pagination.page - 1) * pagination.limit + 1}-
                                            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                                            {pagination.total} universities
                                            {(searchTerm || selectedCountryId !== "all") && (
                                                <span className="ml-2 text-blue-600">
                                                    (filtered)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <Pagination>
                                        <PaginationContent>
                                            {renderPaginationItems()}
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            <PlaneSection />

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">10+</h3>
                            <p className="text-gray-600">Countries</p>
                        </div>
                        <div className="p-6 bg-cyan-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-cyan-600 mb-2">50+</h3>
                            <p className="text-gray-600">Universities</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">1,000+</h3>
                            <p className="text-gray-600">Students Placed</p>
                        </div>
                        <div className="p-6 bg-cyan-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-cyan-600 mb-2">98%</h3>
                            <p className="text-gray-600">Visa Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Help Choosing a University?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Our experts will guide you to find the perfect medical school for your needs
                    </p>
                    <Button variant="secondary" size="lg" asChild>
                        <Link href="/consultation">
                            Book Free Consultation
                        </Link>
                    </Button>
                </div>
            </section>
            <FooterSection />
        </div>
    );
}

{/*
    
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {universitiesByCountry.map((country) => (
                        <div key={country.id} className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {country.flag} {country.name} Medical Universities
                                </h2>
                                <Link href={`/universities/${country.id}`}>
                                    <Button variant="link" className="flex items-center">
                                        View All <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {country.universities.slice(0, 3).map((uni) => (
                                    <Card key={uni.id}>
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-bold">{uni.name}</h3>
                                            <p className="text-gray-600 mt-2">{uni.city}</p>
                                            <div className="mt-4 flex justify-between text-sm">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    Rank: #{uni.ranking}
                                                </span>
                                                <span className="text-gray-700">{uni.tuitionFee}</span>
                                            </div>
                                            <Button variant="outline" className="w-full mt-4">
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>    
    
*/}