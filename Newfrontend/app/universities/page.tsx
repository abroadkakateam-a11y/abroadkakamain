"use client";

import { useState } from "react";
import Link from "next/link";
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
import { ChevronRight } from "lucide-react";

// Types
type University = {
    id: string;
    name: string;
    country: string;
    city: string;
    ranking: number;
    tuitionFee: string;
    duration: string;
    image: string;
    featured?: boolean;
};

type Country = {
    id: string;
    name: string;
    flag: string;
    universityCount: number;
};

// Mock data
const countries: Country[] = [
    { id: "russia", name: "Russia", flag: "🇷🇺", universityCount: 12 },
    { id: "kazakhstan", name: "Kazakhstan", flag: "🇰🇿", universityCount: 8 },
    { id: "kyrgyzstan", name: "Kyrgyzstan", flag: "🇰🇬", universityCount: 5 },
    { id: "china", name: "China", flag: "🇨🇳", universityCount: 7 },
    { id: "philippines", name: "Philippines", flag: "🇵🇭", universityCount: 6 },
];

const universities: University[] = [
    {
        id: "1",
        name: "Samara State Medical University",
        country: "russia",
        city: "Samara",
        ranking: 1,
        tuitionFee: "$4,500/year",
        duration: "6 years",
        image: "/university-1.jpg",
        featured: true,
    },
    {
        id: "2",
        name: "Kazakh National Medical University",
        country: "kazakhstan",
        city: "Almaty",
        ranking: 2,
        tuitionFee: "$5,000/year",
        duration: "5 years",
        image: "/university-2.jpg",
        featured: true,
    },
    // Add more universities...
];

export default function UniversitiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<string>("all");
    const [selectedDuration, setSelectedDuration] = useState<string>("all");

    // Filter universities based on selections
    const filteredUniversities = universities.filter((uni) => {
        const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCountry = selectedCountry === "all" ? true : uni.country === selectedCountry;
        const matchesDuration = selectedDuration === "all"
            ? true
            : uni.duration.includes(selectedDuration);
        return matchesSearch && matchesCountry && matchesDuration;
    });

    // Group universities by country
    const universitiesByCountry = countries.map((country) => ({
        ...country,
        universities: universities.filter((uni) => uni.country === country.id),
    }));

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
                            className="bg-white/20 border-white/30 text-white placeholder-white/70"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="secondary">Search</Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">25+</h3>
                            <p className="text-gray-600">Countries</p>
                        </div>
                        <div className="p-6 bg-cyan-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-cyan-600 mb-2">150+</h3>
                            <p className="text-gray-600">Universities</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h3>
                            <p className="text-gray-600">Students Placed</p>
                        </div>
                        <div className="p-6 bg-cyan-50 rounded-lg">
                            <h3 className="text-3xl font-bold text-cyan-600 mb-2">98%</h3>
                            <p className="text-gray-600">Visa Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Universities */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Featured Medical Universities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universities
                            .filter((uni) => uni.featured)
                            .slice(0, 3)
                            .map((uni) => (
                                <Card key={uni.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                                            <img
                                                src={uni.image}
                                                alt={uni.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <h3 className="text-xl font-bold">{uni.name}</h3>
                                        <p className="text-gray-600">
                                            {uni.city}, {countries.find((c) => c.id === uni.country)?.name}
                                        </p>
                                        <div className="mt-4 flex justify-between">
                                            <span className="text-gray-700">{uni.tuitionFee}</span>
                                            <span className="text-gray-700">{uni.duration}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Find Your Perfect University</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Countries</SelectItem>
                                {countries.map((country) => (
                                    <SelectItem key={country.id} value={country.id}>
                                        {country.flag} {country.name} ({country.universityCount})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Durations</SelectItem>
                                <SelectItem value="5">5 Years</SelectItem>
                                <SelectItem value="6">6 Years</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={() => {
                            setSelectedCountry("all");
                            setSelectedDuration("all");
                            setSearchTerm("");
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                </div>
            </section>

            {/* Universities by Country */}
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
        </div>
    );
}