"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearAllCookies } from "@/app/_utils/helpers/cookies";
import { User, Menu, X } from "lucide-react";

export default function Header({ userDetails }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-white text-gray-800 h-16 flex items-center justify-between px-6 md:px-24 sticky top-0 z-50 shadow-md w-full">
      <h1 className="text-slate-800 text-2xl md:text-3xl font-extrabold hover:text-purple-400 transition-colors duration-300 cursor-pointer">WorkFlow</h1>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 mx-auto">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={`relative px-2 py-1 transition-all duration-300 ${pathname === link.href ? "text-purple-600 font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-purple-600" : "hover:text-purple-400"}`}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {userDetails ? (
          <div className="flex items-center space-x-5">
            <User className="text-violet-400 w-6 h-6" />
            <button onClick={handleLogout} className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300" href="/auth/signin">
              Login
            </Link>
            <Link href="/auth/signin" className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300">
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-lg ${pathname === link.href ? "text-purple-600 font-bold" : "hover:text-purple-400"}`}>
                {link.label}
              </Link>
            ))}

            {userDetails ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300" href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/signin" className="py-2 px-6 rounded-full border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
