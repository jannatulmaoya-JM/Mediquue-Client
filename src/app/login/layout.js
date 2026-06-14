// src/app/login/layout.js

export const metadata = {
  title: "Login - MediQueue",
  description: "Log in to manage your tutoring sessions",
};

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-gray-900">
     
      
      <main className="flex-grow flex items-center justify-center">
        {children} 
      </main>

     
    </div>
  );
}