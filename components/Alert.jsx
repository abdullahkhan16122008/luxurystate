"use client"
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from 'next/navigation';

function SampleNextArrow(props) {
  const { style, onClick, currentSlide, slideCount } = props;
  const isDisabled = currentSlide === slideCount - 1;
  
  return (
    <div
      className={`absolute right-10 -translate-y-[30px] group max-md:hidden`}
      style={{ ...style }}
      onClick={onClick}
    >
      <button
        disabled={isDisabled}
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-xl 
          border border-gray-200 transition-all duration-300 hover:scale-110 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          group-hover:shadow-2xl group-hover:bg-white max-md:hidden`}
        aria-label="Next slide"
      >
        <div className="relative">
          <ChevronRight className="h-6 w-6 text-gray-800" />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-blue-500/10 blur-sm scale-125 group-hover:bg-blue-500/20 transition-colors" />
        </div>
      </button>
      
      {/* Tooltip on hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap">
          Next
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick, currentSlide } = props;
  const isDisabled = currentSlide === 0;
  
  return (
    <div
      className={`absolute left-10 -translate-y-[6px] group max-md:hidden`}
      style={{ ...style }}
      onClick={onClick}
    >
      <button
        disabled={isDisabled}
        className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-xl 
          border border-gray-200 transition-all duration-300 hover:scale-110 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          group-hover:shadow-2xl group-hover:bg-white max-md:hidden`}
        aria-label="Previous slide"
      >
        <div className="relative">
          <ChevronLeft className="h-6 w-6 text-gray-800" />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-blue-500/10 blur-sm scale-125 group-hover:bg-blue-500/20 transition-colors" />
        </div>
      </button>
      
      {/* Tooltip on hover */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap">
          Previous
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    </div>
  );
}

const Alert = () => {
    let pathname = usePathname();


    let settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        delay: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };


    let alerts = [
        {
            _id: 1,
            text: 'Best Price Properties at Best Location'
        },
        {
            _id: 2,
            text: '24/7 Customer Support'
        }
    ];

    return (
        <>
            <section className={`bg-gray-900 ${pathname.startsWith("/admin") ? "hidden" : ""} text-white py-4 absolute z-60 right-0 left-0 text-center`}>
                <Slider {...settings}>
                    {alerts.map((alert) => (
                        <div key={alert._id} className='font-medium'>{alert.text}</div>
                    ))}
                </Slider>
            </section>
        </>
    )
}

export default Alert;