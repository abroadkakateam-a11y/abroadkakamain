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
        <div className="min-h-screen bg-gradient-to-br from-[#00A3D3] via-[#00A3D3] to-[#03113D] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
                    {/* Left Column */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                How Do We <span className="text-[#fff]">Help</span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-md">
                                MBBS in Russia for Indian students promises unmatchable scope and opportunities.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                        <p className="text-gray-300 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                        <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">CONTACT INFORMATION</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="bg-white/90 border-0 rounded-lg h-11 text-gray-800 placeholder:text-gray-500"
                                />
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="bg-white/90 border-0 rounded-lg h-11 text-gray-800 placeholder:text-gray-500"
                                />
                            </div>
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="bg-white/90 border-0 rounded-lg h-11 text-gray-800 placeholder:text-gray-500"
                            />
                            <Input
                                type="text"
                                placeholder="Dream Location (e.g. Russia)"
                                value={formData.dreamLocation}
                                onChange={(e) => handleInputChange("dreamLocation", e.target.value)}
                                className="bg-white/90 border-0 rounded-lg h-11 text-gray-800 placeholder:text-gray-500"
                            />
                            <Input
                                type="text"
                                placeholder="Last Education / NEET Rank"
                                value={formData.lastEducation}
                                onChange={(e) => handleInputChange("lastEducation", e.target.value)}
                                className="bg-white/90 border-0 rounded-lg h-11 text-gray-800 placeholder:text-gray-500"
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#00A3D3] hover:bg-[#0099c2] text-white font-semibold py-3 rounded-lg text-base"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>

                            {submitted && <p className="text-green-400 text-center text-sm mt-2">Thank you! We'll be in touch soon.</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
