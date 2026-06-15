export default function Spinner() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 bg-transparent">
    
      <div className="flex space-x-2 justify-center items-center">
        <div className="h-4 w-4 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-teal-500 rounded-full animate-bounce"></div>
      </div>
      
  
      <p className="mt-4 text-xs font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase animate-pulse">
        Fetching Data...
      </p>
    </div>
  );
}