
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Abroad Kaka</h3>
                <p className="text-gray-400 text-sm">Study MBBS Abroad</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for medical education abroad. We help Indian students achieve their dreams of becoming doctors.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/countries", label: "Countries" },
                { href: "/universities", label: "Universities" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Study Destinations</h4>
            <ul className="space-y-2">
              {[
                "Russia",
                "Kazakhstan", 
                "Uzbekistan",
                "Kyrgyzstan",
                "Georgia",
                "Armenia"
              ].map((country) => (
                <li key={country}>
                  <Link 
                    to={`/country/${country.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    MBBS in {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">info@abroadkaka.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  123 Education Street<br />
                  New Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Abroad Kaka. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
