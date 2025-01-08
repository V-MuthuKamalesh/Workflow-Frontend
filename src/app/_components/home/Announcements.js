import { Bell } from "lucide-react";

export default function Announcements() {
  return (
    <div className="mx-32 my-10 p-5 border border-gray-400 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <ul className="space-y-2">
        <li className="flex items-center space-x-3">
          <Bell size={20} />
          <p>New feature update: Task dependencies are now available!</p>
        </li>
        <li className="flex items-center space-x-3">
          <Bell size={20} />
          <p>Team meeting scheduled for tomorrow at 10 AM.</p>
        </li>
      </ul>
    </div>
  );
}
