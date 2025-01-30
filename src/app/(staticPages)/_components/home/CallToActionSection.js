import Link from "next/link";

export default function CallToAction({ userId }) {
  return (
    <div className="mt-16 sm:mt-20 bg-zinc-900 text-white py-12 sm:py-16 px-6 sm:px-8 rounded-lg text-center shadow-lg">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-purple-400">Ready to Get Started?</h2>
      <p className="text-lg sm:text-xl mb-8 max-w-lg sm:max-w-xl mx-auto">Join thousands of users who have boosted their productivity and achieved their goals with us. Don&apos;t miss out on the opportunity to level up.</p>
      <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
        <Link href="/contact" className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-gray-100 shadow-md">
          Contact Us
        </Link>
        <Link href={userId ? "/work-management/view/dashboard" : "/auth/signin"} className="bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-purple-700 shadow-md">
          Get Started
        </Link>
      </div>
    </div>
  );
}
