"use client"
import { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const routeTitles: any = {
  '/dashboard': 'Dashboard',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/employee': 'Employee List'
  // Add more routes and titles as needed
};

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const router = useRouter();
  const currentPath = usePathname(); // Get the current route path

  const handleLogout = () => {
    // Remove token from localStorage to log out
    localStorage.removeItem("token");

    // Redirect to login page after logout
    router.push("/");
  };

  // Get the header title based on the current route
  const headerTitle = routeTitles[currentPath] || 'Default Title';

  return (
    <>
      <header className="bg-indigo-500 p-6 flex items-center justify-between" style={{ paddingBottom: '60px' }}>
        <div className="flex items-center w-full hkms__heading">
          <h1 className="text-black text-2xl font-bold">{headerTitle}</h1>
          <div className="flex items-center space-x-4" style={{ marginLeft: "auto" }}>
            {/* Notification Button */}
            <button className="relative bg-indigo-500 p-2 rounded-full">
              <span className="absolute right-0 top-0 bg-red-500 w-2 h-2 rounded-full"></span>
              <FaBell className="text-white text-2xl" />
            </button>
            
            {/* Profile Icon and Dropdown */}
            <div className="relative">
              <img
                src="	https://codescandy.com/dashui/assets/images/avatar/avatar-1.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
              />
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {/* Logout Option */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
