"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 

const slides = [
  {
    title: "Find & Book the Right Tutor, Instantly",
    subtitle: "Book 1-on-1 sessions with certified educators across all subjects",
    imgType: "background",
    imgSrc: "/assets/images/banner1.jpg", 
  },
  {
    title: "Flexible Scheduling Tracks",
    subtitle: "Choose your own time slots that fit perfectly with your busy routine",
    imgType: "grid",
    imgSrc: "/assets/images/banner2.jpg",
  },
  {
    title: "Track Your Progress Seamlessly",
    subtitle: "Manage all your booked sessions and learning journey in one secure platform",
    imgType: "grid",
    imgSrc: "/assets/images/banner3.jpg",
  },
];

export default function Banner() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const BrowseButton = () => (
    <Link
      href="/tutors"
      className="inline-block px-7 py-3 bg-[#00bda8] hover:bg-[#00a693] text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm cursor-pointer"
    >
      Browse Tutors →
    </Link>
  );

  return (
    <section className="bg-white dark:bg-gray-900 px-4 pt-6">
      <div className="max-w-6xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-sm relative h-[420px] md:h-[450px] flex items-stretch">
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-stretch w-full ${
              index === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
          >
   
            {slide.imgType === "background" && (
              <div 
                className="w-full h-full bg-cover bg-center flex items-center justify-center relative px-6 text-center"
                style={{ backgroundImage: `url(${slide.imgSrc})` }} 
              >
               
                <div className="absolute inset-0 bg-black/50 z-0"></div>
        
                <div className="relative z-10 max-w-2xl text-white">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base text-gray-200/90 mb-8 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                  <BrowseButton />
                </div>
              </div>
            )}

            {slide.imgType === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full p-8 md:p-16 items-center w-full bg-teal-50/30 dark:bg-gray-800/50">
 
                <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 max-w-md font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <BrowseButton />
                </div>

                <div className="flex items-center justify-center h-full max-h-[300px] md:max-h-full">
                  <img
                    src={slide.imgSrc}
                    alt={slide.title}
                    className="object-contain max-h-full rounded-2xl shadow-sm transition-transform duration-500 hover:scale-102"
                  />
                </div>

              </div>
            )}

          </div>
        ))}

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlideIndex ? "bg-[#00bda8] w-6" : "bg-gray-300 dark:bg-gray-600 w-2"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}