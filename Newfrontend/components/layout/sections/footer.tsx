import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          {/* Brand */}
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <GraduationCap className="w-9 h-9 mr-2 text-white bg-[#00A3D3] p-1 rounded-lg border border-secondary" />
              <h3 className="text-2xl">Abroad Kaka</h3>
            </Link>
            <p className="text-muted-foreground mt-2">
              Your trusted gateway to affordable MBBS abroad under ₹25 Lakh.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <Link href="tel:+919999999999" className="opacity-70 hover:opacity-100">
              +91 99999 99999
            </Link>
            <Link href="mailto:support@abroadkaka.in" className="opacity-70 hover:opacity-100">
              support@abroadkaka.in
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <Link href="#about" className="opacity-70 hover:opacity-100">
              About
            </Link>
            <Link href="#benefits" className="opacity-70 hover:opacity-100">
              Why Us
            </Link>
            <Link href="#faq" className="opacity-70 hover:opacity-100">
              FAQs
            </Link>
          </div>

          {/* Platforms */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Services</h3>
            <Link href="#countries" className="opacity-70 hover:opacity-100">
              MBBS in Kyrgyzstan
            </Link>
            <Link href="#countries" className="opacity-70 hover:opacity-100">
              MBBS in Kazakhstan
            </Link>
            <Link href="#countries" className="opacity-70 hover:opacity-100">
              MBBS in Uzbekistan
            </Link>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <Link
              href="https://instagram.com/abroadkaka"
              target="_blank"
              className="opacity-70 hover:opacity-100"
            >
              Instagram
            </Link>
            <Link
              href="https://t.me/abroadkaka"
              target="_blank"
              className="opacity-70 hover:opacity-100"
            >
              Telegram
            </Link>
            <Link
              href="https://wa.me/919999999999"
              target="_blank"
              className="opacity-70 hover:opacity-100"
            >
              WhatsApp
            </Link>
          </div>
        </div>

        <Separator className="my-6" />

        <section className="text-sm text-muted-foreground text-center">
          <p>
            &copy; {new Date().getFullYear()} Abroad Kaka. All rights reserved. | Designed with 💙
          </p>
        </section>
      </div>
    </footer>
  );
};
