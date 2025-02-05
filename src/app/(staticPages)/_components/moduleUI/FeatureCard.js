export default function FeatureCard({ title, description, Icon, color }) {
  return (
    <div className="max-w-sm w-full h-auto p-6 space-y-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-700 to-gray-800 text-white transition-transform transform hover:-translate-y-3 hover:shadow-2xl">
      <div className="flex items-center space-x-3">
        <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
          {Icon && <Icon size={28} className={`${color}`} />}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-300 text-sm sm:text-base leading-6">{description}</p>
    </div>
  );
}
