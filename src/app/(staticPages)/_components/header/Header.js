"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearAllCookies } from "@/app/_utils/helpers/cookies";
import { User } from "lucide-react";

export default function Header({ userDetails }) {
  const pathname = usePathname();

  console.log(userDetails);

  const handleLogout = () => {
    clearAllCookies();
    window.location.reload();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work-management", label: "Work Management" },
    { href: "/dev", label: "Dev" },
    { href: "/crm", label: "CRM" },
    { href: "/service", label: "Service" },
  ];

  return (
    <header className="bg-white text-gray-800 h-16 flex items-center justify-between px-6 md:px-24 sticky top-0 z-50 shadow-md">
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-3xl font-extrabold hover:text-purple-400 transition-colors duration-300 cursor-pointer">
          WorkFlow
        </h1>

        <div className="flex space-x-6 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-2 py-1 transition-all duration-300 ${
                pathname === link.href
                  ? "text-purple-600 font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-purple-600"
                  : "hover:text-purple-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {userDetails ? (
            <div className="flex items-center space-x-5">
              <User className="text-violet-400 w-6 h-6" />
              <button
                onClick={handleLogout}
                className="relative py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300"
              >
                Logout
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
                className="relative py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
