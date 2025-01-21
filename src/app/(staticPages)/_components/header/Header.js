"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { clearAllCookies } from "@/app/_utils/helpers/cookies";
import { User } from "lucide-react";

export default function Header() {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userId = Cookies.get("userId");
    setAuthToken(token);
    setUserId(userId);
  }, []);

  const handleLogout = () => {
    clearAllCookies();
    window.location.reload();
    setAuthToken(null);
  };

  return (
    <header className="bg-white text-gray-800 h-16 flex items-center justify-between px-6 md:px-24 sticky top-0 z-50 shadow-md">
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-3xl font-extrabold hover:text-purple-400 transition-colors duration-300 cursor-pointer">
          WorkFlow
        </h1>

        <div className="flex space-x-6 mx-auto">
          <Link
            href="/"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/work-management"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Work Management
          </Link>
          <Link
            href="/dev"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Dev
          </Link>
          <Link
            href="/crm"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            CRM
          </Link>
          <Link
            href="/service"
            className="hover:text-purple-400 transition-colors duration-300"
          >
            Service
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {authToken && userId ? (
            <div className="flex items-center space-x-5">
              <User className="text-violet-400 w-6 h-6" />
              <button
                onClick={handleLogout}
                className="relative py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                <span className="relative z-10">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300"
                href="/auth/signin"
              >
                Login
              </Link>
              <Link
                href="/auth/signin"
                className="relative py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                <span className="relative z-10">Get Started</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
