"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function ImageGallery({ images }) {
  const [mainViewport, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewport, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
  }, [mainApi, onSelect]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl" ref={mainViewport}>
        <Carousel className="w-full">
          <CarouselContent>
            {images?.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video lg:aspect-square">
                  <Image
                    src={src}
                    alt={`Property image ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden" ref={thumbViewport}>
        <div className="flex gap-3">
          {images?.map((src, index) => (
            <button
              key={index}
              onClick={() => {
                onThumbClick(index)
              }}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                selectedIndex === index ? "scale-[1.05] opacity-100" : "opacity-60"
              }`}
            >
              <Image src={src} alt="" width={96} height={96} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}