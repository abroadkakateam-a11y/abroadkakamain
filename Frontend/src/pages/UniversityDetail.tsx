
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

const UniversityDetail = () => {
  const universityData = {
    name: "Kyrgyz State Medical Academy",
    location: "Bishkek, Kyrgyzstan",
    established: "1939",
    type: "Government Medical University",
    recognition: ["NMC Approved", "WHO Listed", "FAIMER Listed"],
    ranking: "Top Medical University in Kyrgyzstan",
    students: "8000+",
    indianStudents: "200+",
    language: "English & Russian",
    duration: "6 Years",
    degree: "Doctor of Medicine (MD)",
    hostelFee: "$800/year",
    tuitionFee: "$3,200/year",
    totalFee: "$4,000/year"
  };

  const highlights = [
    "84+ years of excellence in medical education",
    "Modern infrastructure with latest equipment",
    "Experienced faculty with international exposure",
    "Clinical training in affiliated hospitals",
    "Library with 300,000+ medical books and journals",
    "International student support services"
  ];

  const facilities = [
    { icon: Building, name: "Modern Campus", description: "State-of-the-art infrastructure" },
    { icon: BookOpen, name: "Digital Library", description: "300,000+ books & e-resources" },
    { icon: Users, name: "International Faculty", description: "Experienced professors" },
    { icon: Home, name: "Hostel Facility", description: "Safe & comfortable accommodation" },
    { icon: Globe, name: "Clinical Training", description: "Hands-on practical experience" },
    { icon: Award, name: "Research Center", description: "Advanced medical research" }
  ];

  const feeStructure = [
    { year: "1st Year", tuition: "$3,200", hostel: "$800", total: "$4,000" },
    { year: "2nd Year", tuition: "$3,200", hostel: "$800", total: "$4,000" },
    { year: "3rd Year", tuition: "$3,200", hostel: "$800", total: "$4,000" },
    { year: "4th Year", tuition: "$3,200", hostel: "$800", total: "$4,000" },
    { year: "5th Year", tuition: "$3,200", hostel: "$800", total: "$4,000" },
    { year: "6th Year", tuition: "$3,200", hostel: "$800", total: "$4,000" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582560469781-1965b9af903d?w=400&h=300&fit=crop", 
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
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
                    <span>4.5/5 (120+ Reviews)</span>
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

        {/* Quick Stats */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{universityData.students}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{universityData.indianStudents}</div>
                <div className="text-sm text-gray-600">Indian Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{universityData.duration}</div>
                <div className="text-sm text-gray-600">Course Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{universityData.language}</div>
                <div className="text-sm text-gray-600">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">${universityData.tuitionFee}</div>
                <div className="text-sm text-gray-600">Tuition Fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">${universityData.hostelFee}</div>
                <div className="text-sm text-gray-600">Hostel Fee</div>
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
                  Kyrgyz State Medical Academy (KSMA) is one of the oldest and most prestigious medical institutions 
                  in Central Asia, established in 1939. The university has been a pioneer in medical education and 
                  has trained thousands of doctors who are now serving worldwide.
                </p>
                <p className="text-gray-600 mb-6">
                  KSMA is recognized by major medical councils including NMC (National Medical Commission of India), 
                  WHO (World Health Organization), and is listed in the FAIMER directory. The university offers 
                  world-class medical education with modern infrastructure and experienced faculty.
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
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Modern infrastructure and world-class facilities for comprehensive medical education
              </p>
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

        {/* Fee Structure */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Fee Structure
                </h2>
                <p className="text-lg text-gray-600">
                  Transparent and affordable fee structure with no hidden charges
                </p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-gray-900">Year</th>
                          <th className="px-6 py-4 text-center font-semibold text-gray-900">Tuition Fee</th>
                          <th className="px-6 py-4 text-center font-semibold text-gray-900">Hostel Fee</th>
                          <th className="px-6 py-4 text-center font-semibold text-gray-900">Total Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructure.map((fee, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-6 py-4 font-medium text-gray-900">{fee.year}</td>
                            <td className="px-6 py-4 text-center text-blue-600 font-semibold">{fee.tuition}</td>
                            <td className="px-6 py-4 text-center text-orange-600 font-semibold">{fee.hostel}</td>
                            <td className="px-6 py-4 text-center text-green-600 font-bold">{fee.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  * Fees are subject to change. Additional costs may include visa, travel, and personal expenses.
                </p>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700 px-8">
                    Get Detailed Fee Breakdown
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Campus Gallery
              </h2>
              <p className="text-lg text-gray-600">
                Take a virtual tour of our beautiful campus and facilities
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
                  <img 
                    src={image} 
                    alt={`Campus view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Kyrgyz State Medical Academy?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Secure your seat at one of Central Asia's most prestigious medical universities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Apply Now - Limited Seats
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Download Prospectus
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

export default UniversityDetail;
