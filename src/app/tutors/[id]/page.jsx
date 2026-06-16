"use client";

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { Star, } from '@gravity-ui/icons';
import toast from 'react-hot-toast';

export default function TutorDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise); 
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [bookingLoading, setBookingLoading] = useState(false);

  const loggedInUser = {
    name: "Jannatul Maoya",
    email: "jannatulmaoyacmt@gmail.com"
  };

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
  }, [params?.id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    const form = e.target;
    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      studentName: loggedInUser.name,
      studentEmail: loggedInUser.email,
      phone: form.phone.value,
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking confirmed successfully!");
        setIsModalOpen(false);
        setTutor(prev => ({ ...prev, totalSlot: prev.totalSlot - 1 })); 
      } else {
        toast.error(data.message || "Booking failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center min-h-screen flex items-center justify-center">Loading tutor details...</div>;
  if (!tutor) return <div className="p-6 text-center text-red-500 font-bold min-h-screen flex items-center justify-center">Tutor not found!</div>;

  const photo = tutor.photo || tutor.image || "https://placehold.co/600x450?text=No+Image";
  const fee = tutor.hourlyFee || tutor.rate || tutor.price;
  const remainingSlots = (tutor.totalSlot || 0) - (tutor.bookedSlot || 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 dark:bg-gray-900 min-h-screen flex items-center justify-center">
     
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden w-full">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 items-center md:items-stretch">
          
          <div className="w-full md:w-[40%] relative aspect-[4/3] md:aspect-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 min-h-[320px]">
            <Image
              src={photo}
              alt={tutor.name}
              fill
              priority
              sizes="(max-w-768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="w-full md:w-[60%] flex flex-col justify-between py-1">
            <div>
              <div className="flex justify-between items-start gap-4 mb-1">
                <h1 className="font-bold text-3xl text-gray-900 dark:text-white leading-tight">
                  {tutor.name}
                </h1>
                {tutor.rating && (
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-base shrink-0 mt-1">
                    <Star width="18" height="18" fill="currentColor" />
                    <span>{tutor.rating}</span>
                  </div>
                )}
              </div>
              
              <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-5">
                {tutor.subject}
              </p>

              <div className="space-y-2.5 text-base text-gray-600 dark:text-gray-300">
                {tutor.institution && (
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">Varsity:</span> {tutor.institution}</p>
                )}
                {tutor.experience && (
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">Experience:</span> {tutor.experience}</p>
                )}
                {tutor.location && (
                  <p>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Location:</span>{" "}
                    {typeof tutor.location === 'object'
                      ? `${tutor.location.city || ''}, ${tutor.location.area || ''}`
                      : tutor.location}
                  </p>
                )}
                {tutor.availability && (
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">Availability:</span> {tutor.availability}</p>
                )}
                {tutor.teachingMode && (
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">Mode:</span> {tutor.teachingMode}</p>
                )}
                {fee && (
                  <p><span className="font-semibold text-gray-800 dark:text-gray-200">Hourly fees:</span>  {fee}/hr</p>
                )}
                <p className="pt-1">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Available Slots:</span>{" "}
                  <span className={`font-bold ${remainingSlots > 0 ? "text-emerald-600" : "text-red-500"}`}>
                    {remainingSlots > 0 ? `${remainingSlots} left` : "No slots available"}
                  </span>
                </p>
            
                {(tutor.bio || tutor.description) && (
                  <p className="pt-3 border-t border-gray-100 dark:border-gray-700 leading-relaxed text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Bio:</span> {tutor.bio || tutor.description}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(true)}
                disabled={remainingSlots <= 0}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-md hover:opacity-95 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {remainingSlots > 0 ? "Book Session" : "No Slots Available"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md relative transition-all">
            
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Book a Session</h3>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
          
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Student Name</label>
                <input 
                  type="text" 
                  value={loggedInUser.name} 
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Email</label>
                <input 
                  type="email" 
                  value={loggedInUser.email} 
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-cyan-500 focus:outline-none transition" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Tutor</label>
                <input 
                  type="text" 
                  value={tutor.name} 
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-medium cursor-not-allowed" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition transform active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                >
                  {bookingLoading ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}