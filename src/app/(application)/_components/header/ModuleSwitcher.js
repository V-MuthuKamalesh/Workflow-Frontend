import { X } from "lucide-react";
import Link from "next/link";

const moduleDetails = [
  {
    name: "Work Management",
    icon: "📁",
    path: "/work-management/view/dashboard",
  },
  {
    name: "Development",
    icon: "💻",
    path: "/dev/view/dashboard",
  },
  {
    name: "CRM",
    icon: "👥",
    path: "/crm/view/dashboard",
  },
  {
    name: "Service",
    icon: "🔧",
    path: "/service/view/dashboard",
  },
];

export default function ModuleSwitcher({ isModalOpen, setIsModalOpen }) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Select Module</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {moduleDetails.map((module) => (
            <Link key={module.name} href={module.path} className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300">
              <span className="text-3xl">{module.icon}</span>
              <span className="text-sm font-medium text-gray-700 mt-2">{module.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
