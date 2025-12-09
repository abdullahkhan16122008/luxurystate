"use client";

import { useState, useMemo, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilterBar from "@/components/PropertyFilterBar";
// import { properties } from "@/data/properties";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // run: npx shadcn@latest add skeleton (optional)
import { Button } from "@/components/ui/button";
import axios from "axios";

// const ITEMS_PER_PAGE = 9;

export default function PropertiesPage() {
  const [filters, setFilters] = useState({
    location: "All Locations",
    type: "All Types",
    bedrooms: "Any",
    maxPrice: 100000000,
  });
  const [sort, setSort] = useState("price-low");
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  let fetchProperties = async () => {
    let api = process.env.NEXT_PUBLIC_API_URL;
    try {
      let res = await axios.post(`${api}/api/get/all/properties`, { page });
      if (res.data.success) {
        setProperties(res.data.properties)
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProperties();
  }, [page])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = [...properties];

    // Filters
    if (filters.location !== "All Locations") result = result.filter(p => p.location === filters.location);
    if (filters.type !== "All Types") result = result.filter(p => p.type === filters.type);
    if (filters.bedrooms !== "Any") result = result.filter(p => p.bedrooms >= Number(filters.bedrooms[0]));
    result = result.filter(p => p.price <= filters.maxPrice);

    // Sorting
    result.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "area") return b.area - a.area;
      return 0;
    });

    return result;
  }, [filters, sort]);

  // const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  // const paginated = filteredAndSorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">Luxury Properties in Dubai</h1>
          <p className="text-xl text-center text-muted-foreground mb-12">Discover {filteredAndSorted.length} exclusive listings</p>

          <PropertyFilterBar filters={filters} setFilters={setFilters} />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* {loading */}
            {/* ? Array(9).fill().map((_, i) => ( */}
            {loading && (
              <div className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            )}
            {/* )) */}
            {/* : paginated.map(property => ( */}
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
            {/* // ))} */}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <Button
              // key={i + 1}
              // variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(page + 1)}
            >
              Show More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}