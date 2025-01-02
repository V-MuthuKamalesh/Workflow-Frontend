import Link from "next/link";

export default function FooterLinks({ links }) {
  return (
    <div className="grid gap-1">
      {links.map((link, index) => (
        <Link
          key={index}
          href={`/${link.toLowerCase().split(" ").join("-")}`}
          className="text-gray-500 hover:text-violet-600 transition duration-150"
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
