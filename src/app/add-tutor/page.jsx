"use client";


import React from 'react';

export default function AddTutorPage() {
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Tutor Data Submitted:", data);
    alert("Tutor added successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Become a Tutor</h1>
      <p className="text-gray-500 mb-8">Share your expertise and help students achieve their goals.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" name="name" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800" placeholder="Enter your full name" />
        </div>

   
        <div>
          <label className="block text-sm font-medium mb-1">Expertise Subject</label>
          <input type="text" name="subject" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800" placeholder="e.g. Mathematics" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Experience (Years)</label>
          <input type="number" name="experience" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800" placeholder="e.g. 5" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
          <input type="number" name="rate" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800" placeholder="e.g. 20" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Highest Qualification</label>
          <input type="text" name="qualification" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800" placeholder="e.g. BSc in CSE" />
        </div>

   
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio / Description</label>
          <textarea name="bio" required className="w-full p-3 rounded-xl border border-gray-300 dark:bg-gray-800 h-32" placeholder="Write something about your teaching style..."></textarea>
        </div>

       
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl transition duration-300">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}