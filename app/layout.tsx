"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/_components/Sidebar";
import { usePathname } from "next/navigation";
import "@/app/styles/globals.css";
import "@/app/styles/app.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking token)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  // Conditionally render Sidebar based on login state and the current route
  const shouldShowSidebar = isLoggedIn && pathname !== "/";

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex">
          {/* Sidebar only shows if the user is logged in and not on the login page */}
          {shouldShowSidebar && <Sidebar />}

          {/* Main content */}
          <main className={`flex-1 bg-gray-100`}>{children}</main>
        </div>
      </body>
    </html>
  );
}
