"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Ruler, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PropertyCard({ property }) {
  const formattedPrice = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl font-bold">{formattedPrice}</div>
          <div className="text-sm opacity-90">AED</div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-muted-foreground flex items-center gap-1 mb-4">
          <MapPin className="w-4 h-4" />
          {property.location}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {property.area.toLocaleString()} {property.unit}
          </span>
        </div>

        <Button asChild className="w-full group">
          <Link href={`/property/${property.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}