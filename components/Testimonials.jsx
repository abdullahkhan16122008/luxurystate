"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Our Clients Say
        </h2>

        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-gray-800 border-gray-700 h-full mx-4">
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-lg">{t.name}</h4>
                        <p className="text-gray-400">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-lg italic leading-relaxed">"{t.review}"</p>
                    <div className="flex mt-4">⭐⭐⭐⭐⭐</div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
}