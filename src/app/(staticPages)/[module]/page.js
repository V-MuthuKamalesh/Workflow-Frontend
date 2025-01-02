import Image from "next/image";
import Link from "next/link";
import { moduleStaticPagesData } from "./data.js";

export default async function ModulePageUI({ params }) {
  const { module } = await params;

  const { title, description, imageUrl, colorSchemes } =
    moduleStaticPagesData.filter(
      (moduleData) => moduleData.module === module
    )[0];

  return (
    <section
      className={`${colorSchemes.bg} ${colorSchemes.border} rounded-3xl min-h-screen mx-10 mb-10 mt-2 p-10`}
    >
      <div className="text-gray-700 flex flex-col items-center mt-32 h-full">
        <div className="space-y-4">
          <h1 className="text-5xl text-center leading-tight">{title}</h1>
          <p className="text-center">{description}</p>
        </div>
        <Link
          href={`/${module}/dashboard`}
          className={`font-semibold relative my-10 py-4 px-8 rounded-full border ${colorSchemes.text} overflow-hidden group`}
        >
          <span className={`absolute inset-0 w-full h-full bg-black`}></span>
          <span className={`relative z-10 transition-colors duration-300`}>
            Get Started
          </span>
        </Link>
        <Image
          src={imageUrl}
          alt={`${module} tool`}
          width={1000}
          height={1000}
          priority
        />
      </div>
    </section>
  );
}
