
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const countries = [
  "Russia", "Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Georgia", "Armenia"
];

const Register = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredCountry: "",
    academicScore: "",
    neetScore: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    
    toast({
      title: "Registration Successful!",
      description: "Our counselor will contact you within 24 hours.",
    });

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      preferredCountry: "",
      academicScore: "",
      neetScore: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free Consultation
              </h1>
              <p className="text-lg text-gray-600">
                Get expert guidance for your MBBS abroad journey. Fill out the form below and our counselors will contact you within 24 hours.
              </p>
            </div>

            {/* Registration Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-600">
                  Student Registration Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Preferred Country */}
                  <div className="space-y-2">
                    <Label>Preferred Country</Label>
                    <Select onValueChange={(value) => handleInputChange("preferredCountry", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Academic Scores */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="academicScore">12th Percentage</Label>
                      <Input
                        id="academicScore"
                        type="text"
                        placeholder="e.g., 85%"
                        value={formData.academicScore}
                        onChange={(e) => handleInputChange("academicScore", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neetScore">NEET Score</Label>
                      <Input
                        id="neetScore"
                        type="text"
                        placeholder="e.g., 450"
                        value={formData.neetScore}
                        onChange={(e) => handleInputChange("neetScore", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your preferences, questions, or any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Need immediate assistance? Contact us directly:
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  📱 WhatsApp: +91 9876543210
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  📞 Call: +91 9876543210
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Register;
