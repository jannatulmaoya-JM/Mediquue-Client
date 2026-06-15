// "use client";
// import React, { useEffect, useState } from 'react';

// export default function MyTutorsPage() {
//   const [tutorData, setTutorData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTutorProfile = async () => {
//       try {

//         const res = await fetch("/api/tutor/my-profile"); 
//         const data = await res.json();
//         setTutorData(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTutorProfile();
//   }, []);

//   if (loading) return <div className="text-center mt-20">Loading your profile...</div>;

//   return (
//     <div className="max-w-4xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
//       <h1 className="text-3xl font-bold mb-6">My Tutor Profile</h1>
      
//       {tutorData ? (
//         <div className="space-y-6">
//           <div className="flex items-center gap-6 p-6 border rounded-xl bg-gray-50 dark:bg-gray-800">
//             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600">
//               {tutorData.name[0]}
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold">{tutorData.name}</h2>
//               <p className="text-emerald-500 font-medium">{tutorData.subject}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-4 border rounded-xl">
//               <p className="text-sm text-gray-500">Experience</p>
//               <p className="font-bold">{tutorData.experience} Years</p>
//             </div>
//             <div className="p-4 border rounded-xl">
//               <p className="text-sm text-gray-500">Hourly Rate</p>
//               <p className="font-bold">${tutorData.rate}/hr</p>
//             </div>
//           </div>

//           <div className="p-4 border rounded-xl">
//             <p className="text-sm text-gray-500 mb-2">Bio</p>
//             <p className="text-gray-700 dark:text-gray-300">{tutorData.bio}</p>
//           </div>

//           <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
//             Edit Profile
//           </button>
//         </div>
//       ) : (
//         <div className="text-center py-10">
//           <p className="mb-4">You haven't created a tutor profile yet.</p>
//           <a href="/add-tutor" className="text-emerald-600 font-bold underline">
//             Create your profile now
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client"; 
import Spinner from "@/components/Spinner";

export default function MyTutorsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (!user?.name) return;

    const fetchTutorProfile = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
        const res = await fetch(`${apiUrl}/tutors?search=${encodeURIComponent(user.name)}`);
        
        if (!res.ok) throw new Error("Failed to fetch tutor data");
        
        const data = await res.json();
       
        if (Array.isArray(data) && data.length > 0) {
          setTutorData(data[0]);
        } else {
          setTutorData(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading your tutor profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
      <h1 className="text-3xl font-black mb-6 text-gray-800 dark:text-white">My Tutor Profile</h1>
      
      {tutorData ? (
        <div className="space-y-6">
       
       
          <div className="flex items-center gap-6 p-6 border rounded-xl bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-700">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {tutorData.name ? tutorData.name[0] : "?"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{tutorData.name}</h2>
              <p className="text-emerald-500 font-semibold text-sm">{tutorData.language || tutorData.subject || "Language Tutor"}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{tutorData.email || "No Email Provided"}</p>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Experience</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{tutorData.experience || "0"} Years</p>
            </div>
            <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Hourly Rate</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">${tutorData.price || tutorData.rate || "0"}/hr</p>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Total Slots</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{tutorData.totalSlot ?? "N/A"}</p>
            </div>
            <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">Review Count</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">⭐ {tutorData.review || "0"}</p>
            </div>
          </div>

          <div className="p-5 border rounded-xl bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">About Me / Bio</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {tutorData.description || tutorData.bio || "No description provided yet."}
            </p>
          </div>

          <div className="pt-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-sm text-sm">
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
  
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4 font-medium">You haven't created a tutor profile yet.</p>
          <a 
            href="/add-tutor" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition"
          >
            Create your profile now
          </a>
        </div>
      )}
    </div>
  );
}