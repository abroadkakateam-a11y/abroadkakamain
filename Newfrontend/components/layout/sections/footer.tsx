import { Separator } from "@/components/ui/separator";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-8">
          {/* Brand */}
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <Image
                src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753268940/transparent_1_akqkyt.png"
                alt="Abroad Kaka Logo"
                width={36}
                height={36}
                className="mr-2 rounded-lg"
              />
              <span className="text-transparent bg-gradient-to-r from-[#00A3D3] to-[#0077AA] bg-clip-text">
                Abroad Kaka
              </span>
            </Link>
            <p className="text-muted-foreground mt-2">
              Your trusted gateway to affordable MBBS abroad under ₹25 Lakh.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <Link href="tel:+917412028919" className="opacity-70 hover:opacity-100">
              +91 7412028919
            </Link>
            <Link href="mailto:support@abroadkaka.in" className="opacity-70 hover:opacity-100">
              support@abroadkaka.in
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <Link href="/about-us" className="opacity-70 hover:opacity-100">
              About
            </Link>
            <Link href="/explore" className="opacity-70 hover:opacity-100">
              Explore
            </Link>
            <Link href="/success-stories" className="opacity-70 hover:opacity-100">
              Success Stories
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
              href="https://www.youtube.com/@abroadkaka?si=OB8ObUdUSAA-pEWg&fbclid=PAZXh0bgNhZW0CMTEAAaexM2Wtn7fpBaCGfC8rC0bcGxMd0xVZiNiKB9oUIrvAnzo6jOBC-kzif10UJw_aem_4-fs-4lWKsDjIXQ5ChwaVQ"
              target="_blank"
              className="opacity-70 hover:opacity-100"
            >
              Youtube
            </Link>
            <Link
              href="https://wa.me/7412028919?text=Hello%2C%20I%20would%20love%20to%20know%20more%20about%20abroad%20kaka."
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
            &copy; {new Date().getFullYear()} Abroad Kaka. All rights reserved. By <a className="text-blue-400" href="https://newral.in" target="_blank" rel="noopener noreferrer">NEWRAL SOFTWARES</a>
          </p>
        </section>
      </div>
    </footer>
  );
};
