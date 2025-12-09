"use client"
import HeroSearch from "@/components/HeroSearch";
import FeaturedProperties from "@/components/FeaturedProperties";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  let [properties, setProperties] = useState([]);
  let [hot, setHot] = useState([]);
  
  
    let api = process.env.NEXT_PUBLIC_API_URL;
    
    let fetchFeatured = async () => {
      try {
        let featured = await axios.post(`${api}/api/get/featured/properties`);
        if (featured.data.success) {
          setProperties(featured.data.featuredProperties)
        }
      } catch (err) {
        console.log({err: err})
      }
    }
    
    let fetchHot = async () => {
      try {
        let hot = await axios.post(`${api}/api/get/hot/properties`);
        if (hot.data.success) {
          setHot(hot.data.hotProperties)
        }
      } catch (err) {
        console.log({err: err})
      }
    }
    
  
  useEffect(()=> {
    fetchFeatured();
    fetchHot();
    AOS.init()
  }, [])
  return (
    <>
      <section className="relative h-screen max-sm:h-[110vh] flex flex-col items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2000&q=80')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-7xl font-bold md:mb-6 mb-3" data-aos='zoom-in'>Find Your Dream Property</h1>
          <p className="text-sm md:text-2xl mb-12 max-w-3xl mx-auto" data-aos='fade-up' data-aos-dela='200'>Discover exclusive luxury homes in Dubai's most prestigious locations</p>
          <HeroSearch />
        </div>
      </section>

      <FeaturedProperties properties={properties} title={'Featured Properties'} subTitle={`Handpicked luxury homes in Dubai's most exclusive locations`} />
      <FeaturedProperties properties={hot} title={'Hot Properties'} subTitle={`Handpicked luxury homes in Dubai's most exclusive locations`} />
      <WhyChooseUs />
      {/* <Testimonials /> */}
    </>
  );
}