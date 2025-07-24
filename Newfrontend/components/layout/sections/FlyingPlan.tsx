"use client";
import { useTheme } from "next-themes";
import Image from "next/image";


export const PlaneSection = () => {
    const { theme } = useTheme();
    return (
        <section className="w-full">
            <div className="relative w-full my-14 overflow-hidden">
                {/* Blurred Background */}
                <div className="absolute inset-0 bg-[#00A3D3] rounded-lg blur-3xl z-0" />

                {/* ✈️ Plane Animation - Full Width Across Screen */}
                <div className="absolute   -translate-y-1/2 left-[-100%] z-30 animate-plane-move">
                    <Image
                        width={400}
                        height={400}
                        src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753283984/aircraft_1_igdnco.png"
                        alt="plane"
                        className="md:w-[80vh] w-[40vw] h-24 md:h-auto"
                    />
                </div>

                {/* Main Image */}
                <Image
                    width={1200}
                    height={1200}
                    className="w-full mx-auto rounded-lg relative z-10 leading-none flex items-center border  border-secondary "
                    src="https://res.cloudinary.com/dt3j2uiyb/image/upload/v1753285937/Frame_2147224897_bkbggx.png"
                    alt="dashboard"
                />
                {/* Top Gradient Overlay */}
                <div className="absolute top-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-background/0 via-background/50 to-background rounded-lg z-20" />
                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background  rounded-lg z-20" />
            </div>
        </section>
    );
};
