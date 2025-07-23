import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12">
      <hr className="border-secondary" />

      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader className="flex flex-col items-center justify-center">
              <Image
              src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753268725/transparent_1_zwcqee.png"
              alt="Abroad Kaka Logo"
              width={300}
              height={300}
              className="mb-4"
              />
              <CardTitle className="text-4xl md:text-5xl font-bold text-center">
              Join the Abroad Kaka
              <span className="text-transparent pl-2 bg-gradient-to-r from-[#00A3D3] to-[#005F9E] bg-clip-text">
                Student Network
              </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Be part of our growing family of 10,000+ NEET aspirants and MBBS
              students across the globe. Get access to expert mentors,
              on-campus Indian caretakers, and 24/7 student support via our
              exclusive WhatsApp & Telegram groups.
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button  className="bg-[#00A3D3] hover:bg-[#00A3D3]" asChild>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join WhatsApp Group
                </a>
              </Button>

              <Button asChild variant="secondary">
                <a
                  href="https://t.me/abroadkaka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Telegram
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <hr className="border-secondary" />
    </section>
  );
};
