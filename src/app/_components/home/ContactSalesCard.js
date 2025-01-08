import { BadgePercent } from "lucide-react";
import Link from "next/link";

export default function ContactSales() {
  return (
    <div className="h-16 mx-32 my-10 border border-gray-400 rounded-xl hover:cursor-pointer hover:shadow-xl flex items-center justify-between px-5 py-10">
      <div className="flex items-center space-x-2">
        <BadgePercent size={55} />
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">Talk to our sales experts</h2>
          <p>Discover what Workflow can do to your business</p>
        </div>
      </div>
      <Link
        className="border border-gray-400 py-1 px-2 hover:bg-gray-300 rounded-md"
        href={"/contact/sales"}
      >
        Contact Sales
      </Link>
    </div>
  );
}
