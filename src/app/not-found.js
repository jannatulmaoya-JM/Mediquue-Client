import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        
  
        <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse">
          404
        </h1>
        
        <div className="bg-emerald-500 text-white px-3 py-1 text-xs uppercase rounded-md tracking-wider inline-block font-semibold my-4">
          Page Not Found
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Oops! You've drifted off track
        </h2>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

       
        <Link
          href="/"
          className="inline-block w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl shadow-lg hover:opacity-90 transition cursor-pointer text-sm"
        >
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}