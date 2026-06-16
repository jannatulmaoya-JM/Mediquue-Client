import { ThemeProvider } from "../context/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "MediQueue | Home",
  description: "Find and book your perfect online learning tutor today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}