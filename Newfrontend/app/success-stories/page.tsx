"use client";

import React from 'react';
import { FAQSection } from '@/components/layout/sections/faq';
import { CommunitySection } from '@/components/layout/sections/community';
import StudyAbroadHero from '@/components/layout/sections/Bluelable';
import { TestimonialSection } from '@/components/layout/sections/testimonial';
import { StudentLifeSection } from '@/components/layout/sections/StudentLifeSection';
import { YoutubeVideoGallery } from "@/components/layout/sections/YoutubeVide";
import { FeaturesSection } from '@/components/layout/sections/features';
import HowWeHelpSection from '@/components/layout/sections/howwework';
import { FooterSection } from '@/components/layout/sections/footer';
import { PlaneSection } from '@/components/layout/sections/FlyingPlan';

import { motion } from "framer-motion";
const SuccessStoriesPage = () => {
    const video = [
        {
            title: "NOSMA Russia Campus & Hostel Tour | Abroad MBBS under 25 Lakh ",
            category: "Student Journey",
            src: "kHZE58RvHaE",
        },
        {
            title: "Complete Details about MBBS in Georgia | All Pros & Cons",
            category: "Life Abroad",
            src: "_T-AK-XVE9s",
        },
        {
            title: "Abroad MBBS Honest Reviews by Students | Omsk university Russia |",
            category: "Guides",
            src: "iXU7rSjF8sU",
        },
        {
            title: "MBBS in 1.5 Lakh per semester | Chechen University Russia",
            category: "Testimonials",
            src: "pxbZkn4Cw54",
        },

        {
            title: "Dagestan University Final Year Student's Experience | MBBS from Russia | Shocking Truth by Students",
            category: "Testimonials",
            src: "P9HElPTxF_0",
        },

    ]

    const faqs = [
        {
            question: "How do I choose the right medical university?",
            answer: "Our counselors evaluate your academic background, budget, and preferences to recommend the best options."
        },
        {
            question: "What's the admission process timeline?",
            answer: "Typically 3-6 months including document preparation, university application, and visa processing."
        }
    ];

    return (
        <div className="success-stories-page">
            <section className="hero-section md:mt-10 bg-blue-50 py-20 relative overflow-hidden">
                {/* Animated background elements */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2 }}
                >
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
                </motion.div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        className="text-4xl font-bold text-gray-900 mb-6 relative inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="relative z-10">
                            Our Students'
                            <span className="text-blue-600 mx-2 inline-block skew-x-[-10deg] ">
                                Success Stories
                            </span>
                        </span>
                        {/* Jigjag underline effect */}
                        
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Thousands of students have realized their dream of studying medicine abroad with our guidance.
                    </motion.p>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                    className="absolute top-1/4 left-10 opacity-80"
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                        🎓
                    </div>
                </motion.div>
                <motion.div
                    className="absolute bottom-1/4 right-10 opacity-80"
                    animate={{
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5,
                    }}
                >
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                        🌍
                    </div>
                </motion.div>
            </section>

            {/* Plane Section - Show journey metaphor */}
            <PlaneSection />

            {/* Key Benefits */}
            <BenefitsSection />

            {/* How We Help */}
            <HowWeHelpSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Video Testimonials */}
            <section className="video-gallery-section py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <YoutubeVideoGallery videos={video} />
                </div>
            </section>

            {/* Student Life */}
            <StudentLifeSection />

            {/* Testimonials */}
            <section className="testimonials-section py-16">
                <div className="container mx-auto px-4">
                    <TestimonialSection />
                </div>
            </section>

            {/* Study Abroad Hero */}
            <StudyAbroadHero />

            {/* FAQ */}
            <section className="faq-section py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FAQSection />
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Medical Journey?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of successful students who achieved their dreams with our guidance.
                    </p>
                    <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300">
                        Book Free Consultation
                    </button>
                </div>
            </section>
            <FooterSection />
        </div>
    );
};

// Component implementations (would typically be in separate files)

const BenefitsSection = () => (
    <section className="benefits-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        title: "10+ Years Experience",
                        description: "We've helped thousands of students since 2010",
                        icon: "🏛️"
                    },
                    {
                        title: "20+ Partner Universities",
                        description: "Strong relationships with top medical schools",
                        icon: "🌍"
                    },
                    {
                        title: "98% Visa Success Rate",
                        description: "Expert guidance for your visa application",
                        icon: "✈️"
                    }
                ].map((benefit, index) => (
                    <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="text-4xl mb-4">{benefit.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>

);

// Implement other sections similarly...

export default SuccessStoriesPage;