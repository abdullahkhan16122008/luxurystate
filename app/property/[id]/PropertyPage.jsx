"use client";

import { useState, useEffect } from "react";
import { properties } from "@/data/properties";
import ImageGallery from "@/components/ImageGallery";
import { Bed, Bath, Ruler, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { use } from "react";
import { useParams } from "next/navigation";


export default function PropertyPage({ params }) {
    let param = useParams();
    const property = properties.find(p => p.id === Number(param.id));

    if (!property) return <div className="container mx-auto py-24 text-center text-2xl">Property not found</div>;

    const formattedPrice = new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <section className="py-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Gallery */}
                    <ImageGallery images={property.images} />

                    {/* Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
                            <p className="text-3xl font-bold text-blue-600 mb-4">{formattedPrice}</p>
                            <p className="flex items-center gap-2 text-xl text-muted-foreground">
                                <MapPin className="w-5 h-5" />
                                {property.location}
                            </p>
                        </div>

                        <div className="flex items-center gap-8 text-lg">
                            <span className="flex items-center gap-2"><Bed className="w-6 h-6" />{property.bedrooms} Beds</span>
                            <span className="flex items-center gap-2"><Bath className="w-6 h-6" />{property.bathrooms} Baths</span>
                            <span className="flex items-center gap-2"><Ruler className="w-6 h-6" />{property.area.toLocaleString()} {property.unit}</span>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Description</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">{property.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-3">Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {property.features.map(f => (
                                    <Badge key={f} variant="secondary" className="text-sm py-2 px-4">{f}</Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <Button size="lg" className="flex-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call +971 50 123 4567
                            </Button>
                            <Button size="lg" variant="secondary" className="flex-1" asChild>
                                <a href={`https://wa.me/971501234567?text=I'm%20interested%20in%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.location)}`}>
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Location</h2>
                    <iframe
                        width="100%"
                        height="500"
                        style={{ border: 0, borderRadius: "16px" }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3000!2d${property.lng}!3d${property.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${property.lat}° N, ${property.lng}° E!5e0!3m2!1sen!2sae!4v1729193642015`}
                    ></iframe>
                </div>
            </div>
        </section>
    );
}