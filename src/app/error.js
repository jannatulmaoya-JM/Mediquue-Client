"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md card-base p-10">
        <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Something went wrong!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {error?.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
          <a href="/" className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}