"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TutorCard from "@/components/TutorCard";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Find the Best Tutors in Town", desc: "Expert guidance tailored for your academic success.", bg: "from-emerald-600 to-cyan-700" },
    { title: "Master Any Subject Easily", desc: "Book 1-on-1 online or offline learning sessions instantly.", bg: "from-cyan-600 to-teal-700" },
    { title: "Eliminate Scheduling Conflicts", desc: "Get automatic digital tokens and tracked slots.", bg: "from-teal-600 to-emerald-700" }
  ];

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    fetch("/api/tutors?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20 pb-16">
  
      <div className="relative h-[450px] overflow-hidden rounded-3xl mx-4 mt-6 shadow-2xl">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r ${slide.bg} text-white transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">{slide.title}</h1>
            <p className="text-lg opacity-90 max-w-xl mb-8">{slide.desc}</p>
            <Link href="/tutors" className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-xl shadow-md hover:bg-emerald-50 transition cursor-pointer">
              Explore All Tutors
            </Link>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800 dark:text-white">Featured Tutors</h2>
        <p className="text-center text-gray-500 mb-10">Choose from our top-rated educators</p>
        
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>

     
      <div className="bg-slate-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mx-auto rounded-xl flex items-center justify-center font-bold text-xl">✓</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Verified Educators</h3>
            <p className="text-gray-500 text-sm">Every tutor's credentials and institution are fully verified.</p>
          </div>
          <div className="p-6 space-y-3">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 mx-auto rounded-xl flex items-center justify-center font-bold text-xl">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Safe Digital Tokens</h3>
            <p className="text-gray-500 text-sm">Automatic token generator prevents slot and timing duplication.</p>
          </div>
          <div className="p-6 space-y-3">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-600 mx-auto rounded-xl flex items-center justify-center font-bold text-xl">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Instant Booking</h3>
            <p className="text-gray-500 text-sm">No manual emails. Book your desired timing with a single click.</p>
          </div>
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-10 text-white grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl">
          <div><h4 className="text-4xl font-extrabold">150+</h4><p className="text-sm opacity-80">Expert Tutors</p></div>
          <div><h4 className="text-4xl font-extrabold">12,000+</h4><p className="text-sm opacity-80">Booked Sessions</p></div>
          <div><h4 className="text-4xl font-extrabold">4.9/5</h4><p className="text-sm opacity-80">Student Ratings</p></div>
          <div><h4 className="text-4xl font-extrabold">100%</h4><p className="text-sm opacity-80">Satisfaction Rate</p></div>
        </div>
      </div>
    </div>
  );
}