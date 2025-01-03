import { greetBasedOnTime } from "@/app/_utils/helpers/helper";
import { cookies } from "next/headers";

export default async function Welcome() {
  const cookieStore = await cookies();
  const fullName = cookieStore.get("fullName")?.value;

  return (
    <div className="bg-white rounded-t-3xl py-5 px-10">
      <h1 className="text-xl font-semibold">
        {greetBasedOnTime()} {fullName || "Unknown User"}!
      </h1>
      <p className="text-lg mt-2">
        Quickly access your recent boards, Inbox and workspaces
      </p>
    </div>
  );
}
