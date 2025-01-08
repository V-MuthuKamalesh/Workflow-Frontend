import { Calendar, ListTodo, User } from "lucide-react";
import Link from "next/link";

export default function QuickAccess() {
  return (
    <div className="grid grid-cols-3 gap-4 mx-32 my-10">
      <Card
        Icon={Calendar}
        title="Schedule a Meeting"
        description="Plan and organize your meetings"
        link="/schedule"
      />
      <Card
        Icon={ListTodo}
        title="Track Tasks"
        description="Stay on top of your work"
        link="/tasks"
      />
      <Card
        Icon={User}
        title="Team Overview"
        description="Collaborate with your team"
        link="/team"
      />
    </div>
  );
}

function Card({ Icon, title, description, link }) {
  return (
    <div className="h-16 border border-gray-400 rounded-xl hover:cursor-pointer hover:shadow-xl flex items-center justify-between px-5 py-10">
      <div className="flex items-center space-x-2">
        <Icon size={55} />
        <div className="space-y-1">
          <h2 className="font-semibold text-lg">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <Link
        className="border border-gray-400 py-1 px-2 hover:bg-gray-300 rounded-md"
        href={link}
      >
        Go
      </Link>
    </div>
  );
}
