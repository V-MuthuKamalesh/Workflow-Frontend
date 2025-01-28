"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { processChartData } from "@/app/_utils/helpers/dashboard";

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

const MODULE_MAPPINGS = {
  dev: ["taskStats", "reporterStats", "developerStats"],
  service: ["agentStats", "employeeStats"],
};

export default function DevServiceDashboard({ module, userId, workspaceId }) {
  const [chartsData, setChartsData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const moduleName = useMemo(() => {
    return module
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, [module]);

  useEffect(() => {
    setIsLoading(true);
    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId, workspaceId },
      (response) => {
        if (!response) {
          console.error("Error fetching dashboard data.");
          setIsLoading(false);
          return;
        }

        const relevantStats = MODULE_MAPPINGS[module] || [];
        const parsedData = relevantStats
          .map((key) => processChartData(response[key], key))
          .filter(Boolean);

        setChartsData(parsedData);
        if (parsedData.length > 0) setActiveTab(parsedData[0].key);
        setIsLoading(false);
      }
    );
  }, [module, userId, workspaceId]);

  if (isLoading) {
    return (
      <div className="min-h-20 p-6 pb-10 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {moduleName} Dashboard
        </h1>
        <p className="text-lg text-gray-600 italic">Loading data...</p>
      </div>
    );
  }

  if (chartsData.length === 0) {
    return (
      <div className="min-h-20 p-6 pb-10 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        {moduleName} Dashboard
      </h1>

      <div className="flex justify-center mb-10 space-x-4">
        {chartsData.map(({ key }) => (
          <button
            key={key}
            className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
              activeTab === key
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-sm"
            }`}
            onClick={() => setActiveTab(key)}
          >
            {key.replace(/([A-Z])/g, " $1").toUpperCase()}
          </button>
        ))}
      </div>

      {chartsData.map(({ key, barData, pieData, lineData }) =>
        key === activeTab ? (
          <div key={key} className="mb-16">
            <div className="h-[30rem] flex justify-center">
              <Bar data={barData} />
            </div>

            <div className="grid grid-cols-2 gap-10 mt-24">
              <div className="h-[27rem]">
                <Line data={lineData} />
              </div>
              <div className="h-[27rem]">
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
