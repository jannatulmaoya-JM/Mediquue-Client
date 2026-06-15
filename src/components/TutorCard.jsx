import Link from "next/link";

export default function TutorCard({ tutor }) {

  const slotsLeft = Number(tutor.totalSlot || tutor.availableSlots || 0);
  const isNoSlot = slotsLeft === 0;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700/60 overflow-hidden text-left">
      
    
      <div className="relative h-56 w-full bg-gray-50 dark:bg-gray-900">
        <img 
          src={tutor.photo || tutor.image} 
          alt={tutor.name} 
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="flex flex-col flex-grow p-5 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white leading-snug">
            {tutor.name}
          </h3>
          <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
            {tutor.subject}
          </p>
        </div>

        <div className="space-y-1.5 text-[13px] text-gray-600 dark:text-gray-300">
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Location:</span>{" "}
            {tutor.location?.area ? `${tutor.location.area}, ${tutor.location.city}` : tutor.location || "N/A"}
          </p>
          <p className="line-clamp-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Availability:</span>{" "}
            {tutor.availability || "Not Specified"}
          </p>
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Mode:</span>{" "}
            {tutor.mode || "Online/Offline"}
          </p>
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Available Slots:</span>{" "}
            <span className={`font-bold ${isNoSlot ? "text-red-500" : "text-emerald-500"}`}>
              {isNoSlot ? "No slots available" : `${slotsLeft} left`}
            </span>
          </p>
          <p className="text-sm font-bold text-gray-800 dark:text-white pt-1">
            ৳ {tutor.hourlyFee || tutor.price}/hr
          </p>
        </div>

    
        <div className="pt-2 mt-auto">
          <Link
            href={`/tutors/${tutor._id || tutor.id}`}
            className="block w-full text-center py-2.5 text-white font-semibold bg-[#00bda8] hover:bg-[#00a693] rounded-xl shadow-sm transition duration-200 text-sm cursor-pointer"
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
}