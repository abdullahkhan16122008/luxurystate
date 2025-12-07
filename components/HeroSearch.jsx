"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

const locations = ["All Locations", "Palm Jumeirah", "Downtown Dubai", "Dubai Marina", "Jumeirah Beach Residence", "Emirates Hills"];
const types = ["Any Type", "Villa", "Apartment", "Penthouse", "Townhouse", "Duplex"];

export default function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location && location !== "All Locations") params.set("location", location);
    if (type && type !== "Any Type") params.set("type", type);
    params.set("minPrice", priceRange[0]);
    params.set("maxPrice", priceRange[1]);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto -mt-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Label>Location</Label>
          <Select onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1">
          <Label>Property Type</Label>
          <Select onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-2">
          <Label>Price Range (AED)</Label>
          <div className="mt-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={50000000}
              step={500000}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">
              {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} AED
            </p>
          </div>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} size="lg" className="w-full lg:w-auto px-12">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
}