"use client";

import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Spinner from "@/components/Spinner";
import { Magnifier } from "@gravity-ui/icons";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);

    const query = new URLSearchParams({
      search,
      startDate,
      endDate
    }).toString();

    fetch(`http://localhost:5000/tutors?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setLoading(false);
      });
  }, [search, startDate, endDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
       
           <div className="flex flex-col items-center justify-center text-center space-y-2 pt-2 pb-8">
             <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-800 dark:text-white max-w-xl leading-tight">
               ALL <span className="text-[#00bda8]">Tutors</span>
             </h1>
           
             <p className="text-gray-400 dark:text-gray-400 text-xs md:text-sm font-medium max-w-md leading-relaxed">
               Find your matching mentor using advanced search filters and accelerate your learning journey.
             </p>
            </div>

 

            <div className="flex flex-col lg:flex-row gap-5 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100       dark:border-gray-700/60 shadow-sm">
  
           <div className="flex-1 flex flex-col">
    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1.5  tracking-wider pl-1">
      Search by Name
    </label>
    <div className="relative">
 
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Magnifier width={16} height={16} />
      </span>
      <input
        type="text"
        placeholder="Type tutor name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/60 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00bda8] focus:bg-white dark:focus:bg-gray-900 text-gray-700 dark:text-gray-200 transition-all placeholder-gray-400"
      />
    </div>
           </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-1/2">

    <div className="flex flex-col">
      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1.5 tracking-wider pl-1">
        Session Start From
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50/60 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00bda8] focus:bg-white dark:focus:bg-gray-900 text-gray-500 dark:text-gray-300 transition-all cursor-pointer"
      />
    </div>

  
    <div className="flex flex-col">
      <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1.5 tracking-wider pl-1">
        Session End To
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full px-4 py-2.5 bg-gray-50/60 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00bda8] focus:bg-white dark:focus:bg-gray-900 text-gray-500 dark:text-gray-300 transition-all cursor-pointer"
      />
          </div>
           </div>

            </div>
      
            {loading ? (
              <Spinner />
            ) : tutors.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No tutors found from server.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                ))}
              </div>
            )}
          </div>
        );
      }