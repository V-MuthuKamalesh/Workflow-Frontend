import { BarChart, CheckSquare, Users } from "lucide-react";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mx-32 my-10">
      <StatCard Icon={BarChart} title="Active Projects" value={5} />
      <StatCard Icon={CheckSquare} title="Tasks Completed" value={42} />
      <StatCard Icon={Users} title="Team Members" value={8} />
    </div>
  );
}

function StatCard({ Icon, title, value }) {
  return (
    <div className="p-5 border border-gray-400 rounded-xl shadow-lg flex items-center space-x-4">
      <Icon size={40} />
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl">{value}</p>
      </div>
    </div>
  );
}
