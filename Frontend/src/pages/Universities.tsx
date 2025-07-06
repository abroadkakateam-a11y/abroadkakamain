
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  Users, 
  Search,
  Filter,
  Star,
  Globe,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const universities = [
    {
      id: 1,
      name: "Kyrgyz State Medical Academy",
      country: "Kyrgyzstan",
      city: "Bishkek",
      flag: "🇰🇬",
      established: "1939",
      type: "Government Medical University",
      tuitionFee: "$3,200",
      totalFee: "$4,200",
      duration: "6 Years",
      language: "English & Russian",
      rating: 4.2,
      reviews: 85,
      recognition: ["NMC Approved", "WHO Listed"],
      highlights: ["Oldest medical university", "Low fee structure", "High success rate"],
      link: "/university/kyrgyz-state-medical-academy"
    },
    {
      id: 2,
      name: "International School of Medicine",
      country: "Kyrgyzstan",
      city: "Bishkek",
      flag: "🇰🇬",
      established: "2003",
      type: "Private Medical University",
      tuitionFee: "$4,500",
      totalFee: "$5,500",
      duration: "6 Years",
      language: "English",
      rating: 4.3,
      reviews: 95,
      recognition: ["NMC Approved", "WHO Listed"],
      highlights: ["Modern facilities", "English medium", "International faculty"],
      link: "/university/international-school-medicine"
    },
    {
      id: 3,
      name: "Asian Medical Institute",
      country: "Kyrgyzstan",
      city: "Kant",
      flag: "🇰🇬",
      established: "1994",
      type: "Private Medical Institute",
      tuitionFee: "$3,800",
      totalFee: "$4,700",
      duration: "6 Years",
      language: "English & Russian",
      rating: 4.1,
      reviews: 75,
      recognition: ["WHO Listed", "NMC Approved"],
      highlights: ["Affordable fees", "Clinical training", "Experienced faculty"],
      link: "/university/asian-medical-institute"
    },
    {
      id: 4,
      name: "Kazakh National Medical University",
      country: "Kazakhstan",
      city: "Almaty",
      flag: "🇰🇿",
      established: "1931",
      type: "Government Medical University",
      tuitionFee: "$4,000",
      totalFee: "$5,200",
      duration: "6 Years",
      language: "English & Russian",
      rating: 4.4,
      reviews: 120,
      recognition: ["NMC Approved", "WHO Listed"],
      highlights: ["Top ranked university", "Modern infrastructure", "Research opportunities"],
      link: "#"
    },
    {
      id: 5,
      name: "Asfendiyarov Kazakh National Medical University",
      country: "Kazakhstan",
      city: "Almaty",
      flag: "🇰🇿",
      established: "1930",
      type: "Government Medical University",
      tuitionFee: "$4,200",
      totalFee: "$5,400",
      duration: "6 Years",
      language: "English & Russian",
      rating: 4.3,
      reviews: 110,
      recognition: ["NMC Approved", "WHO Listed"],
      highlights: ["Prestigious university", "High-quality education", "International recognition"],
      link: "#"
    },
    {
      id: 6,
      name: "Tashkent Medical Academy",
      country: "Uzbekistan",
      city: "Tashkent",
      flag: "🇺🇿",
      established: "1919",
      type: "Government Medical University",
      tuitionFee: "$3,500",
      totalFee: "$4,500",
      duration: "6 Years",
      language: "English & Russian",
      rating: 4.0,
      reviews: 65,
      recognition: ["NMC Approved", "WHO Listed"],
      highlights: ["Historic institution", "Low living costs", "Quality education"],
      link: "#"
    }
  ];

  const countries = ["All Countries", "Kyrgyzstan", "Kazakhstan", "Uzbekistan", "Russia", "Georgia", "Armenia"];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "" || selectedCountry === "All Countries" || uni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Top Medical Universities
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Discover NMC approved medical universities offering world-class MBBS education
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search universities, countries, or cities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="md:w-64">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Universities Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredUniversities.length} universities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map((university) => (
                <Card key={university.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{university.flag}</span>
                      <Badge variant="secondary" className="text-xs">
                        Est. {university.established}
                      </Badge>
                    </div>

                    {/* University Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 min-h-[3rem]">
                      {university.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center space-x-1 text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{university.city}, {university.country}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= Math.floor(university.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {university.rating}/5 ({university.reviews} reviews)
                      </span>
                    </div>

                    {/* Recognition Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {university.recognition.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Key Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{university.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{university.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">{university.language}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Highlights:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {university.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fee & CTA */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Total Annual Fee</p>
                          <p className="text-xl font-bold text-green-600">{university.totalFee}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Tuition Fee</p>
                          <p className="text-lg font-semibold">{university.tuitionFee}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {university.link !== "#" ? (
                          <Link to={university.link} className="flex-1">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                              View Details
                            </Button>
                          </Link>
                        ) : (
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">
                            View Details
                          </Button>
                        )}
                        <Link to="/register">
                          <Button variant="outline" className="text-sm">
                            Apply
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No universities found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your search or filter options.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Apply?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get expert guidance for your medical education abroad
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Start Application
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Universities;
