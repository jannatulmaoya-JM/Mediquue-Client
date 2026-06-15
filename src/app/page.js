"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TutorCard from "@/components/TutorCard";
import Spinner from "@/components/Spinner";
import Banner from "@/components/Banner";

export default function HomePage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tutors?limit=6")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutors:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-20 pb-20 bg-gray-50/40 dark:bg-gray-900/20">

      
      <Banner />

     

    </div>
  );
}