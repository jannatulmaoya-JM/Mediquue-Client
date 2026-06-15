export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-transparent">

      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
 
      <h3 className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 tracking-wider uppercase animate-pulse">
        Loading sessions...
      </h3>
    </div>
  );
}