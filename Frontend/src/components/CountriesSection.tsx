
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const countries = [
  {
    name: "Russia",
    flag: "🇷🇺",
    description: "Top medical universities with global recognition",
    costRange: "$3,000 - $6,000/year",
    universities: "25+ Universities",
    slug: "russia"
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    description: "Affordable medical education with quality infrastructure",
    costRange: "$3,500 - $5,500/year",
    universities: "15+ Universities",
    slug: "kazakhstan"
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    description: "English medium courses with low living costs",
    costRange: "$2,500 - $4,000/year",
    universities: "10+ Universities",
    slug: "uzbekistan"
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    description: "MCI approved universities with easy admission",
    costRange: "$2,800 - $4,500/year",
    universities: "8+ Universities",
    slug: "kyrgyzstan"
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    description: "European standard education at affordable rates",
    costRange: "$4,000 - $7,000/year",
    universities: "12+ Universities",
    slug: "georgia"
  },
  {
    name: "Armenia",
    flag: "🇦🇲",
    description: "High-quality medical programs in English",
    costRange: "$3,200 - $5,800/year",
    universities: "6+ Universities",
    slug: "armenia"
  }
];

export const CountriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Countries We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from top medical education destinations with NMC/WHO recognized universities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {countries.map((country) => (
            <Card key={country.name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {country.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {country.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tuition:</span>
                    <span className="font-semibold text-green-600">{country.costRange}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Universities:</span>
                    <span className="font-semibold text-blue-600">{country.universities}</span>
                  </div>
                </div>

                <Link to={`/country/${country.slug}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Explore {country.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/countries">
            <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Countries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
