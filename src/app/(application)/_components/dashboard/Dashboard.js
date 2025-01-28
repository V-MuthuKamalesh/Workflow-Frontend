"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import {
  getModuleSpecificTexts,
  mapDataForCharts,
} from "@/app/_utils/helpers/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId, workspaceId },
      (response) => {
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
      }
    );
  }, [module, userId, workspaceId]);

  const commonOptions = {
    responsive: true,
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
        <h1 className="text-3xl font-bold mb-3 text-gray-800">
          {moduleName} Dashboard
        </h1>
        <p className="text-lg text-gray-600 italic">
          No data available. Charts cannot be displayed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-20 p-6 pb-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-3 text-gray-800 text-center">
        {moduleName} Dashboard
      </h1>
      <div className="mt-14">
        <div className="flex justify-center mb-10 space-x-4">
          <button
            className={`px-6 py-3 text-base font-medium rounded-lg border transition-all duration-200 ${
              activeTab === "summary"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => setActiveTab("summary")}
          >
            {summary}
          </button>
          <button
            className={`px-6 py-3 text-base font-medium rounded-lg border transition-all duration-200 ${
              activeTab === "trends"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => setActiveTab("trends")}
          >
            {trends}
          </button>
          <button
            className={`px-6 py-3 text-base font-medium rounded-lg border transition-all duration-200 ${
              activeTab === "distribution"
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => setActiveTab("distribution")}
          >
            {distribution}
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="h-[30rem] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">{summary}</h2>
            <Bar data={chartData?.bar} options={commonOptions} />
          </div>
        )}
        {activeTab === "trends" && (
          <div className="h-[27rem] flex flex-col items-center justify-center mt-16">
            <h2 className="text-xl font-bold mb-4">{trends}</h2>
            <Line data={chartData?.line} options={commonOptions} />
          </div>
        )}
        {activeTab === "distribution" && (
          <div className="h-[27rem] flex flex-col items-center justify-center mt-16">
            <h2 className="text-xl font-bold mb-4">{distribution}</h2>
            <Pie data={chartData?.pie} options={commonOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
