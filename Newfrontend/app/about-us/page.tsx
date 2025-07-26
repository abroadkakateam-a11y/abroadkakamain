"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, GraduationCap, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUsPage() {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative md:mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About College Kaka
                    </motion.h1>
                    <motion.p
                        className="text-xl max-w-2xl mx-auto mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Your trusted partner in MBBS abroad counseling since 2010
                    </motion.p>
                </div>

                {/* Background elements */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2 }}
                >
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
                </motion.div>
            </section>

            {/* Our Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
                        <p className="text-lg text-gray-600">
                            College Kaka began with a simple mission: to help Indian students achieve their dreams of becoming doctors through quality international education. Since 2010, we've guided thousands of students to prestigious medical universities worldwide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md text-center"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="text-blue-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                            <p className="text-gray-600">Partnered with 150+ universities across 25+ countries</p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md text-center"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-cyan-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">10,000+ Students</h3>
                            <p className="text-gray-600">Successfully placed in medical programs worldwide</p>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md text-center"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="text-green-600 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">98% Success Rate</h3>
                            <p className="text-gray-600">Visa approval and admission success rate</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                                        <BookOpen className="text-blue-600 w-5 h-5" />
                                    </div>
                                    <span>To develop tomorrow's healthcare leaders through quality medical education</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                                        <BookOpen className="text-blue-600 w-5 h-5" />
                                    </div>
                                    <span>To create leadership in medical science, education, and research</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                                        <BookOpen className="text-blue-600 w-5 h-5" />
                                    </div>
                                    <span>To motivate for prioritizing healthcare services and community outreach</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-cyan-100 p-2 rounded-full mr-4">
                                        <GraduationCap className="text-cyan-600 w-5 h-5" />
                                    </div>
                                    <span>To train future leaders of medicine who set new standards in knowledge and compassion</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-cyan-100 p-2 rounded-full mr-4">
                                        <GraduationCap className="text-cyan-600 w-5 h-5" />
                                    </div>
                                    <span>To provide the best academic facilities and atmosphere to our students</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-cyan-100 p-2 rounded-full mr-4">
                                        <GraduationCap className="text-cyan-600 w-5 h-5" />
                                    </div>
                                    <span>To serve healthcare needs by educating practitioners to the highest international standards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Choose College Kaka?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We stand out from other consultancies with our comprehensive services and student-first approach
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "English Medium Programs",
                                description: "All our recommended universities offer English-medium MBBS programs",
                                icon: "🇬🇧"
                            },
                            {
                                title: "Internationally Valid Degrees",
                                description: "Degrees recognized by WHO, MCI, and medical councils worldwide",
                                icon: "🌍"
                            },
                            {
                                title: "FMGE/NEXT Preparation",
                                description: "Special classes to prepare for Indian medical licensing exams",
                                icon: "📚"
                            },
                            {
                                title: "Safe Hostel Facilities",
                                description: "Separate, well-managed hostels for boys and girls with Indian food",
                                icon: "🏠"
                            },
                            {
                                title: "Direct Flights from India",
                                description: "Universities located in cities with direct flight connections from Delhi",
                                icon: "✈️"
                            },
                            {
                                title: "Indian Caretakers",
                                description: "Dedicated Indian staff available at campuses for student support",
                                icon: "👨‍⚕️"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NMC Guidelines Section */}
            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">NMC Guidelines Compliance</h2>
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded-full mr-4 mt-1">
                                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span>All recommended universities are registered with the National Medical Commission of India</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded-full mr-4 mt-1">
                                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span>Students must be NEET qualified within 3 years to be eligible</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded-full mr-4 mt-1">
                                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span>Minimum 50% marks in Physics, Chemistry, and Biology in 12th grade required</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-blue-100 p-1 rounded-full mr-4 mt-1">
                                        <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span>Valid Indian passport mandatory for all students</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">What Our Students Say</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Bhupendra Singh",
                                university: "Astana State Medical University, Kazakhstan",
                                quote: "We are very satisfied with your services. Every supportive knowledge you gave to us was very helpful."
                            },
                            {
                                name: "Anjali Choudhary",
                                university: "OMSK State Medical University, Russia",
                                quote: "Completely satisfied with the services. Whether it was for doubt discussion or preference list making."
                            },
                            {
                                name: "Harshita",
                                university: "Krasnoyarsk State Medical University, Russia",
                                quote: "It was immensely helpful. I couldn't have done it properly if college kaka wouldn't be there."
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.university}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">"{testimonial.quote}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Medical Journey?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of successful students who achieved their dreams with our guidance
                    </p>
                    <Button variant="secondary" size="lg" className="font-semibold">
                        Book Free Consultation
                    </Button>
                </div>
            </section>
        </div>
    );
}