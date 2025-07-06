
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, GraduationCap, Users } from "lucide-react";

const countries = [
  {
    name: "Russia",
    flag: "🇷🇺",
    description: "Study MBBS in Russia at world-renowned medical universities with global recognition and affordable fees.",
    costRange: "$3,000 - $6,000/year",
    universities: 25,
    students: "200+",
    highlights: ["WHO/NMC Recognized", "English Medium", "No Donation", "Winter Climate"],
    slug: "russia",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop"
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    description: "Affordable medical education with quality infrastructure and modern facilities in Central Asia.",
    costRange: "$3,500 - $5,500/year",
    universities: 15,
    students: "150+",
    highlights: ["Low Cost of Living", "Modern Infrastructure", "Safe Environment", "Quality Education"],
    slug: "kazakhstan",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop"
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    description: "English medium MBBS courses with very low living costs and excellent student support.",
    costRange: "$2,500 - $4,000/year",
    universities: 10,
    students: "100+",
    highlights: ["Lowest Fees", "English Medium", "Indian Food Available", "Easy Visa Process"],
    slug: "uzbekistan",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop"
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    description: "NMC approved universities with easy admission process and beautiful mountain landscapes.",
    costRange: "$2,800 - $4,500/year",
    universities: 8,
    students: "80+",
    highlights: ["NMC Approved", "Easy Admission", "Beautiful Location", "Friendly People"],
    slug: "kyrgyzstan",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    description: "European standard medical education at affordable rates with modern teaching methods.",
    costRange: "$4,000 - $7,000/year",
    universities: 12,
    students: "120+",
    highlights: ["European Standards", "Modern Teaching", "Safe Country", "Cultural Diversity"],
    slug: "georgia",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop"
  },
  {
    name: "Armenia",
    flag: "🇦🇲",
    description: "High-quality medical programs taught in English with excellent clinical training.",
    costRange: "$3,200 - $5,800/year",
    universities: 6,
    students: "60+",
    highlights: ["Quality Education", "Clinical Training", "English Medium", "Rich Culture"],
    slug: "armenia",
    image: "https://images.unsplash.com/photo-1562013132-b4edd602bbaa?w=400&h=250&fit=crop"
  }
];

const Countries = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Study MBBS Abroad
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Choose from top medical education destinations with WHO/NMC recognized universities
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  WHO Recognized
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  NMC Approved
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  Affordable Fees
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {countries.map((country) => (
                <Card key={country.name} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={country.image} 
                      alt={`Study MBBS in ${country.name}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{country.flag}</span>
                      <h2 className="text-2xl font-bold text-gray-900">
                        MBBS in {country.name}
                      </h2>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {country.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-500">Tuition Fees</div>
                          <div className="font-semibold text-green-600">{country.costRange}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-500">Universities</div>
                          <div className="font-semibold text-blue-600">{country.universities}+ Options</div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-2">Key Highlights:</div>
                      <div className="flex flex-wrap gap-2">
                        {country.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link to={`/country/${country.slug}`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Explore {country.name}
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Countries;
