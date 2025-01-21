import { CheckCircle, Globe, UserCheck } from "lucide-react";
import ImpactCard from "./ImpactCard";

export default function OurImpactSection() {
  const impactData = [
    {
      title: "10,000+ Happy Users",
      description:
        "We've helped thousands of users optimize their workflows and achieve more with less effort.",
      icon: <UserCheck size={48} className="text-purple-400" />,
    },
    {
      title: "95% Success Rate",
      description:
        "Our solutions have consistently delivered measurable results, empowering businesses to grow efficiently.",
      icon: <CheckCircle size={48} className="text-green-400" />,
    },
    {
      title: "Global Reach",
      description:
        "Our impact spans across industries and continents, making a difference worldwide.",
      icon: <Globe size={48} className="text-blue-400" />,
    },
  ];

  return (
    <div className="mt-28 mx-10 md:mx-32 space-y-8">
      <div className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 leading-tight">
          Our Impact
        </h1>
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800">
          Transforming visions into measurable success
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-7">
          Discover how we empower businesses to achieve exceptional results,
          foster innovation, and create a lasting difference through our
          tailored solutions and unmatched expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {impactData.map((item, index) => (
          <ImpactCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
