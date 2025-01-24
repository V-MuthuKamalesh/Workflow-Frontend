import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ userId }) {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-32 mx-10 px-6 space-y-8 md:space-y-12">
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Streamline Your Goals with Our WorkFlow <br /> A Project Management
          Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Our innovative platform offers a robust solution to help you stay
          organized, focused, and on track to achieve your strategic objectives.
        </p>
      </div>
      <Link
        href={userId ? "/work-management/view/dashboard" : "/auth/signin"}
        className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-violet-400 bg-white rounded-full border border-violet-400 overflow-hidden group transform transition-all duration-300 hover:bg-violet-400 hover:text-white"
      >
        <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          {userId ? "Go to Dashboard" : "Get Started"}
        </span>
      </Link>
      <div className="relative mt-8 md:mt-16">
        <Image
          src="/newProjectManagement.webp"
          alt="Project Management Tool"
          width={1000}
          height={1000}
          className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}
