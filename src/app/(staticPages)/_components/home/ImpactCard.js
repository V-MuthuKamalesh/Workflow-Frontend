export default function ImpactCard({ title, description, icon }) {
  return (
    <div className="relative p-6 rounded-xl shadow-lg bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-4 rounded-full bg-purple-100">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
