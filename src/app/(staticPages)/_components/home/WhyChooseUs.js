import { Layers, Settings, Users } from "lucide-react";
import AboutCard from "./AboutCard";

export default function WhyChooseUsSection() {
  const aboutData = [
    {
      Icon: Users,
      color: "text-indigo-500",
      title: "Seamless Collaboration",
      description: "Empower your team to collaborate in real-time with easy task management and transparent project tracking.",
    },
    {
      Icon: Layers,
      color: "text-green-500",
      title: "All-in-One Solution",
      description: "Manage everything from tasks to team communication in one intuitive platform designed to boost productivity.",
    },
    {
      Icon: Settings,
      color: "text-yellow-500",
      title: "Customizable WorkFlow",
      description: "Create your own workflow to fit your team's needs and preferences, ensuring smooth collaboration and efficiency.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 py-8 sm:py-12 bg-zinc-900 text-white rounded-lg">
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-purple-400 text-center font-bold leading-tight">Why Choose Us?</h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold">The smart choice for your team</h2>
        <p className="text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl text-center leading-5 sm:leading-7">Everything you need to simplify your projects, boost productivity, and keep your team aligned.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6 mt-10">
        {aboutData.map((item, index) => (
          <AboutCard key={index} Icon={item.Icon} color={item.color} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}
