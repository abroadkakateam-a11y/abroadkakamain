"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Array of rotating headlines to make it feel more dynamic
const rotatingHeadlines = [
    "Milestones? You're Crushing Them!",
    "Dream University? You're Accepted!",
    "Visa Worries? We've Got You Covered!",
    "Future Doctor? Start Your Journey!",
];

export default function StudyAbroadHero() {
    const [currentHeadline, setCurrentHeadline] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRequestCall = () => {
        console.log("Request a call clicked");
        // Handle call request here
    };

    // Rotate headlines every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentHeadline((prev) => (prev + 1) % rotatingHeadlines.length);
                setIsAnimating(false);
            }, 500); // Half of the animation duration
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2 }}
            >
                <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Main hero content */}
            <div className="relative flex-1 bg-cyan-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Animated Main heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex items-center justify-center">
                                <motion.span
                                    key={currentHeadline}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block"
                                >
                                    <span className="text-cyan-500">
                                        {rotatingHeadlines[currentHeadline].split("?")[0]}?
                                    </span>{" "}
                                    <span className="text-gray-900">
                                        {rotatingHeadlines[currentHeadline].split("?")[1]}
                                    </span>
                                </motion.span>
                            </h1>
                        </motion.div>

                        {/* Subheading with typing animation */}
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Study Abroad with{" "}
                            <motion.span
                                className="text-cyan-500 relative"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                }}
                            >
                                Abroadkaka
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-400"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </motion.span>
                        </motion.h2>

                        {/* Description with staggered animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                We stand with you on every step of abroad admission. Get your dream degree from abroad universities with
                                abroad kaka
                            </p>
                        </motion.div>

                        {/* CTA Button with hover animation */}
                        <motion.div
                            className="pt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            <Button
                                onClick={handleRequestCall}
                                className="relative bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-xl text-lg h-auto transition-all duration-300 overflow-hidden group"
                            >
                                <span className="relative z-10">Request a Call</span>
                                <motion.span
                                    className="absolute inset-0 bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                                <motion.span
                                    className="absolute -inset-2 border-2 border-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                />
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Floating student icons */}
                <div className="absolute top-1/4 left-5 md:left-10 opacity-80">
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        👨‍⚕️
                    </motion.div>
                </div>
                <div className="absolute bottom-1/4 right-5 md:right-10 opacity-80">
                    <motion.div
                        animate={{
                            y: [0, 15, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 0.5,
                        }}
                        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        👩‍⚕️
                    </motion.div>
                </div>
            </div>
        </div>
    );
}