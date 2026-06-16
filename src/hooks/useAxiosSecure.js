"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
//   withCredentials: true,
});

export default function useAxiosSecure() {
  const router = useRouter();
  return axiosSecure;
}