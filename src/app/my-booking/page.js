// "use client";
// import { useEffect, useState } from "react";
// import { authClient } from "@/lib/auth-client";
// import toast from "react-hot-toast";
// import Spinner from "@/components/Spinner";
// import EmptyState from "@/components/EmptyState";
// import { FiX } from "react-icons/fi";

// export default function MyBookingsPage() {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancelId, setCancelId] = useState(null);

//   useEffect(() => {
//     if (!user) return;
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${user.email}`)
//       .then((r) => r.json())
//       .then((d) => { setBookings(Array.isArray(d) ? d : []); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, [user]);

//   const handleCancel = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${cancelId}`, {
//         method: "PATCH", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "cancelled" }),
//       });
//       if (!res.ok) throw new Error();
//       setBookings((prev) => prev.map((b) => b._id === cancelId ? { ...b, status: "cancelled" } : b));
//       toast.success("Booking cancelled.");
//       setCancelId(null);
//     } catch { toast.error("Cancel failed."); }
//   };

//   if (loading) return <Spinner />;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-black text-gray-800 dark:text-white mb-1">My Booked Sessions</h1>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">All your session bookings</p>

//       {bookings.length === 0 ? (
//         <EmptyState icon="" title="No bookings yet" desc="You haven't booked any sessions yet. Browse tutors to get started." actionLabel="Find Tutors" actionHref="/tutors" />
//       ) : (
//         <div className="card-base overflow-x-auto">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-gray-50 dark:bg-gray-700/40 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//               <tr>
//                 {["Tutor Name", "Student", "Email", "Status", "Action"].map((h) => (
//                   <th key={h} className="px-5 py-3">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//               {bookings.map((b) => (
//                 <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
//                   <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-100">{b.tutorName}</td>
//                   <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{b.studentName}</td>
//                   <td className="px-5 py-3 text-gray-500 dark:text-gray-400 text-xs">{b.studentEmail}</td>
//                   <td className="px-5 py-3">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
//                       b.status === "cancelled" ? "bg-red-50 dark:bg-red-900/20 text-red-500"
//                       : b.status === "confirmed" ? "bg-green-50 dark:bg-green-900/20 text-emerald-500"
//                       : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600"
//                     }`}>
//                       {b.status || "pending"}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3">
//                     {b.status !== "cancelled" && (
//                       <button onClick={() => setCancelId(b._id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-100 transition">
//                         <FiX className="w-3.5 h-3.5" /> Cancel
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Cancel Confirm Modal */}
//       {cancelId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
//             <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Cancel Booking?</h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to cancel this session?</p>
//             <div className="flex gap-3 justify-center">
//               <button onClick={() => setCancelId(null)} className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Keep It</button>
//               <button onClick={handleCancel} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition">Yes, Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
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

    fetch(`${apiUrl}/bookings/${user.email}`)
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
  }, [user]);

  const handleCancel = async () => {
    if (!cancelId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${apiUrl}/bookings/${cancelId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Delete request failed");

      setBookings((prev) => prev.filter((b) => b._id !== cancelId));
      toast.success("Booking cancelled successfully.");
      setCancelId(null);
    } catch (error) {
      console.error("Cancel Error:", error);
      toast.error("Cancel failed. Please try again.");
    }
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-gray-800 dark:text-white mb-1">My Booked Sessions</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">All your session bookings</p>

      {bookings.length === 0 ? (
      
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/20 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 max-w-xl mx-auto p-6">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 dark:text-gray-500 mx-auto mb-4">
            <FiCalendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">No bookings yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            You haven't booked any sessions yet. Browse tutors to get started.
          </p>
          <a 
            href="/tutors" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition"
          >
            Find Tutors
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <tr>
                {["Tutor Name", "Student", "Email", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-5 py-4 font-semibold text-gray-800 dark:text-gray-100">{b.tutorName || "N/A"}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300">{b.studentName || "N/A"}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400 text-xs">{b.studentEmail}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-900/20 text-emerald-500">
                      {b.status || "confirmed"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button 
                      onClick={() => setCancelId(b._id)} 
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                    >
                      <FiX className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to cancel this session? This action will permanently remove your slot.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setCancelId(null)} className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Keep It</button>
              <button onClick={handleCancel} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-sm transition">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}