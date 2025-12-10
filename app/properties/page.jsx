"use client";

import { useState, useMemo, useEffect, memo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input"
import ReactSlider from "react-slider";
import { useSearchFilters } from "../context/SearchFiltersContext";

export default function PropertiesPage() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000000)
  const { filters, setFilters } = useSearchFilters();
  // const [filters, setFilters] = useState({
  //   location: "All Locations",
  //   type: "All Types",
  //   bedrooms: "Any",
  //   minPrice: "",           // Add default empty
  //   maxPrice: 100000000,    // Add default max
  // });
  const [sort, setSort] = useState("price-low");
  const [properties, setProperties] = useState([]);
  const [limit, setLimit] = useState(8);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await axios.post(`${api}/api/get/all/properties`, { limit });
      if (res.data.success) {
        setProperties(res.data.properties || []);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [limit]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      location: filters.location,
      type: filters.type,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice || "100000000",
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...properties];

    if (filters.location !== "All Locations") result = result.filter(p => p.location === filters.location);
    if (filters.type !== "All Types") result = result.filter(p => p.type === filters.type);
    if (filters.bedrooms !== "Any") result = result.filter(p => p.bedrooms >= Number(filters.bedrooms[0]));
    if (filters.minPrice !== "") {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice !== "") {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }

    result.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "area") return b.area - a.area;
      if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    return result;
  }, [properties, filters, sort]);

  const dubaiLocations = ["All Locations", "Palm Jumeirah", "Downtown Dubai", "Dubai Marina", "Jumeirah Beach Residence", "Emirates Hills"];;
  const propertyTypes = ["All Types", "Villa", "Apartment", "Penthouse", "Townhouse", "Duplex"];
  const bedroomOptions = ["Any", "1+", "2+", "3+", "4+", "5+", "6+"];

  const FilterSidebar =  memo(() => {
    const priceRange = useMemo(() => {
      const min = filters.minPrice ? Number(filters.minPrice) : 0;
      const max = filters.maxPrice ? Number(filters.maxPrice) : 100000000;
      return [min, max];
    }, [filters.minPrice, filters.maxPrice]);

    const handlePriceChange = (value) => {
      const [newMin, newMax] = value;
      setFilters(prev => ({
        ...prev,
        minPrice: newMin > 0 ? newMin : "",
        maxPrice: newMax < 100000000 ? newMax : "",
      }));
    };

    const formatPrice = (value) => {
      if (value === 0 || !value) return "Any";
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toLocaleString();
    };


    return (
      <div className="space-y-8">
        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <Select value={filters.location} onValueChange={(v) => setFilters(prev => ({ ...prev, location: v }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {dubaiLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Property Type</h3>
          <Select value={filters.type} onValueChange={(v) => setFilters(prev => ({ ...prev, type: v }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => <SelectItem key={type} value={type} >{type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bedrooms</h3>
          <Select value={filters.bedrooms} onValueChange={(v) => setFilters(prev => ({ ...prev, bedrooms: v }))}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map(b => (
                <SelectItem key={b} value={b}>{b === "Any" ? "Any Bedrooms" : b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range - Dual Inputs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Price Range (AED)</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Min Price */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Min Price</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={filters.minPrice}
                onChange={(e) => {
                  const val = e.target.value;

                  // Allow only digits
                  if (/^\d*$/.test(val)) {
                    setFilters(prev => ({ ...prev, minPrice: val }));
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Max Price</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={filters.maxPrice}
                onChange={(e) => {
                  const val = e.target.value;

                  if (/^\d*$/.test(val)) {
                    setFilters(prev => ({ ...prev, maxPrice: val }));
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
              />
            </div>
          </div>

          {/* Live Preview - Exact Values (No M/K) */}
          <div className="mt-5 text-center">
            <p className="text-sm font-medium text-gray-700 bg-gray-50 py-3 px-6 rounded-xl inline-block">
              {filters.minPrice || filters.maxPrice ? (
                <>
                  {filters.minPrice ? `${Number(filters.minPrice).toLocaleString()} AED` : "Any"}
                  <span className="mx-2 text-gray-400">—</span>
                  {filters.maxPrice ? `${Number(filters.maxPrice).toLocaleString()} AED` : "Any"}
                </>
              ) : (
                "Any Price"
              )}
            </p>
          </div>
        </div>
      </div>
    );
  });

  const handleLoadMore = () => {
    setLimit(prev => prev + 8);
  };


  return (
    <>
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-6xl font-bold text-center mb-4">Luxury Properties in Dubai</h1>
          <p className="md:text-xl text-center text-muted-foreground mb-12">{ filteredAndSorted.length === 0 ? `0 Properties Found` : `Discover ${filteredAndSorted.length} exclusive listings`}</p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Left Sidebar Filters */}
            <aside className="hidden lg:block w-full lg:w-80 bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-8">
              <h2 className="text-2xl font-bold mb-8">Filters</h2>
              <FilterSidebar />
            </aside>

            {/* Main Content - Right Side */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full p-5 shadow-2xl hover:scale-110 transition-all"
                >
                  <Filter className="h-7 w-7" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center">
                    {Object.values(filters).filter(v => v && v !== "All Locations" && v !== "All Types" && v !== "Any" && v !== 100000000).length}
                  </span>
                </button>
              </div>

              {/* Sort Bar */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">{filteredAndSorted.length} results</p>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area">Largest Area</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                {loading ? (
                  Array(6).fill().map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-64 w-full rounded-2xl" />
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-6 w-1/2" />
                    </div>
                  ))
                ) : (
                  filteredAndSorted.map((property, index) => (
                    <PropertyCard key={property._id} property={property} index={index} />
                  ))
                )}
              </div>

              {/* Load More */}
              <div className="flex justify-center mt-16">
                <Button onClick={handleLoadMore} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Load More
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar - Unchanged */}
          {mobileOpen ? (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
              <div className="relative ml-auto w-full max-w-md bg-white shadow-2xl rounded-l-3xl overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <button onClick={() => setMobileOpen(false)} className="p-3 hover:bg-gray-100 rounded-full">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-8 overflow-y-auto">
                  <FilterSidebar />
                </div>
                <div className="p-6 border-t bg-gray-50">
                  <button onClick={() => setMobileOpen(false)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}