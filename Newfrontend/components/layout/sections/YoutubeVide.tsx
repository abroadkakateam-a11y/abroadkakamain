"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";

type Video = {
    src: string; // YouTube ID
    title: string;
    category: string;
};

const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => { },
    currentIndex: 0,
});

export const YoutubeVideoGallery = ({ videos }: { videos: Video[] }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScrollability();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!carouselRef.current) return;
        const scrollBy = direction === "left" ? -300 : 300;
        carouselRef.current.scrollBy({ left: scrollBy, behavior: "smooth" });
    };

    const handleCardClose = (index: number) => {
        const cardWidth = window.innerWidth < 768 ? 230 : 384;
        const gap = window.innerWidth < 768 ? 4 : 8;
        const scrollPosition = (cardWidth + gap) * index;
        carouselRef.current?.scrollTo({ left: scrollPosition, behavior: "smooth" });
        setCurrentIndex(index);
    };

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <section className="py-20">
                <div className="text-center space-y-2 mb-10">
                    <h2 className="text-lg text-[#00A3D3] uppercase tracking-wider">Student Life Abroad</h2>
                    <h1 className="text-3xl font-bold">Real Stories. Real Students.</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Explore how Abroad Kaka helps students live, study, and succeed across the globe.
                    </p>
                </div>

                <div className="relative w-full">
                    <div
                        ref={carouselRef}
                        onScroll={checkScrollability}
                        className="flex w-full overflow-x-scroll overflow-hidden scroll-smooth gap-4 pl-4 max-w-7xl mx-auto py-6"
                    >
                        {videos.map((video, index) => (
                            <VideoCard key={index} video={video} index={index} />
                        ))}
                    </div>

                    <div className="mr-10 flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className="z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40"
                        >
                            <IconArrowNarrowLeft className="h-6 w-6 text-gray-600" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className="z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-40"
                        >
                            <IconArrowNarrowRight className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </section>
        </CarouselContext.Provider>
    );
};

const VideoCard = ({ video, index }: { video: Video; index: number }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose } = useContext(CarouselContext);

    useOutsideClick(containerRef, () => setOpen(false));

    useEffect(() => {
        const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, []);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6">
                        <motion.div
                            ref={containerRef}
                            className="relative bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-5xl p-4 md:p-8 shadow-xl"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                        >
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onCardClose(index);
                                }}
                                className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black rounded-full p-1"
                            >
                                <IconX className="w-5 h-5" />
                            </button>
                            <h3 className="text-xl font-bold mb-4">{video.title}</h3>
                            <div className="aspect-video w-full">
                                <iframe
                                    className="w-full h-full rounded-xl"
                                    src={`https://www.youtube.com/embed/${video.src}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setOpen(true)}
                className="w-[320px] md:w-[28rem] aspect-video rounded-2xl overflow-hidden relative flex-shrink-0"
            >
                <img
                    src={`https://img.youtube.com/vi/${video.src}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full text-white text-left">
                    <p className="text-sm opacity-80">{video.category}</p>
                    <h3 className="text-lg font-semibold">{video.title}</h3>
                </div>
            </button>
        </>
    );
};
