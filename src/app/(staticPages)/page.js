import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value || null;

  return (
    <section className="bg-violet-50 border border-violet-50 rounded-3xl min-h-screen mx-10 mb-10 mt-2 p-10">
      <div className="text-gray-700 flex flex-col items-center mt-32 h-full">
        <div className="space-y-4">
          <h1 className="text-5xl text-center leading-tight">
            Streamline Your Goals with Our WorkFlow <br /> A Project Management
            Platform
          </h1>
          <p className="text-center">
            Our innovative platform offers a robust solution to help you stay
            organized, focused, and on track to achieve your strategic
            objectives.
          </p>
        </div>
        <Link
          href={userId ? "/work-management/dashboard" : "/auth/signin"}
          className="relative my-10 py-2 px-6 rounded-full border border-violet-400 text-violet-400 overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-violet-400 transform scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            {userId ? "Go to Dashboard" : "Get Started"}
          </span>
        </Link>
        <Image
          src={"/projectManagement.webp"}
          alt="Project Management Tool"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
}
