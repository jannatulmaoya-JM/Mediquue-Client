"use client";

import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";
import toast from "react-hot-toast";
import { FiX, FiCalendar } from "react-icons/fi";

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    fetch(`${apiUrl}/bookings?email=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleCancel = async () => {
    if (!cancelId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/bookings/${cancelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!res.ok) throw new Error("Cancel request failed");

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === cancelId ? { ...booking, status: "cancelled" } : booking
        )
      );
      
      toast.success("Booking cancelled successfully.");
      setCancelId(null);
    } catch (error) {
      console.error("Cancel Error:", error);
      toast.error("Cancel failed. Please try again.");
    }
  };

  const statusBadge = (status) => {
    const currentStatus = status || "confirmed";

    if (currentStatus === "cancelled") {

      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFEBEB] text-[#FF4D4D] dark:bg-red-950/40 dark:text-red-400 tracking-wide">
          cancelled
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F8F0] text-[#10B981] dark:bg-emerald-950/30 dark:text-emerald-400 tracking-wide border border-[#D1FAE5] dark:border-emerald-900/30">
        confirmed
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">

      <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1.5">My Booked Sessions</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Track and manage your learning sessions</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/10 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 max-w-xl mx-auto p-6">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 dark:text-gray-500 mx-auto mb-4">
            <FiCalendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">No sessions booked yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Browse tutors and book your first session to get started.
          </p>
          <a 
            href="/tutors" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-sm hover:opacity-95"
          >
            Find Tutors
          </a>
        </div>
      ) : (
 
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/20 transition-colors text-sm">
               
                  <td className="px-6 py-5 font-bold text-gray-800 dark:text-gray-100">
                    {booking.tutorName || "N/A"}
                  </td>
            
                  <td className="px-6 py-5 text-gray-600 dark:text-gray-300 font-medium">
                    {booking.studentName || "N/A"}
                  </td>
        
                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400 text-xs font-medium">
                    {booking.studentEmail}
                  </td>

                  <td className="px-6 py-5">
                    {statusBadge(booking.status)}
                  </td>
              
                  <td className="px-6 py-5">
                    {booking.status !== "cancelled" ? (
                      <button 
                        onClick={() => setCancelId(booking._id)} 
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEBEB] text-[#FF4D4D] rounded-lg text-xs font-bold hover:bg-red-100 transition border border-[#FFD6D6] cursor-pointer"
                      >
                        <FiX className="w-3.5 h-3.5" /> Cancel
                      </button>
                    ) : (
       
                      <span className="text-gray-300 dark:text-gray-600 font-bold">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

\
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Cancel This Session?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              The booking status will be updated to cancelled.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setCancelId(null)} 
                className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                Keep It
              </button>
              <button 
                onClick={handleCancel} 
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm shadow-md transition active:scale-[0.98] cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}