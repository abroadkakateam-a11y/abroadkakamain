"use client"

import { Button } from "@/components/ui/button"

export default function StudyAbroadHero() {
    const handleRequestCall = () => {
        console.log("Request a call clicked")
        // Handle call request here
    }

    return (
        <div className="">
            {/* Main hero content */}
            <div className="flex-1 bg-cyan-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Main heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-cyan-500">Milestones?</span>{" "}
                            <span className="text-gray-900">You're Crushing Them!</span>
                        </h1>

                        {/* Subheading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Study Abroad with <span className="text-cyan-500">Abroadkaka</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            We stand with you on every step of abroad admission. Get your dream degree from abroad universities with
                            abroad kaka
                        </p>

                        {/* CTA Button */}
                        <div className="pt-6">
                            <Button
                                onClick={handleRequestCall}
                                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-xl text-lg h-auto transition-colors"
                            >
                                Request a Call
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
