
"use client";

import Link from "next/link";

export default function TutorCard({ tutor }) {
  const {
    _id,
    id,
    name,
    photo,
    subject,
    availability,
    sessionStartDate,
    hourlyFee,
    institution,
    totalSlot,
    location,
    teachingMode,
  } = tutor;

  const tutorId = _id || id;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }
    return dateString;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">

      <div className="p-5 pb-0">
        <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={photo || "https://images.unsplash.com/photo-1577896851231-70ef18881754"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
            {name}
          </h3>
          <p className="text-sm font-medium text-blue-400 dark:text-gray-500 mt-0.5">
            {subject}
          </p>
        </div>

        <div className="space-y-2 flex-grow">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <span><strong>Available:</strong> {availability}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <span><strong>Session Start Date:</strong> {formatDate(sessionStartDate)}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200">
            <strong>Institution:</strong> {institution}
          </p>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200">
            <strong>Location:</strong> {location?.area}, {location?.city}
          </p>
        
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-200">
            <strong>Remaining Slots:</strong>{" "}
            {totalSlot === 0 ? (
              <span className="text-red-500 font-bold">No available slots left</span>
            ) : (
              <span>{totalSlot}</span>
            )}
          </p>

          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-200">
            <strong>Mode:</strong> <span className="text-blue-600 font-semibold">{teachingMode}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <span><strong>hourlyFee:</strong> ৳{hourlyFee}/hr</span>
          </p>
        </div>

        <div className="pt-2">
          <Link href={`/tutors/${tutorId}`} className="block w-full">
            <button className="px-3 py-2 w-full text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-medium">
              Book Session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}