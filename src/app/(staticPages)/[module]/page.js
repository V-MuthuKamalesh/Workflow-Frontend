import Image from "next/image";
import Link from "next/link";
import { moduleStaticPagesData } from "./data.js";
import { cookies } from "next/headers.js";

export default async function ModulePageUI({ params }) {
  const { module } = await params;
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value || null;

  const { title, description, imageUrl, colorSchemes } =
    moduleStaticPagesData.filter(
      (moduleData) => moduleData.module === module
    )[0];

  return (
    <section
      className={`${colorSchemes.bg} ${colorSchemes.border} min-h-screen mb-10 pt-10`}
    >
      <div className="flex flex-col items-center justify-center h-full mt-32 mx-10 px-6 space-y-8 md:space-y-12">
        <div className="text-center space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <Link
          href={userId ? `/${module}/view/dashboard` : `/auth/signin`}
          className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold ${colorSchemes.text} bg-white rounded-full border overflow-hidden group transform transition-all duration-300  hover:text-white`}
        >
          <span className="absolute inset-0 w-full h-full bg-black transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Get Started
          </span>
        </Link>

        <div className="relative mt-8 md:mt-16">
          <Image
            src={imageUrl}
            alt={`${module} tool`}
            width={1000}
            height={1000}
            className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="h-32"></div>
    </section>
  );
}
