
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

const universities = [
  {
    name: "Kyrgyz State Medical Academy",
    location: "Bishkek",
    established: "1939",
    ranking: "Top Medical University",
    fees: "$3,200/year",
    slug: "kyrgyz-state-medical-academy"
  },
  {
    name: "International School of Medicine",
    location: "Bishkek", 
    established: "2003",
    ranking: "NMC Approved",
    fees: "$4,500/year",
    slug: "international-school-medicine"
  },
  {
    name: "Asian Medical Institute",
    location: "Kant",
    established: "1994",
    ranking: "WHO Listed",
    fees: "$3,800/year",
    slug: "asian-medical-institute"
  }
];

const CountryKyrgyzstan = () => {
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
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')`
            }}
          ></div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-6xl">🇰🇬</span>
                <h1 className="text-4xl md:text-6xl font-bold">
                  Study MBBS in Kyrgyzstan
                </h1>
              </div>
              <p className="text-xl mb-8 opacity-90">
                NMC approved universities with easy admission process and beautiful mountain landscapes
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  NMC Approved
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  Easy Admission
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white px-4 py-2">
                  Low Fees
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
                <p className="text-green-600 font-bold">$2,800 - $4,500/year</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Universities</h3>
                <p className="text-blue-600 font-bold">8+ Options</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Indian Students</h3>
                <p className="text-blue-600 font-bold">500+</p>
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

        {/* Why Choose Kyrgyzstan */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Study MBBS in Kyrgyzstan?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the advantages of pursuing medical education in this beautiful Central Asian country
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
                  description: "Low tuition fees and cost of living compared to other countries"
                },
                {
                  icon: Globe,
                  title: "English Medium",
                  description: "MBBS courses taught in English language for international students"
                },
                {
                  icon: BookOpen,
                  title: "Quality Education",
                  description: "Modern curriculum with practical training and clinical exposure"
                },
                {
                  icon: Home,
                  title: "Safe Environment",
                  description: "Peaceful country with friendly people and safe living conditions"
                },
                {
                  icon: Utensils,
                  title: "Indian Food Available",
                  description: "Easy availability of Indian food and familiar cultural environment"
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
                Top Medical Universities in Kyrgyzstan
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
                      <Link to={`/university/${university.slug}`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
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

        {/* Eligibility & Requirements */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Eligibility & Requirements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">12th pass with PCB (Physics, Chemistry, Biology)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Minimum 50% aggregate in 12th</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">NEET qualification mandatory</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Age: 17-25 years</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Documents Required</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">10th & 12th mark sheets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">NEET scorecard</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Valid passport</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Medical certificate</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Medical Journey in Kyrgyzstan?
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

export default CountryKyrgyzstan;
