import { BarChart, CheckSquare, Users } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-6 mx-auto max-w-4xl">
      <StatCard Icon={BarChart} title="Active Projects" value={5} />
      <StatCard Icon={CheckSquare} title="Tasks Completed" value={42} />
      <StatCard Icon={Users} title="Team Members" value={8} />
    </div>
  );
}

function StatCard({ Icon, title, value }) {
  return (
    <div className="p-6 border border-gray-300 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-white flex items-center space-x-4">
      <Icon size={40} className="text-blue-500" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
