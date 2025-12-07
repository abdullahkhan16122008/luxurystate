import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedProperties() {
  const featured = properties.slice(0, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Properties</h2>
          <p className="text-xl text-muted-foreground">Handpicked luxury homes in Dubai's most exclusive locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}