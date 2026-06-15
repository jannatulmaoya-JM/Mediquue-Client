"use client"; 
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
 
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
       
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          An unexpected error occurred while loading this section. Please try again or go back to home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
        
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl shadow-md hover:opacity-90 transition cursor-pointer text-sm"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}