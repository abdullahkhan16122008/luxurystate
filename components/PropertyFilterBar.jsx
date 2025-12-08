"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { properties } from "@/data/properties";

export default function PropertyFilterBar({ filters, setFilters }) {
  const locations = ["All Locations", ...new Set(properties.map(p => p.location))].sort();
  const types = ["All Types", ...new Set(properties.map(p => p.type))].sort();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 sticky top-24 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1">
          <Label>Location</Label>
          <Select value={filters.location} onValueChange={(v) => setFilters(prev => ({...prev, location: v}))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1">
          <Label>Property Type</Label>
          <Select value={filters.type} onValueChange={(v) => setFilters(prev => ({...prev, type: v}))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-1">
          <Label>Bedrooms</Label>
          <Select value={filters.bedrooms} onValueChange={(v) => setFilters(prev => ({...prev, bedrooms: v}))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Any", "1+", "2+", "3+", "4+", "5+"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-2">
          <Label>Price Range (AED)</Label>
          <Slider
            value={[filters.maxPrice / 1000000]}
            onValueChange={([v]) => setFilters(prev => ({...prev, maxPrice: v * 1000000}))}
            max={100}
            step={1}
            className="mt-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>0 AED</span>
            <span>{(filters.maxPrice).toLocaleString()} AED</span>
          </div>
        </div>
      </div>
    </div>
  );
}