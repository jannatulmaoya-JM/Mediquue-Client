

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link"; 
import { usePathname, useRouter } from "next/navigation"; 
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { Sun, Moon, Bars, Xmark } from '@gravity-ui/icons';

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user; 

  const pathname = usePathname();
  const router = useRouter();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            setDropdownOpen(false);
            router.push("/");
          }
        }
      });
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return isActive
      ? "text-emerald-600 dark:text-emerald-400 font-bold border-b-2 border-emerald-500 pb-1 text-sm transition-all"
      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium";
  };

 
  const ThemeToggleButton = () => (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 h-10 w-10 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700 transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0"
      title="Toggle theme"
    >
      {darkMode ? (
        <Sun width="18" height="18" fill="currentColor" className="text-yellow-500" />
      ) : (
        <Moon width="18" height="18" fill="currentColor" className="text-gray-600" />
      )}
    </button>
  );

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">

          <Link href="/" className="text-xl font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            MediQueue
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={getLinkClass("/")}>Home</Link>
            <Link href="/tutors" className={getLinkClass("/tutors")}>Tutors</Link>
            {user && <Link href="/add-tutor" className={getLinkClass("/add-tutor")}>Add Tutor</Link>}
            {user && <Link href="/my-tutors" className={getLinkClass("/my-tutors")}>My Tutors</Link>}
            {user && <Link href="/my-booking" className={getLinkClass("/my-booking")}>My Booked Sessions</Link>}
          </div>

          <div className="flex items-center gap-3">
          
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Link href="/register" className="px-3 py-2 border border-emerald-300 text-emerald-600 dark:text-emerald-400 dark:border-emerald-800 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-800 text-sm font-medium">
                    Sign Up
                  </Link>
                  <Link href="/login" className="px-3 py-2 text-white rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-sm font-medium">
                    Login
                  </Link>
                </>
              ) : (
                <div className="relative" ref={dropRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center focus:outline-none">
                    <img
                      src={user.image || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                      alt="avatar"
                      className="w-9 h-9 rounded-full border-2 border-emerald-400 object-cover"
                    />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                      <p className="px-4 py-1 text-xs text-gray-400 truncate">{user.email}</p>
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

      
            <div className="hidden md:block">
              <ThemeToggleButton />
            </div>
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggleButton />
              
              <button
                className="p-2 text-gray-600 dark:text-gray-300 flex items-center justify-center focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <Xmark width="20" height="20" fill="currentColor" />
                ) : (
                  <Bars width="20" height="20" fill="currentColor" />
                )}
              </button>
            </div>

          </div>
        </div>

       
        {mobileOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
            <Link href="/" className={getLinkClass("/")} onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/tutors" className={getLinkClass("/tutors")} onClick={() => setMobileOpen(false)}>Tutors</Link>
            {user && <Link href="/add-tutor" className={getLinkClass("/add-tutor")} onClick={() => setMobileOpen(false)}>Add Tutor</Link>}
            {user && <Link href="/my-tutors" className={getLinkClass("/my-tutors")} onClick={() => setMobileOpen(false)}>My Tutors</Link>}
            {user && <Link href="/my-booked" className={getLinkClass("/my-booked")} onClick={() => setMobileOpen(false)}>My Booked Sessions</Link>}
            {!user && (
              <>
                <Link href="/login" className="text-gray-600 dark:text-gray-300 text-sm font-medium pt-1" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link href="/register" className="text-gray-600 dark:text-gray-300 text-sm font-medium pt-1" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;