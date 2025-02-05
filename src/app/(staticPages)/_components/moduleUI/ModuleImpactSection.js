import { CheckCircle, Globe, UserCheck, TrendingUp } from "lucide-react";
import ModuleImpactCard from "./ModuleImpactCard";

export default function ModuleImpactSection({ impact }) {
  const iconMap = {
    "Increase in Sales": <TrendingUp size={48} className="text-green-400" />,
    "Customer Satisfaction": <UserCheck size={48} className="text-purple-400" />,
    "Reduction in Manual Work": <CheckCircle size={48} className="text-blue-400" />,
    "Global Users": <Globe size={48} className="text-indigo-400" />,
  };

  return (
    <div className="mt-12 mx-6 sm:mx-16 lg:mx-32 space-y-8">
      <div className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 leading-tight">Our Impact</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
          Transforming visions into measurable success
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-7">
          {impact.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 sm:mt-16">
        {impact.metrics.map((metric, index) => (
          <ModuleImpactCard
            key={index}
            title={metric.value}
            description={metric.label}
            icon={iconMap[metric.label] || <CheckCircle size={48} className="text-gray-400" />}
          />
        ))}
      </div>
    </div>
  );
}
