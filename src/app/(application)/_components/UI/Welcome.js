import {
  welcomDescriptions,
  welcomeGradients,
} from "@/app/_utils/constants/colors";
import { greetBasedOnTime } from "@/app/_utils/helpers/helper";
import { cookies } from "next/headers";

export default async function Welcome({ view, module }) {
  const cookieStore = await cookies();
  const fullName = cookieStore.get("fullName")?.value;

  const bgGradient = welcomeGradients[module] || "from-gray-400 to-gray-600";

  return (
    <div
      className={`bg-gradient-to-r ${bgGradient} text-white rounded-tl-3xl py-6 px-8 shadow-lg`}
    >
      <h1 className="text-3xl font-bold mb-2">
        {greetBasedOnTime()} {fullName || "Unknown User"}!
      </h1>
      <p className="text-lg">
        {welcomDescriptions[view] || "Welcome to your workspace!"}
      </p>
    </div>
  );
}
