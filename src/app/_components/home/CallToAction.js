import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="mt-20 bg-zinc-900 text-white py-16 px-8 rounded-lg text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-lg mb-8">
        Join thousands of users who have boosted their productivity and achieved
        their goals with us.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/contact"
          className="bg-white text-purple-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Contact Us
        </Link>
        <Link
          href="/signup"
          className="bg-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
