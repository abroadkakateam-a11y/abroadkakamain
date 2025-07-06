
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  Users, 
  CheckCircle, 
  Globe,
  Calendar,
  BookOpen,
  Home,
  Star,
  Clock,
  Award,
  Building
} from "lucide-react";

const UniversityInternationalSchool = () => {
  const universityData = {
    name: "International School of Medicine",
    location: "Bishkek, Kyrgyzstan",
    established: "2003",
    type: "Private Medical University",
    recognition: ["NMC Approved", "WHO Listed", "FAIMER Listed"],
    ranking: "Leading Private Medical University",
    students: "4000+",
    indianStudents: "150+",
    language: "English",
    duration: "6 Years",
    degree: "Doctor of Medicine (MD)",
    hostelFee: "$1,000/year",
    tuitionFee: "$4,500/year",
    totalFee: "$5,500/year"
  };

  const highlights = [
    "Modern international standard facilities",
    "English medium instruction",
    "Experienced international faculty",
    "State-of-the-art simulation labs",
    "International student support services",
    "Clinical rotations in partner hospitals"
  ];

  const facilities = [
    { icon: Building, name: "Modern Campus", description: "International standard infrastructure" },
    { icon: BookOpen, name: "Digital Library", description: "Latest medical resources" },
    { icon: Users, name: "International Faculty", description: "PhD qualified professors" },
    { icon: Home, name: "Hostel Facility", description: "Comfortable accommodation" },
    { icon: Globe, name: "Clinical Training", description: "Practical medical experience" },
    { icon: Award, name: "Research Labs", description: "Advanced medical research" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start space-x-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-4xl">🇰🇬</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      Est. {universityData.established}
                    </Badge>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {universityData.name}
                  </h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{universityData.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {universityData.recognition.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-600 text-white">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span>4.3/5 (95+ Reviews)</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        ${universityData.totalFee}
                      </div>
                      <div className="text-sm opacity-90 mb-4">Total Annual Fee</div>
                      <Link to="/register">
                        <Button className="bg-green-600 hover:bg-green-700 w-full">
                          Apply Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">University Overview</h2>
                <p className="text-gray-600 mb-6">
                  International School of Medicine (ISM) is a leading private medical university in Kyrgyzstan, 
                  established in 2003. The university is known for its modern facilities, international faculty, 
                  and comprehensive medical education programs taught in English.
                </p>
                <p className="text-gray-600 mb-6">
                  ISM is recognized by NMC, WHO, and listed in FAIMER directory, making it an excellent choice 
                  for international students seeking quality medical education at affordable costs.
                </p>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Admission Details
                  </Button>
                </Link>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h3>
                <div className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Campus Facilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <facility.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {facility.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join International School of Medicine?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your medical journey at this prestigious international university
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Apply Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Download Brochure
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default UniversityInternationalSchool;
