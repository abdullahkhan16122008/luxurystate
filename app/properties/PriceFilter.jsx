"use client";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function PriceFilter({ filters, setFilters }) {
  const min = Number(filters.minPrice) || 0;
  const max = Number(filters.maxPrice) || 100000000;

  return (
    <div className="">

      <Slider
        value={[min, max]}
        min={0}
        max={100000000}
        step={10000}
        onValueChange={(value) => {
          const [newMin, newMax] = value;
          setFilters(prev => ({
            ...prev,
            minPrice: newMin,
            maxPrice: newMax,
          }));
        }}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, minPrice: e.target.value }));
          }}
        />
        <Input
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
          }}
        />
      </div>

      <p className="text-sm text-gray-600 text-center">
        {min.toLocaleString()} AED — {max.toLocaleString()} AED
      </p>
    </div>
  );
}
