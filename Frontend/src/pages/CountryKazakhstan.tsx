
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
  Utensils
} from "lucide-react";

const CountryKazakhstan = () => {
  const universities = [
    {
      name: "Kazakh National Medical University",
      location: "Almaty",
      established: "1931",
      ranking: "Top Medical University",
      fees: "$4,200/year",
      slug: "kazakh-national-medical-university"
    },
    {
      name: "West Kazakhstan Medical University",
      location: "Aktobe", 
      established: "1957",
      ranking: "NMC Approved",
      fees: "$3,800/year",
      slug: "west-kazakhstan-medical-university"
    },
    {
      name: "South Kazakhstan Medical Academy",
      location: "Shymkent",
      established: "1979",
      ranking: "WHO Listed",
      fees: "$4,000/year",
      slug: "south-kazakhstan-medical-academy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=600&fit=crop')`
            }}
          ></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-6xl">🇰🇿</span>
                <h1 className="text-4xl md:text-6xl font-bold">
                  Study MBBS in Kazakhstan
                </h1>
              </div>
              <p className="text-xl mb-8 opacity-90">
                NMC approved universities with high-quality education and modern facilities
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  NMC Approved
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  Modern Infrastructure
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  Quality Education
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  English Medium
                </Badge>
              </div>
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
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Tuition Fees</h3>
                <p className="text-green-600 font-bold">$3,800 - $4,200/year</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Universities</h3>
                <p className="text-blue-600 font-bold">10+ Options</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Indian Students</h3>
                <p className="text-blue-600 font-bold">800+</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
                <p className="text-blue-600 font-bold">6 Years</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Kazakhstan */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Study MBBS in Kazakhstan?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the advantages of pursuing medical education in this progressive Central Asian nation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "NMC Approved Universities",
                  description: "All major medical universities are recognized by National Medical Commission"
                },
                {
                  icon: DollarSign,
                  title: "Affordable Education",
                  description: "Competitive tuition fees with excellent value for money"
                },
                {
                  icon: Globe,
                  title: "English Medium",
                  description: "MBBS courses taught in English for international students"
                },
                {
                  icon: BookOpen,
                  title: "Modern Curriculum",
                  description: "Updated medical curriculum with latest teaching methodologies"
                },
                {
                  icon: Home,
                  title: "Safe Environment",
                  description: "Politically stable country with safe living conditions"
                },
                {
                  icon: Utensils,
                  title: "Diverse Culture",
                  description: "Multi-cultural environment with international cuisine options"
                }
              ].map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Universities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top Medical Universities in Kazakhstan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from NMC approved universities with excellent academic standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {university.location}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Established:</span>
                        <span className="font-semibold">{university.established}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Recognition:</span>
                        <Badge variant="outline" className="text-xs">{university.ranking}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Annual Fees:</span>
                        <span className="font-semibold text-green-600">{university.fees}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">
                        View Details
                      </Button>
                      <Link to="/register">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Apply
                        </Button>
                      </Link>
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
              Ready to Start Your Medical Journey in Kazakhstan?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get expert guidance and secure your admission to top medical universities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Apply Now - Free Consultation
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Call Now: +91 9876543210
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

export default CountryKazakhstan;
