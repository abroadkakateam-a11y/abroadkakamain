
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Countries from "./pages/Countries";
import Universities from "./pages/Universities";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import CountryKyrgyzstan from "./pages/CountryKyrgyzstan";
import CountryKazakhstan from "./pages/CountryKazakhstan";
import UniversityDetail from "./pages/UniversityDetail";
import UniversityInternationalSchool from "./pages/UniversityInternationalSchool";
import UniversityAsianMedical from "./pages/UniversityAsianMedical";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/country/kyrgyzstan" element={<CountryKyrgyzstan />} />
          <Route path="/country/kazakhstan" element={<CountryKazakhstan />} />
          <Route path="/university/kyrgyz-state-medical-academy" element={<UniversityDetail />} />
          <Route path="/university/international-school-medicine" element={<UniversityInternationalSchool />} />
          <Route path="/university/asian-medical-institute" element={<UniversityAsianMedical />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
