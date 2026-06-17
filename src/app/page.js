"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TutorCard from "../components/TutorCard";
import Spinner from "../components/Spinner";
import Banner from "../components/Banner";
import { ShieldCheck, Rocket, ListCheck, Sliders } from "@gravity-ui/icons";
import { Magnifier, Calendar, GraduationCap } from "@gravity-ui/icons";

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    fetch("http://localhost:5000/featured-tutors")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-20 pb-20 bg-gray-50/40 dark:bg-gray-900/20">
      
      <Banner />

      {/* Available Tutors Section */}
      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Tutors</h2>
        <p className="text-xs text-gray-400 mt-1 mb-10">Find your perfect match from our top educators</p>
        
        {loading ? (
          <Spinner />
        ) : tutors.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-medium">
            No tutors found from server.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutors.map((tutor) => (
                <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link 
                href="/tutors" 
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#00bda8] hover:bg-[#00a693] rounded-xl shadow-md transition-all cursor-pointer hover:-translate-y-0.5"
              >
                View All Tutors
              </Link>
            </div>
          </>
        )}
      </div>

      {/* How It Works Section */}
      <div className="max-w-5xl mx-auto px-4 text-center">
       <h2 className="text-xl font-bold text-gray-800 dark:text-white">How It Works</h2>
        <p className="text-xs text-gray-400 mt-1 mb-10">Three simple steps to start your next learning session</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
          <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm         flex flex-col items-center transition-all hover:border-[#00bda8]/30 hover:shadow-lg hover:-translate-y-1">
         
           <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-[#00bda8]         mb-5 border border-teal-100 dark:border-teal-800/50 transition-colors group-hover:bg-[#00bda8] group-hover:text-white">
             <Magnifier width={20} height={20} />
           </div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">Browse Tutors</h4>
             <p className="text-xs text-gray-400 dark:text-gray-400 leading-relaxed max-w-[200px] font-medium">Explore tutors by subject, schedule, and teaching mode.</p>
           </div>
       
           <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm         flex flex-col items-center transition-all hover:border-[#00bda8]/30 hover:shadow-lg hover:-translate-y-1">
           
             <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-[#00bda8]         mb-5 border border-teal-100 dark:border-teal-800/50 transition-colors group-hover:bg-[#00bda8] group-hover:text-white">
               <Calendar width={20} height={20} />
             </div>
             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">Book a Session</h4>
             <p className="text-xs text-gray-400 dark:text-gray-400 leading-relaxed max-w-[200px] font-medium">Pick a slot that works        for you and confirm your booking instantly.</p>
           </div>
       
           <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm         flex flex-col items-center transition-all hover:border-[#00bda8]/30 hover:shadow-lg hover:-translate-y-1">
         
             <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-[#00bda8]         mb-5 border border-teal-100 dark:border-teal-800/50 transition-colors group-hover:bg-[#00bda8] group-hover:text-white">
               <GraduationCap width={20} height={20} />
             </div>
             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1.5">Start Learning</h4>
             <p className="text-xs text-gray-400 dark:text-gray-400 leading-relaxed max-w-[200px] font-medium">Join your session and accelerate your learning journey.</p>
           </div>
         </div>
      </div>
  

      {/* Why Choose MediQueue Section */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Why Choose MediQueue?</h2>
        <p className="text-xs text-gray-400 mt-1 mb-10">We're built for learners, by educators</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#00bda8]/30 hover:shadow-md hover:-translate-y-1">
      <div className="text-[#00bda8] mb-3 p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 transition-colors duration-300 group-hover:bg-[#00bda8] group-hover:text-white">
        <ShieldCheck width={22} height={22} />
      </div>
      <h5 className="text-xs font-bold text-gray-800 dark:text-white tracking-wide">Verified Profiles</h5>
        </div>
        <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#00bda8]/30 hover:shadow-md hover:-translate-y-1">
  
  <div className="text-[#00bda8] mb-3 p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 transition-colors duration-300 group-hover:bg-[#00bda8] group-hover:text-white">
    <Rocket width={22} height={22} />
  </div>
  <h5 className="text-xs font-bold text-gray-800 dark:text-white tracking-wide">Instant Queuing</h5>
        </div>

       <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#00bda8]/30 hover:shadow-md hover:-translate-y-1">
      <div className="text-[#00bda8] mb-3 p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 transition-colors duration-300 group-hover:bg-[#00bda8] group-hover:text-white">
        <ListCheck width={22} height={22} />
      </div>
      <h5 className="text-xs font-bold text-gray-800 dark:text-white tracking-wide">Tracked Bookings</h5>
       </div>

        <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#00bda8]/30 hover:shadow-md hover:-translate-y-1">
      <div className="text-[#00bda8] mb-3 p-2 rounded-xl bg-teal-50 dark:bg-teal-900/20 transition-colors duration-300 group-hover:bg-[#00bda8] group-hover:text-white">
        <Sliders width={22} height={22} />
      </div>
      <h5 className="text-xs font-bold text-gray-800 dark:text-white tracking-wide">Flexible Modes</h5>
        </div>

        </div>
      </div>

    </div>
  );
}