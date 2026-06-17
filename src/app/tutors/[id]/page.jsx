
"use client";

import { useEffect, useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import { authClient } from "../../../lib/auth-client";


export default function TutorDetailsPage({ params: paramsPromise }) {

  const params = use(paramsPromise);
  const { id } = params;
  
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleBookSession = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      const bookingData = {
        tutorId: tutor._id,
        tutorName: tutor.name,
        studentName: user?.name,
        studentEmail: user?.email,
        phone: phoneNumber,
        status: "confirmed",
      };
      await axiosSecure.post("/bookings", bookingData);
      toast.success("Session booked successfully!");
      setIsModalOpen(false);
      router.push("/my-booking");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed!");
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axiosSecure
      .get(`/tutors/${id}`)
      .then((res) => setTutor(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load details");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  if (loading) return <Spinner />;
  if (!tutor) return <div className="text-center py-20">Tutor not found!</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          <img src={tutor.photo} alt={tutor.name} className="w-full h-80 rounded-2xl object-cover shadow-lg" />
        </div>
       

   
<div className="w-full md:w-2/3 flex flex-col justify-between">
  <div>
    <h2 className="text-4xl font-bold mb-4">{tutor.name}</h2>
    
    <div className="space-y-2 text-gray-700">
      <p><strong>Subject:</strong> {tutor.subject}</p>
      <p><strong>Institution:</strong> {tutor.institution}</p>
      <p><strong>Experience:</strong> {tutor.experience}</p>
      <p><strong>Location:</strong> {tutor.location?.area}, {tutor.location?.city}</p>
      <p><strong>Mode:</strong> {tutor.teachingMode}</p>
      <p><strong>Available:</strong> {tutor.availability}</p>
      <p><strong>Hourly Fee:</strong> ${tutor.hourlyFee}/hr</p>
      
      <p>
        <strong>Available Slots: </strong> 
        <span className={tutor.totalSlot > 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>
          {tutor.totalSlot > 0 ? `${tutor.totalSlot} left` : "No available slots left"}
        </span>
      </p>
      
      <p><strong>Session Start Date:</strong> {new Date(tutor.sessionStartDate).toLocaleDateString()}</p>
    </div>
  </div>

  <button
    onClick={() => setIsModalOpen(true)}
    disabled={tutor.totalSlot <= 0}
    className={`mt-6  py-4 font-bold rounded-xl transition ${
      tutor.totalSlot > 0 
        ? "bg-emerald-500 text-white hover:bg-emerald-600" 
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    {tutor.totalSlot > 0 ? "Confirm Booking" : "Fully Booked"}
  </button>
</div>  
        
      </div>

  

         {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl">
      <h3 className="text-xl font-bold mb-4">Book Session</h3>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
          <input type="text" value={user?.name || "Jannatul Maoya"} disabled className="w-full p-2 border rounded-lg bg-gray-50 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <input type="email" value={user?.email || "jannatulmaoyacmt@gmail.com"} disabled className="w-full p-2 border rounded-lg bg-gray-50 mt-1" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
          <input 
            type="text" 
            placeholder="017XX-XXXXXX" 
            className="w-full p-2 border rounded-lg mt-1 focus:ring-2 focus:ring-emerald-600 outline-none" 
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Tutor Name</label>
          <input type="text" value={tutor?.name || ""} disabled className="w-full p-2 border rounded-lg bg-gray-50 mt-1" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button onClick={() => setIsModalOpen(false)} className="w-full py-2 border rounded-lg font-semibold hover:bg-gray-100">Cancel</button>
          <button 
            onClick={handleBookSession} 
            className="w-full py-2 bg-[#00966D] text-white rounded-lg font-semibold hover:bg-[#007a58] transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  </div>
)}

         
    </div>
  );
}