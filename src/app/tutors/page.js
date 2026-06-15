"use client";

import { useEffect, useState } from "react";
import TutorCard from "@/components/TutorCard";
import Spinner from "@/components/Spinner";

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
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Browse Available Tutors</h1>
        <p className="text-gray-500 text-sm">Find your matching mentor using advanced search filters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Search by Name</label>
          <input
            type="text"
            placeholder="Type tutor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-emerald-500 text-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Session Start From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-emerald-500 text-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Session End To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-emerald-500 text-gray-800 dark:text-white"
          />
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