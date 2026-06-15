"use client";

import React from "react";

export default function AddTutorPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
  
    console.log("Tutor Data Submitted:", data);
    alert("Tutor added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-12 px-4 flex flex-col items-center">
 
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-800 dark:text-white mb-2">
          Add a Tutor
        </h1>
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
          Fill in the details to list a new tutor
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 border border-gray-100 dark:border-gray-800/60 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          
          {/* Tutor Name */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Tutor Name
            </label>
            <input
              type="text"
              name="tutorName"
              required
              placeholder="Name"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoUrl"
              required
              placeholder="https://..."
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Availability */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Availability
            </label>
            <input
              type="text"
              name="availability"
              required
              placeholder="Sun-Thu 5:00PM-8:00PM"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Hourly Fee */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Hourly Fee ($)
            </label>
            <input
              type="number"
              name="hourlyFee"
              required
              placeholder="2500/hr"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Total Slots */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text  dark:text-gray-500 mb-2 tracking-wider pl-1">
              Total Slots
            </label>
            <input
              type="number"
              name="totalSlots"
              required
              placeholder="50"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Institution */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Institution
            </label>
            <input
              type="text"
              name="institution"
              required
              placeholder="University"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Experience (years)
            </label>
            <input
              type="text"
              name="experience"
              required
              placeholder="5"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Area */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Area
            </label>
            <input
              type="text"
              name="area"
              required
              placeholder="Area"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              placeholder="City"
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
            />
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Subject
            </label>
            <select
              name="subject"
              required
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a0aec0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-[right_20px_center] bg-no-repeat"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="English">English</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Teaching Mode */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Teaching Mode
            </label>
            <select
              name="teachingMode"
              required
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a0aec0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_auto] bg-[right_20px_center] bg-no-repeat"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Session Start Date */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-[12px] font-bold text dark:text-gray-500 mb-2 tracking-wider pl-1">
              Session Start Date
            </label>
            <input
              type="date"
              name="sessionStartDate"
              required
              className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] transition-all cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00bda8] to-[#009c8b] hover:from-[#00a391] hover:to-[#008274] text-white font-black py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] text-sm  tracking-widest"
            >
             Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}