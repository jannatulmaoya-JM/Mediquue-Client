"use client";

import { useEffect, useState } from "react";
import TutorCard from "../../components/TutorCard";
import Spinner from "../../components/Spinner";
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
    
            <div className="flex flex-col items-center justify-center text-center space-y-1.5 pt-4 pb-6">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-800 dark:text-white             leading-tight">
                ALL <span className="text-[#00bda8]">Tutors</span>
              </h1>
              <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm font-medium max-w-md">
                Browse all available tutors
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto mb-10 px-2">
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
                
                <div className="relative flex-1 w-full">

                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-400 dark:text-gray-400">
                      <Magnifier width={18} height={18} />
                  </div>

                  <input
                    type="text"
                    placeholder="Search by tutor name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                   className="w-full pl-12 pr-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#00bda8] shadow-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all"
                  />
                </div>
            
                <div className="flex gap-3 w-full sm:w-auto justify-end items-center">
             
                  <div className="relative w-full sm:w-40">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 shadow-sm focus:outline-none focus:border-[#00bda8] cursor-pointer transition-all"
                    />
                  </div>
            
                 
                  <div className="relative w-full sm:w-40">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 shadow-sm focus:outline-none focus:border-[#00bda8] cursor-pointer transition-all"
                    />
                  </div>
                  
                  <button
                    onClick={() => {
                      setSearch("");
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="px-5 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm rounded-2xl transition shadow-sm border border-transparent dark:border-gray-700"
                  >
                    Clear
                  </button>
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