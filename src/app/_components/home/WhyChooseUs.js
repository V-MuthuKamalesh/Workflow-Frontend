import { Handshake, Settings2 } from "lucide-react";
import AboutCard from "./AboutCard";
import { Widgets } from "@mui/icons-material";

export default function WhyChooseUsSection() {
  const aboutData = [
    {
      Icon: Handshake,
      color: "",
      title: "Seamless Collaboration",
      description:
        "Empower your team to collaborate in real-time with easy task management and transparent project tracking.",
    },
    {
      Icon: Widgets,
      color: "success",
      title: "All-in-One Solution",
      description:
        "Manage everything from tasks to team communication in one intuitive platform designed to boost productivity.",
    },
    {
      Icon: Settings2,
      color: "action",
      title: "Customizable WorkFlow",
      description:
        "Create your own workflow to fit your team's needs and preferences, ensuring smooth collaboration and efficiency.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-28 py-10 bg-zinc-900 text-white rounded-lg">
      <div className="flex flex-col items-center space-y-3">
        <h1 className="text-2xl text-purple-400 text-center font-bold leading-tight">
          Why Choose Us?
        </h1>
        <h2 className="text-4xl text-center font-semibold">
          The smart choice for your team
        </h2>
        <p className="text-sm max-w-xl text-center leading-5">
          Everything you need to simplify your projects, boost productivity, and
          keep your team aligned.
        </p>
      </div>

      <div className="flex items-center justify-center space-x-3 mt-10">
        {aboutData.map((item, index) => (
          <AboutCard
            key={index}
            Icon={item.Icon}
            color={item.color}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
