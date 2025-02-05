import FeatureCard from "./FeatureCard";
import { Brain, Settings, BarChart } from "lucide-react"; // Example icons, replace as needed

export default function FeaturesSection({ features }) {
  const iconMap = {
    "AI-Powered Insights": Brain,
    "Automated Workflows": Settings,
    "Custom Reports": BarChart,
  };

  return (
    <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 py-8 sm:py-12 bg-zinc-900 text-white rounded-lg">
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-purple-400 text-center font-bold leading-tight">
          Key Features
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl text-center leading-5 sm:leading-7">
          Explore the features that make our platform powerful and efficient.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6 mt-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            Icon={iconMap[feature.title] || Settings}
            color="text-indigo-500"
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
