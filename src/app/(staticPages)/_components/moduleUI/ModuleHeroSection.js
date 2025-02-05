import Image from "next/image";
import Link from "next/link";

export default function ModuleHeroSection({ userId, moduleData }) {
  const { module, title, description, imageUrl, colorSchemes } = moduleData;

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 sm:mt-28 md:mt-32 mx-6 sm:mx-10 px-4 sm:px-6 space-y-8 md:space-y-12">
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          {title} <br className="hidden sm:block" />
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">{description}</p>
      </div>

      <Link
        href={userId ? `/${module}/view/dashboard` : `/auth/signin`}
        className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold ${colorSchemes.text} bg-white rounded-full border border-violet-400 overflow-hidden group transition-all duration-300 hover:bg-violet-400 hover:text-white`}
      >
        <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          {userId ? "Go to Dashboard" : "Get Started"}
        </span>
      </Link>

      <div className="relative mt-8 md:mt-16 flex justify-center w-full">
        <Image
          src={imageUrl}
          alt={`${module} tool`}
          width={1000}
          height={600}
          className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 w-full sm:w-[90%] md:w-[80%]"
          priority
        />
      </div>
    </div>
  );
}
