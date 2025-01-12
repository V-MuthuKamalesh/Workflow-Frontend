import { greetBasedOnTime } from "@/app/_utils/helpers/helper";
import { cookies } from "next/headers";

export default async function Welcome({ view, module }) {
  const cookieStore = await cookies();
  const fullName = cookieStore.get("fullName")?.value;

  const descriptions = {
    home: "Access your tools, recent activities, announcements, and workspace stats in one convenient dashboard.",
    favorites: "View and manage your favorite boards and workspaces.",
  };

  const moduleColors = {
    "work-management": "from-purple-600 to-purple-400",
    dev: "from-green-600 to-green-400",
    crm: "from-yellow-600 to-yellow-400",
    service: "from-teal-600 to-teal-400",
  };

  const bgGradient = moduleColors[module] || "from-gray-400 to-gray-600";

  return (
    <div
      className={`bg-gradient-to-r ${bgGradient} text-white rounded-tl-3xl py-6 px-8 shadow-lg`}
    >
      <h1 className="text-3xl font-bold mb-2">
        {greetBasedOnTime()} {fullName || "Unknown User"}!
      </h1>
      <p className="text-lg">
        {descriptions[view] || "Welcome to your workspace!"}
      </p>
    </div>
  );
}
