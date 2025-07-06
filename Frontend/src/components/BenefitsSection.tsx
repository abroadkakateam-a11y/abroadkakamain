
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, DollarSign, GraduationCap, Users, Clock } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle,
    title: "NMC/WHO Approved",
    description: "All universities are recognized by National Medical Commission and WHO"
  },
  {
    icon: DollarSign,
    title: "Affordable Fees",
    description: "Low tuition fees and cost of living compared to private colleges in India"
  },
  {
    icon: GraduationCap,
    title: "Quality Education",
    description: "World-class medical education with modern infrastructure and facilities"
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Degrees recognized worldwide, enabling practice in multiple countries"
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Complete support from admission to graduation with dedicated counselors"
  },
  {
    icon: Clock,
    title: "Quick Processing",
    description: "Fast visa processing and admission procedures with minimal documentation"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Abroad Kaka?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive support to make your dream of studying MBBS abroad a reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
