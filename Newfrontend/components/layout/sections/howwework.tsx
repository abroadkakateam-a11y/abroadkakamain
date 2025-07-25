"use client"
import type React from "react"
import { useState } from "react"
import { Plane, Droplets, Building2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HowWeHelpSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dreamLocation: "",
        lastEducation: "",
    })

    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: "", email: "", phone: "", dreamLocation: "", lastEducation: "" })
            } else {
                console.error("Submission failed.")
            }
        } catch (error) {
            console.error("An error occurred while submitting the form.", error)
        } finally {
            setLoading(false)
        }
    }

    const features = [
        {
            icon: <Plane className="w-6 h-6 text-[#00A3D3]" />,
            title: "Expert Guidance",
            description: "Our team of experienced counselors provides customized advice and support throughout your journey.",
        },
        {
            icon: <Droplets className="w-6 h-6 text-[#00A3D3]" />,
            title: "Affordable Options",
            description: "We help you find high-quality MBBS programs that fit your budget.",
        },
        {
            icon: <Building2 className="w-6 h-6 text-[#00A3D3]" />,
            title: "Top-Ranked Universities",
            description: "We partner with the best medical colleges out there.",
        },
    ]

    return (
        <div className="min-h-screen  relative overflow-hidden py-14">
            {/* Decorative elements */}
           

            <div className="container  mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="bg-gradient-to-br from-[#00A3D3] via-[#00A3D3] to-[#03113D] backdrop-blur-lg rounded-3xl border border-white/10 p-8 md:p-12 lg:p-16 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
                        {/* Left Column */}
                        <div className="space-y-10">
                            <div className="space-y-5">
                                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    How Do We <span className="text-white/90">Help</span>
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                                    MBBS in Russia for Indian students promises unmatchable scope and opportunities.
                                </p>
                            </div>
                            <div className="space-y-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-5">
                                        <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                            <p className="text-gray-300 text-sm md:text-base mt-1 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg">
                            <div className="space-y-1 mb-8 text-center">
                                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                                <p className="text-gray-300 text-sm">Fill out the form and we'll get back to you</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="bg-white/90 border-0 rounded-xl h-12 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#00A3D3]"
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="bg-white/90 border-0 rounded-xl h-12 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#00A3D3]"
                                    />
                                </div>
                                <Input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    className="bg-white/90 border-0 rounded-xl h-12 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#00A3D3]"
                                />
                                <Input
                                    type="text"
                                    placeholder="Dream Location (e.g. Russia)"
                                    value={formData.dreamLocation}
                                    onChange={(e) => handleInputChange("dreamLocation", e.target.value)}
                                    className="bg-white/90 border-0 rounded-xl h-12 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#00A3D3]"
                                />
                                <Input
                                    type="text"
                                    placeholder="Last Education / NEET Rank"
                                    value={formData.lastEducation}
                                    onChange={(e) => handleInputChange("lastEducation", e.target.value)}
                                    className="bg-white/90 border-0 rounded-xl h-12 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#00A3D3]"
                                />

                                <Button
                                    type="submit"
                                    className="w-full hover:bg-[#00668C] bg-gradient-to-r from-[#00A3D3] to-[#0077A3] hover:from-[#0099C2] hover:to-[#00668C] text-white font-semibold py-3 rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-[#00A3D3]/30"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>

                                {submitted && (
                                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30 text-green-400 text-center text-sm">
                                        Thank you! We'll be in touch soon.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}