"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { getModuleSpecificTexts, mapDataForCharts } from "@/app/_utils/helpers/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ module, userId, workspaceId }) {
  const [chartData, setChartData] = useState(null);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");

  const { summary, trends, distribution } = getModuleSpecificTexts(module);
  const moduleName = module
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    setIsLoading(true);

    socket.emit("getDashboardDetails", { moduleId: Cookies.get("moduleId"), userId, workspaceId }, (response) => {
      if (!response) {
        console.error("Error getting workspace dashboard data.");
        setIsLoading(false);
        return;
      }

      const { hasTasks, data } = mapDataForCharts(response, module);

      setHasData(hasTasks);
      if (hasTasks) {
        setChartData(data);
      }
      setIsLoading(false);
    });
  }, [module, userId, workspaceId]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${moduleName} - Dashboard`,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-20 p-6 pb-10 bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading data...</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="min-h-20 p-6 pb-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-3 text-gray-800 text-center">{moduleName} Dashboard</h1>
        <p className="text-lg text-gray-600 italic text-center">No data available. Charts cannot be displayed.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 rounded-lg shadow-md w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-center">{moduleName} Dashboard</h1>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { id: "summary", label: summary },
          { id: "trends", label: trends },
          { id: "distribution", label: distribution },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg border transition-all duration-200 
              ${activeTab === tab.id ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        {activeTab === "summary" && (
          <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[60%] h-[25rem] sm:h-[30rem]">
            <h2 className="text-xl font-bold mb-4 text-center">{summary}</h2>
            <Bar data={chartData?.bar} options={commonOptions} />
          </div>
        )}
        {activeTab === "trends" && (
          <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[60%] h-[23rem] sm:h-[27rem]">
            <h2 className="text-xl font-bold mb-4 text-center">{trends}</h2>
            <Line data={chartData?.line} options={commonOptions} />
          </div>
        )}
        {activeTab === "distribution" && (
          <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[60%] h-[23rem] sm:h-[27rem]">
            <h2 className="text-xl font-bold mb-4 text-center">{distribution}</h2>
            <Pie data={chartData?.pie} options={commonOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
