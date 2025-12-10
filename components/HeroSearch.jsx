"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, ChevronDown, Check } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSearchFilters } from "@/app/context/SearchFiltersContext";


const locations = ["All Locations", "Palm Jumeirah", "Downtown Dubai", "Dubai Marina", "Jumeirah Beach Residence", "Emirates Hills"];
const types = ["Any Type", "Villa", "Apartment", "Penthouse", "Townhouse", "Duplex"];

// Custom Select Component
function CustomSelect({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt === value) || placeholder;

  return (
    <div className="relative w-full" ref={selectRef}>
      <Label className="text-white mb-2 block">{label}</Label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/50 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <span className="text-gray-800">{selectedOption}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden animate-in fade-in-50 slide-in-from-top-5 duration-200">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  value === option ? 'bg-blue-50 text-blue-600' : 'text-gray-800'
                }`}
              >
                <span>{option}</span>
                {value === option && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroSearch() {
  const router = useRouter();
  const { setFilters } = useSearchFilters();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  useEffect(() => {
    AOS.init();
  }, [])
  

const handleSearch = () => {
    // Context میں فلٹرز سیٹ کر دیں
    setFilters({
      location: location === "All Locations" ? "All Locations" : location,
      type: type === "Any Type" ? "All Types" : type,
      minPrice: priceRange[0] > 0 ? priceRange[0].toString() : "",
      maxPrice: priceRange[1] < 50000000 ? priceRange[1].toString() : "",
    });

    // صرف page navigate کریں، کوئی query params نہیں
    router.push("/properties");
  };

  return (
    <div className="bg-black/30 backdrop-blur-[2px] rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto relative z-10" style={{boxShadow: '0px 0px 10px 0px gray'}} data-aos="fade-right">
      {/* Flex container - vertical on mobile, horizontal on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-6">
        
        {/* Left section - grows to fill space */}
        <div className="flex-1">
          {/* Inner flex container for Location and Type */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Location Select */}
            <div className="flex-1">
              <CustomSelect
                options={locations}
                value={location}
                onChange={setLocation}
                placeholder="All Locations"
                label="Location"
              />
            </div>
            
            {/* Property Type Select */}
            <div className="flex-1">
              <CustomSelect
                options={types}
                value={type}
                onChange={setType}
                placeholder="Any Type"
                label="Property Type"
              />
            </div>
          </div>
          
          {/* Price Range Slider - below selects on all screens */}
          <div className="mt-6">
            <Label className="text-white mb-2 block">Price Range (AED)</Label>
            <div className="mt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000000}
                step={500000}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-bold text-white">
                  {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} AED
                </p>
                <button
                  type="button"
                  onClick={() => setPriceRange([0, 50000000])}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Button - aligns to bottom on desktop */}
        <div className="lg:w-auto">
          <Button 
            onClick={handleSearch} 
            size="lg" 
            className="w-full lg:w-auto px-8 lg:px-12 py-6 lg:py-3 h-auto"
          >
            <Search className="mr-2 h-5 w-5" /> 
            <span>Search Properties</span>
          </Button>
        </div>
      </div>
      
    </div>
  );
}