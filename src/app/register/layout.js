export const metadata = {
  title: "MediQueue | Register",
  description: "Create an account to register as a student or tutor.",
};

export default function RegisterLayout({ children }) {
  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      {children}
    </div>
  );
}