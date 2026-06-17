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

  const fetchBookings = async () => {
    if (!user?.email) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${apiUrl}/bookings?email=${user.email}`);
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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
      toast.error("Cancel failed. Please try again.");
      setCancelId(null);
    }
  };

  const statusBadge = (status) => {
    return status === "cancelled" ? (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFEBEB] text-[#FF4D4D]">cancelled</span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F8F0] text-[#10B981] border border-[#D1FAE5]">confirmed</span>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-gray-800 mb-1.5">My Booked Sessions</h1>
      <p className="text-sm text-gray-500 mb-8">Track and manage your learning sessions</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border-dashed border-2 border-gray-200 rounded-3xl">
           <h3 className="font-bold text-xl mb-4">No sessions booked yet</h3>
           <a href="/tutors" className="bg-emerald-500 text-white px-6 py-3 rounded-xl">Find Tutors</a>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-sm border rounded-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-5 font-bold">{booking.tutorName}</td>
                  <td className="px-6 py-5">{booking.studentName}</td>
                  <td className="px-6 py-5 text-xs text-gray-500">{booking.studentEmail}</td>
                  <td className="px-6 py-5">{statusBadge(booking.status)}</td>
                  <td className="px-6 py-5">
                    {booking.status !== "cancelled" && (
                      <button 
                        onClick={() => setCancelId(booking._id)} 
                        className="flex items-center gap-1 text-red-500 bg-red-50 px-3 py-1 rounded-lg text-xs font-bold"
                      >
                        <FiX /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <h3 className="font-bold text-xl mb-4">Cancel This Session?</h3>
            <div className="flex gap-4">
              <button onClick={() => setCancelId(null)} className="flex-1 py-3 border rounded-xl font-semibold">Keep It</button>
              <button onClick={handleCancel} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}