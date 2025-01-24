import Link from "next/link";

export default function CallToAction({ userId }) {
  return (
    <div className="mt-20 bg-zinc-900 text-white py-16 px-8 rounded-lg text-center shadow-lg">
      <h2 className="text-5xl font-extrabold mb-4 leading-tight text-purple-400">
        Ready to Get Started?
      </h2>
      <p className="text-xl mb-8 max-w-xl mx-auto">
        Join thousands of users who have boosted their productivity and achieved
        their goals with us. Don&apos;t miss out on the opportunity to level up.
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          href="/contact"
          className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-gray-100 shadow-md"
        >
          Contact Us
        </Link>
        <Link
          href={userId ? "/work-management/view/dashboard" : "/auth/signin"}
          className="bg-purple-600 px-8 py-4 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-purple-700 shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
