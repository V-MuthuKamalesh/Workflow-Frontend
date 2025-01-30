import Link from "next/link";

export default function FooterLinks({ links }) {
  return (
    <div className="grid gap-2 text-center sm:text-left">
      {links.map((link, index) => (
        <Link key={index} href={`/${link.toLowerCase().split(" ").join("-")}`} className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium">
          {link}
        </Link>
      ))}
    </div>
  );
}
