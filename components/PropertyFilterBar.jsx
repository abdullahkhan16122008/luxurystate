"use client";

import { properties } from "@/data/properties";

export default function PropertyFilterBar({ filters, setFilters }) {
  const locations = ["All Locations", ...new Set(properties.map(p => p.location))].sort();
  const types = ["All Types", ...new Set(properties.map(p => p.type))].sort();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-12 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        
        {/* Location - Custom Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4 pr-12 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 shadow-sm"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Property Type - Custom Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4 pr-12 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 shadow-sm"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bedrooms - Custom Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
          <div className="relative">
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4 pr-12 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 shadow-sm"
            >
              {["Any", "1+", "2+", "3+", "4+", "5+"].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Price Range - Min & Max Inputs (Mobile Friendly) */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range (AED)</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Min Price */}
            <div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : "" }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 shadow-sm placeholder:text-gray-400"
              />
            </div>
            {/* Max Price */}
            <div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : "" }))}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-4 text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 shadow-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          {/* Live Display */}
          <div className="mt-3 text-center text-sm font-medium text-blue-600">
            {filters.minPrice || filters.maxPrice ? (
              <>
                {filters.minPrice ? `${(filters.minPrice / 1000000).toFixed(1)}M` : "0"} 
                {" - "} 
                {filters.maxPrice ? `${(filters.maxPrice / 1000000).toFixed(1)}M` : "Any"} AED
              </>
            ) : (
              "Any Price"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}