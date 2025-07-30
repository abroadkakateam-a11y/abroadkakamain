"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner"
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
import { ChevronRight, Loader2 } from "lucide-react";
import { PlaneSection } from "@/components/layout/sections/FlyingPlan";
import { FooterSection } from "@/components/layout/sections/footer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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

export default function UniversitiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [universities, setUniversities] = useState<University[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const fetchUniversities = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/universities?page=${page}&limit=${limit}`,
                {
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY
                    }
                }
            );
            setUniversities(response.data.data.universities);
            setPagination(response.data.data.pagination);
        } catch (error) {
            toast("Error", {
                description: "Failed to fetch universities. Please try again later.",
            });
            console.error("Error fetching universities:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchUniversities(newPage, pagination.limit);
        }
    };

    // Filter universities based on search term
    const filteredUniversities = universities.filter((uni) =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r mt-8 from-blue-600 to-cyan-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">World-Class Medical Universities</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-8">
                        Discover top-ranked medical schools across the globe with our comprehensive directory
                    </p>
                    <div className="max-w-2xl mx-auto flex gap-2">
                        <Input
                            placeholder="Search universities..."
                            className="bg-white/80 border-white/30 text-white placeholder-white/70"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="secondary">Search</Button>
                    </div>
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

            {/* Universities List Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">All Universities</h2>
                        <div className="flex gap-4">
                            <Select onValueChange={setSelectedCountry} value={selectedCountry}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Countries</SelectItem>
                                    <SelectItem value="russia">Russia</SelectItem>
                                    <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
                                    <SelectItem value="china">China</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
                        </div>
                    ) : filteredUniversities.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-gray-600">No universities found</h3>
                            <p className="text-gray-500 mt-2">
                                {searchTerm ? "Try a different search term" : "Please check back later"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredUniversities.map((uni) => (
                                    <Card key={uni._id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader className="p-0">
                                            <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                                                <img
                                                    src={uni.coverImage}
                                                    alt={uni.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "/university-placeholder.jpg";
                                                    }}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border">
                                                    <img
                                                        src={uni.logo}
                                                        alt={`${uni.name} logo`}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = "/university-logo-placeholder.png";
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold">{uni.name}</h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {uni.location}, {uni.country?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 line-clamp-2">{uni.tagline || uni.about}</p>
                                            {uni.highlights?.length > 0 && (
                                                <div className="mt-4 grid grid-cols-2 gap-2">
                                                    {uni.highlights.slice(0, 2).map((highlight) => (
                                                        <div key={highlight._id} className="bg-gray-50 p-2 rounded">
                                                            <p className="text-xs text-gray-500">{highlight.label}</p>
                                                            <p className="font-medium">{highlight.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href={`/universities/${uni._id}`}>View Details</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="mt-12">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(pagination.page - 1);
                                                    }}
                                                    className={
                                                        pagination.page === 1 ? "pointer-events-none opacity-50" : undefined
                                                    }
                                                />
                                            </PaginationItem>
                                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                                                (pageNum) => (
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
                                                )
                                            )}
                                            <PaginationItem>
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
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need Help Choosing a University?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Our experts will guide you to find the perfect medical school for your needs
                    </p>
                    <Button variant="secondary" size="lg">
                        Book Free Consultation
                    </Button>
                </div>
            </section>
            <FooterSection />
        </div>
    );
}