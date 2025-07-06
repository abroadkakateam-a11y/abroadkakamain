
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9876543210", "+91 8765432109"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@abroadkaka.com", "admissions@abroadkaka.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Education Street", "New Delhi, India 110001"],
      description: "Visit our office for consultation"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      description: "We're here to help you"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Have questions? We're here to help you with your medical education journey
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 mb-1">
                        {detail}
                      </p>
                    ))}
                    <p className="text-sm text-gray-500 mt-2">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center space-x-2">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" required />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Preferred Country</Label>
                      <select id="country" className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select a country</option>
                        <option value="russia">Russia</option>
                        <option value="kazakhstan">Kazakhstan</option>
                        <option value="uzbekistan">Uzbekistan</option>
                        <option value="kyrgyzstan">Kyrgyzstan</option>
                        <option value="georgia">Georgia</option>
                        <option value="armenia">Armenia</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your query or requirements" 
                        rows={4}
                        required 
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Visit Our Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Interactive Map Coming Soon</p>
                        <p className="text-sm">123 Education Street, New Delhi</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Schedule a visit to our office for detailed consultation about your 
                      medical education abroad. Our counselors are available to guide you 
                      through the entire process.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Quick Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp Support</p>
                        <p className="text-sm text-gray-600">Get instant replies on WhatsApp</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Emergency Helpline</p>
                        <p className="text-sm text-gray-600">24/7 support for urgent queries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "How long does the admission process take?",
                  answer: "The typical admission process takes 2-4 weeks once all documents are submitted."
                },
                {
                  question: "Do you help with visa applications?",
                  answer: "Yes, we provide complete visa assistance including document preparation and interview guidance."
                },
                {
                  question: "Are the universities NMC/WHO approved?",
                  answer: "All our partner universities are NMC approved and WHO listed, ensuring global recognition."
                },
                {
                  question: "What is included in your service fees?",
                  answer: "Our fees include admission guidance, document verification, visa assistance, and pre-departure orientation."
                }
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
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

export default Contact;
