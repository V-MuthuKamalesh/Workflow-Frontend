import { Widgets } from "@mui/icons-material";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import AboutCard from "../_components/home/AboutCard";
import { Handshake, Settings2 } from "lucide-react";
import ImpactCard from "../_components/home/ImpactCard";
import Testimonials from "../_components/home/Testimonials";
import CallToAction from "../_components/home/CallToAction";

export default async function HomePage() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value || null;

  return (
    <section className="bg-violet-50 border border-violet-50 rounded-3xl min-h-screen mb-10 mt-2 pt-10">
      <div className="text-gray-700 flex flex-col items-center mt-32 h-full mx-10 px-10">
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

      <div className="flex flex-col items-center justify-center mt-28 py-10 bg-zinc-900 text-white rounded-lg">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-2xl text-purple-400 text-center font-bold leading-tight">
            We are trusted by
          </h1>
          <div className="flex items-center justify-center space-x-10">
            <Image
              src={"/codingmart.jpg"}
              alt="Codingmart logo"
              height={200}
              width={200}
            />
            <Image
              src={"/finestcoder.webp"}
              alt="Finest coder logo"
              className="-mt-1"
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>

      <div className="mt-28 mx-32 space-y-7">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-2xl text-purple-400 text-center font-bold leading-tight">
            Our Impact
          </h1>
          <h2 className="text-4xl text-center font-semibold">
            Transforming visions into measurable success
          </h2>
          <p className="text-sm max-w-xl text-center leading-5">
            Discover how we empower businesses to achieve exceptional results,
            foster innovation, and create a lasting difference through our
            tailored solutions and unmatched expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mx-32">
          <ImpactCard
            title="10,000+ Happy Users"
            description="We've helped thousands of users optimize their workflows and achieve more
      with less effort."
          />
          <ImpactCard
            title="95% Success Rate"
            description="Our solutions have consistently delivered measurable results,
              empowering businesses to grow efficiently."
          />
          <ImpactCard
            title="Global Reach"
            description="Our impact spans across industries and continents, making a
              difference worldwide."
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-28 py-10 bg-zinc-900 text-white rounded-lg">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-2xl text-purple-400 text-center font-bold leading-tight">
            Why Choose Us?
          </h1>
          <h2 className="text-4xl text-center font-semibold">
            The smart choice for your team
          </h2>
          <p className="text-sm max-w-xl text-center leading-5">
            Everything you need to simplify your projects, boost productivity,
            and keep your team aligned
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 mt-10">
          <AboutCard
            Icon={Handshake}
            color=""
            title="Seamless Collaboration"
            description="Empower your team to collaborate in real-time with easy task management
        and transparent project tracking."
          />
          <AboutCard
            Icon={Widgets}
            color={"success"}
            title="All-in-One Solution"
            description="Manage everything from tasks to team communicaion in one intuitive
              platform designed to boost productivity."
          />
          <AboutCard
            Icon={Settings2}
            color={"action"}
            title="Customizable WorkFlow"
            description="Create your own workflow to fit your team's needs and
              preferences, ensuring smooth collaboration and efficiency."
          />
        </div>
      </div>

      <Testimonials />
      <CallToAction />
    </section>
  );
}
