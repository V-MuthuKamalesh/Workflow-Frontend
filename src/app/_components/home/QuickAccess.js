import { Calendar, ListTodo, User } from "lucide-react";
import Link from "next/link";

export default function QuickAccess() {
  return (
    <div className="grid grid-cols-3 gap-6 mx-auto max-w-4xl">
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
    <Link
      href={link}
      className="p-6 border border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition bg-gradient-to-r from-blue-50 to-white flex flex-col items-start space-y-3"
    >
      <Icon size={40} className="text-blue-500" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
