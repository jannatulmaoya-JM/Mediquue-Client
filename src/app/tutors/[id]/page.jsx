"use client";
import React, { useEffect, useState, use } from 'react'; // 'use' হুকটি ইম্পোর্ট করুন

export default function TutorDetailsPage({ params: paramsPromise }) {
  // paramsPromise-কে আনর্যাপ করে আসল params অবজেক্টটি নেওয়া হচ্ছে
  const params = use(paramsPromise); 
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`http://localhost:5000/tutors/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tutor not found");
        return res.json();
      })
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params?.id]); // optional chaining (?.) ব্যবহার করা নিরাপদ

  if (loading) return <div className="p-6 text-center">Loading tutor details...</div>;
  if (!tutor) return <div className="p-6 text-center text-red-500">Tutor not found!</div>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h1 className="text-3xl font-bold">{tutor.name}</h1>
      <p className="text-emerald-500 font-medium">{tutor.subject}</p>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{tutor.bio || tutor.description}</p>
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <p className="font-semibold">Experience: {tutor.experience} Years</p>
        <p className="font-semibold text-emerald-600 mt-1">Rate: ${tutor.rate}/hr</p>
      </div>
    </div>
  );
}