"use client";

import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-400 hover:text-white md:hidden"
              >
                <AiOutlineMenu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-8"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/tasks"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Tasks
                  </Link>
                  <Link
                    href="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Users
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button type="button" className="text-gray-400 hover:text-white">
                <AiOutlineBell className="h-6 w-6" />
              </button>
              <button type="button" className="text-gray-400 hover:text-white">
                <AiOutlineUser className="h-6 w-6" />
              </button>
              <button type="button" className="text-gray-400 hover:text-white">
                <AiOutlineSetting className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-75">
          <div className="relative bg-white w-64 p-4">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/tasks"
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Tasks
              </Link>
              <Link
                href="/users"
                className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                Users
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
