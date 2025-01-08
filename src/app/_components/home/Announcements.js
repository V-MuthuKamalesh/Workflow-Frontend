import { Bell } from "lucide-react";

export default function Announcements() {
  return (
    <div className="mx-auto max-w-4xl p-5 border border-gray-300 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-white">
      <h2 className="text-lg font-semibold mb-3">Announcements</h2>
      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <Bell size={20} className="text-blue-500" />
          <p>New feature update: Task dependencies are now available!</p>
        </li>
        <li className="flex items-center space-x-3">
          <Bell size={20} className="text-blue-500" />
          <p>Team meeting scheduled for tomorrow at 10 AM.</p>
        </li>
      </ul>
    </div>
  );
}
