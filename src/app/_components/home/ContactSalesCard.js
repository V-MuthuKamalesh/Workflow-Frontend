import { BadgePercent } from "lucide-react";
import Link from "next/link";

export default function ContactSales() {
  return (
    <div className="mx-auto max-w-4xl p-5 border border-gray-300 rounded-2xl shadow-lg hover:shadow-2xl transition bg-gradient-to-r from-blue-50 to-white">
      <div className="flex items-center space-x-5">
        <BadgePercent size={60} className="text-blue-500" />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Talk to our sales experts</h2>
          <p className="text-gray-600">Discover what Workflow can do for your business.</p>
        </div>
        <Link
          href="/contact/sales"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
