import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-gray-700 h-14 flex items-center justify-between px-6 md:px-24">
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-3xl font-bold">WorkFlow</h1>

        <div className="flex space-x-8 mx-auto">
          <Link href="/">Home</Link>
          <Link href="/work-management">Work Management</Link>
          <Link href="/dev">Dev</Link>
          <Link href="/crm">CRM</Link>
          <Link href="/service">Service</Link>
        </div>

        <div className="space-x-4 flex items-center">
          <Link
            className="py-2 px-6 rounded-full border border-violet-400"
            href="/auth/signin"
          >
            Login
          </Link>
          <Link
            href="/auth/signin"
            className="relative py-2 px-6 rounded-full border border-violet-400 text-violet-400 overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Get Started
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
