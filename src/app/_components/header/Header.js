import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white h-20 flex items-center justify-between px-24">
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-lg font-bold">WorkFlow</h1>
        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>
          <Link href="/work-management">Work Management</Link>
          <Link href="/dev">Dev</Link>
          <Link href="/crm">CRM</Link>
          <Link href="/service">Service</Link>
        </div>
        <Link
          className="bg-blue-600 py-1 px-3 rounded-md hover:bg-blue-700"
          href="#"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}
