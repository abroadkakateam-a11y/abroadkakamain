"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string; // e.g., University name
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image:
      "https://avatars.githubusercontent.com/u/75042455?v=4",
    name: "Lakshay Manju",
    userName: "Samara State Medical University",
    comment:
      "Yeah, it was good for me, being a fresher, you've guided me about several rules and the steps of counselling. Thank you Sir.",
    rating: 5.0,
  },
  {
    image:
      "https://avatars.githubusercontent.com/u/75042455?v=4",
    name: "Harshita",
    userName: "Krasnoyarsk State Medical University",
    comment:
      "It was immensely helpful. I couldn't have done it properly if College Kaka wouldn’t be there.",
    rating: 4.9,
  },
  {
    image:
      "https://avatars.githubusercontent.com/u/75042455?v=4",
    name: "Manish Prajapati",
    userName: "Tver State Medical University",
    comment:
      "I am very much satisfied with your counselling services and thank you Sir for supporting.",
    rating: 5.0,
  },
  {
    image:
      "https://avatars.githubusercontent.com/u/75042455?v=4",
    name: "Lalit Parihar",
    userName: "Perm State Medical University",
    comment:
      "Guidance for counselling by Sir helped a lot but I feel some improvement is needed like how Sir made the preference list need to be discussed with us.",
    rating: 4.8,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-[#00A3D3] mb-2 tracking-wider font-semibold">
          Testimonials
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Hear From Our Students
        </h2>
      </div>

      <Carousel
        opts={{ align: "start" }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-[#00A3D3] text-[#00A3D3]"
                      />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>
                        {review.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
