
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Award, 
  Globe, 
  CheckCircle, 
  Heart, 
  Target,
  Calendar,
  GraduationCap
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, number: "1000+", label: "Students Guided" },
    { icon: Globe, number: "6+", label: "Countries Served" },
    { icon: Award, number: "50+", label: "Partner Universities" },
    { icon: Calendar, number: "10+", label: "Years of Experience" }
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & Education Consultant",
      experience: "15+ years in medical education consulting",
      image: "👨‍⚕️"
    },
    {
      name: "Priya Sharma",
      role: "Admission Counselor",
      experience: "Expert in international admissions",
      image: "👩‍💼"
    },
    {
      name: "Amit Patel",
      role: "Visa & Documentation Specialist",
      experience: "Specializes in student visa processes",
      image: "👨‍💼"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-First Approach",
      description: "Every decision we make prioritizes our students' success and well-being."
    },
    {
      icon: Target,
      title: "Quality Education",
      description: "We partner only with NMC/WHO recognized universities maintaining high standards."
    },
    {
      icon: CheckCircle,
      title: "Transparency",
      description: "Clear communication about costs, processes, and expectations from day one."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Strong relationships with universities and officials across multiple countries."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Abroad Kaka
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Your trusted partner in making medical education dreams come true
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  Founded with a vision to make quality medical education accessible to Indian students, 
                  Abroad Kaka has been transforming dreams into reality for over a decade. We understand 
                  the challenges students face in securing MBBS admissions in India due to limited seats 
                  and high competition.
                </p>
                <p className="mb-6">
                  Our journey began when our founder, Dr. Rajesh Kumar, himself a medical graduate from 
                  Russia, realized the immense potential of international medical education. Having 
                  experienced the journey firsthand, he established Abroad Kaka to guide students 
                  through every step of their international medical education journey.
                </p>
                <p>
                  Today, we are proud to have helped over 1000+ students achieve their medical education 
                  goals across countries like Russia, Kazakhstan, Uzbekistan, Kyrgyzstan, Georgia, and Armenia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our commitment to student success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experienced professionals dedicated to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.experience}
                    </p>
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
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful students who trusted us with their dreams
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Start Your Application
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Contact Us
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

export default About;
