// "use client";

// import React from "react";

// export default function AddTutorPage() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);
    
//     console.log("Tutor Data Submitted:", data);
//     alert("Tutor added successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 py-12 px-4 flex flex-col items-center">
 
//       <div className="w-full max-w-xl text-center mb-8">
//         <h1 className="text-3xl font-black tracking-tight text-gray-800 dark:text-white mb-2">
//           Add a Tutor
//         </h1>
//         <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
//           Fill in the details to list a new tutor
//         </p>
//       </div>

//       <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[32px] p-8 md:p-10 border border-gray-100 dark:border-gray-800/60 shadow-sm">
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          
       
//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold  dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Tutor Name
//             </label>
//             <input
//               type="text"
//               name="tutorName"
//               required
//               placeholder="Name"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

         
//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold  dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Photo URL
//             </label>
//             <input
//               type="url"
//               name="photoUrl"
//               required
//               placeholder="https://..."
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Availability
//             </label>
//             <input
//               type="text"
//               name="availability"
//               required
//               placeholder="Sun-Thu 5:00PM-8:00PM"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Hourly Fee ($)
//             </label>
//             <input
//               type="number"
//               name="hourlyFee"
//               required
//               placeholder="2500/hr"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Total Slots
//             </label>
//             <input
//               type="number"
//               name="totalSlots"
//               required
//               placeholder="50"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Institution
//             </label>
//             <input
//               type="text"
//               name="institution"
//               required
//               placeholder="University"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold
//             dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Experience (years)
//             </label>
//             <input
//               type="text"
//               name="experience"
//               required
//               placeholder="5"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Area
//             </label>
//             <input
//               type="text"
//               name="area"
//               required
//               placeholder="Area"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               City
//             </label>
//             <input
//               type="text"
//               name="city"
//               required
//               placeholder="City"
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-[#00bda8] transition-all"
//             />
//           </div>

//           {/* <div className="flex flex-col">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Subject
//             </label>
//             <select
//               name="subject"
//               required
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] cursor-pointer"
//             >
//               <option value="Mathematics">Mathematics</option>
//               <option value="Physics">Physics</option>
//               <option value="English">English</option>
//               <option value="Chemistry">Chemistry</option>
//               <option value="Biology">Biology</option>
//               <option value="Computer Science">Computer Science</option>
//             </select>
//           </div>

//           <div className="flex flex-col sm:col-span-2">
//             <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Teaching Mode
//             </label>
//             <select
//               name="teachingMode"
//               required
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] cursor-pointer"
//             >
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//               <option value="Both">Both</option>
//             </select>
//           </div> */}
//           {/* Subject Dropdown */}
// <div className="flex flex-col">
//   <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//     Subject
//   </label>
//   <select
//     name="subject"
//     required
//     defaultValue=""
//     className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-400 dark:text-gray-500 valid:text-gray-800 dark:valid:text-gray-200 focus:outline-none focus:border-[#00bda8] cursor-pointer"
//   >
//     <option value="" disabled hidden>Subject</option>
//     <option value="Mathematics">Mathematics</option>
//     <option value="Physics">Physics</option>
//     <option value="English">English</option>
//     <option value="Chemistry">Chemistry</option>
//     <option value="Biology">Biology</option>
//     <option value="Computer Science">Computer Science</option>
//   </select>
// </div>

// {/* Teaching Mode */}
// <div className="flex flex-col sm:col-span-2">
//   <label className="text-[12px] font-bold dark:text-gray-500 mb-2 tracking-wider pl-1">
//     Teaching Mode
//   </label>
//   <select
//     name="teachingMode"
//     required
//     defaultValue=""
//     className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-400 dark:text-gray-500 valid:text-gray-800 dark:valid:text-gray-200 focus:outline-none focus:border-[#00bda8] cursor-pointer"
//   >
//     <option value="" disabled hidden>Online</option>
//     <option value="Online">Online</option>
//     <option value="Offline">Offline</option>
//     <option value="Both">Both</option>
//   </select>
// </div>

//           <div className="flex flex-col sm:col-span-2">
//             <label className="text-[12px] font-bold  dark:text-gray-500 mb-2 tracking-wider pl-1">
//               Session Start Date
//             </label>
//             <input
//               type="date"
//               name="sessionStartDate"
//               required
//               className="w-full px-5 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#00bda8] transition-all cursor-pointer"
//             />
//           </div>


//           <div className="sm:col-span-2 pt-6">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#00bda8] to-[#009c8b] hover:from-[#00a391] hover:to-[#008274] text-white font-black py-4 rounded-2xl transition-all shadow-md active:scale-[0.98] text-sm tracking-widest"
//             >
//               Submit
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { authClient } from "@/lib/auth-client"; 

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", 
  "History", "Geography", "Computer Science", "Economics", "Other"
];

export default function AddTutorPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const axiosSecure = useAxiosSecure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please log in first");
      return;
    }

    const form = e.target;
    const tutorData = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availability: form.availability.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
      sessionStartDate: form.sessionStartDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: { area: form.area.value, city: form.city.value },
      teachingMode: form.teachingMode.value,
      createdBy: user.email,
    };

    setLoading(true);
    try {
      await axiosSecure.post("/tutors", tutorData);
      toast.success("Tutor added successfully! 🎉");
      router.push("/my-tutors");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add tutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Add a Tutor</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details to list a new tutor</p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "Tutor Name", name: "name", type: "text", placeholder: "Name" },
            { label: "Photo URL", name: "photo", type: "url", placeholder: "https://..." },
            { label: "Availability", name: "availability", type: "text", placeholder: "Sun-Thu 5:00PM-8:00PM" },
            { label: "Hourly Fee ($)", name: "hourlyFee", type: "number", placeholder: "25" },
            { label: "Total Slots", name: "totalSlot", type: "number", placeholder: "10" },
            { label: "Institution", name: "institution", type: "text", placeholder: "Harvard University" },
            { label: "Experience (years)", name: "experience", type: "text", placeholder: "5" },
            { label: "Area", name: "area", type: "text", placeholder: "Dhanmondi" },
            { label: "City", name: "city", type: "text", placeholder: "Dhaka" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              <input 
                type={f.type} 
                name={f.name} 
                required 
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500" 
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <select name="subject" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500">
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teaching Mode</label>
            <select name="teachingMode" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500">
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Start Date</label>
            <input 
              type="date" 
              name="sessionStartDate" 
              required
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Adding Tutor..." : "Add Tutor"}
        </button>
      </form>
    </div>
  );
}