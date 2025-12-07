"use client"
import HeroSearch from "@/components/HeroSearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white mt-32 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Find Your Dream Property</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">Discover exclusive luxury homes in Dubai's most prestigious locations</p>
          <HeroSearch />
        </div>
      </section>

      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}