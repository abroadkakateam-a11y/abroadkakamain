"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-20-30_MBBS_Abroad_couselling.pdf_zvr0ta.png",
    name: "Bhupendra Singh",
    userName: "Astana State Medical University",
    comment: "We are very satisfied with your services. Every supportive knowledge you gave to us was very helpful. Thank you so much",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-16_MBBS_Abroad_couselling.pdf_bbarnh.png",
    name: "Anjali Choudhary",
    userName: "OMSK State Medical University",
    comment: "Completely satisfied with the services. Whether it was for doubt discussion or preference list making or any queries regarding fee, course or colleges",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-00_MBBS_Abroad_couselling.pdf_uw7zpq.png",
    name: "Rupendra Singh",
    userName: "Kazak National Medical University",
    comment: "Really helpful and detailed information about colleges and counseling provided will be eternally thankful to you",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-26_MBBS_Abroad_couselling.pdf_azfpdr.png",
    name: "Harshita",
    userName: "Krasnoyarsk State Medical University",
    comment: "It was immensely helpful. I couldn't have done it properly if college kaka wouldn't be there.",
    rating: 4.9,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372708/Screenshot_2025-07-24_at_21-21-06_MBBS_Abroad_couselling.pdf_lmirmg.png",
    name: "Parvendra",
    userName: "Osh State Medical University",
    comment: "It was good. Good rules made and reply to query was good",
    rating: 4.5,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-21-36_MBBS_Abroad_couselling.pdf_ngesb2.png",
    name: "Raxandha Mansuri",
    userName: "Semey State Medical University",
    comment: "Excellent Service...The Prefrence List You peoples made was Pretty good...Thank You Very Much College Kaka Team",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-20_MBBS_Abroad_couselling.pdf_cexc6e.png",
    name: "Lakshay Manju",
    userName: "Samara State Medical University",
    comment: "Yeah, it was good for me, being a fresher, you've guided me about several rules and the steps of counselling. Thank you sir.",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-06_MBBS_Abroad_couselling.pdf_pgctpa.png",
    name: "Manish Prajapati",
    userName: "TVER State Medical University",
    comment: "I am very much satisfied with your counselling services and Thank you sir for supporting.",
    rating: 5.0,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-21-52_MBBS_Abroad_couselling.pdf_q0eami.png",
    name: "Gourav Vora",
    userName: "Kemerovo State Medical University",
    comment: "Very good effort for students and parents.",
    rating: 4.7,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-38_MBBS_Abroad_couselling.pdf_jluwbw.png",
    name: "Vikram Bhati",
    userName: "Siberian State Medical University",
    comment: "I feel very support and made this journey ease.",
    rating: 4.8,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372707/Screenshot_2025-07-24_at_21-22-44_MBBS_Abroad_couselling.pdf_eh6atn.png",
    name: "Lalit Parihar",
    userName: "Perm State Medical University",
    comment: "Guidance for counselling by sir helped a lot but I feel some improvement is needed like how sir made the preference list need to be discussed with us.",
    rating: 4.8,
  },
  {
    image: "https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753372709/Screenshot_2025-07-24_at_21-23-02_MBBS_Abroad_couselling.pdf_lid05y.png",
    name: "Sunil Jat",
    userName: "Orenburg State Medical University",
    comment: "Excellent guidance during the whole process of Medical College admission.",
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonial-marquee" className="max-w-[90%] mx-auto py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-[#00A3D3] mb-2 tracking-wider font-semibold">
          Loved by Students
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white">
          Real Feedback from Our Aspirants
        </h2>
      </div>

      <Marquee
        pauseOnHover
        className="gap-8"
        innerClassName="gap-8 my-6"
        fade

      >
        {reviewList.map((review, i) => (
          <Card
            key={i}
            className="w-[360px] md:w-[360px] bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-md hover:scale-[1.02] transition-transform"
          >
            <CardContent className="pt-6 px-6 pb-0">
              <div className="flex gap-1 pb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-[#00A3D3] text-[#00A3D3]"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm">{`"${review.comment}"`}</p>
            </CardContent>

            <CardHeader className="px-6 pb-6">
              <div className="flex items-center gap-4 mt-4">
                <Avatar>
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-md font-semibold dark:text-white">
                    {review.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {review.userName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </Marquee>
    </section>
  );
};
