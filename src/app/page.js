"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TutorCard from "@/components/TutorCard";
import Spinner from "@/components/Spinner";
import Banner from "@/components/Banner";

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tutors?limit=6")
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

      {/*  Available Tutors Section */}
      <div className="max-w-6xl mx-auto px-4 text-center">
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

    

    </div>
  );
}