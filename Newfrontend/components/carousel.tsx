"use client";

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { DotButton, NextButton, PrevButton } from './carousel-buttons';
import Image from 'next/image';

interface CarouselProps {
  images: Array<{ url: string; alt: string }>;
  showControls?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  delay?: number;
}

export function Carousel({
  images,
  showControls = true,
  showDots = true,
  autoPlay = true,
  delay = 5000
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    autoPlay ? [Autoplay({ delay })] : []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    
    // Properly type the event handler
    const handleSelect = () => onSelect();
    emblaApi.on('select', handleSelect);
    
    // Return cleanup function with proper type
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="embla relative w-full h-full overflow-hidden">
      <div className="embla__viewport w-full h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {images.map((image, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 relative" key={index}>
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
              />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2 z-10">
          <PrevButton onClick={() => emblaApi?.scrollPrev()} />
          <NextButton onClick={() => emblaApi?.scrollNext()} />
        </div>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}