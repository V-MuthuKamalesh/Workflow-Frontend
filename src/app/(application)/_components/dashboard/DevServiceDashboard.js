"use client";

import React, { useEffect, useState } from "react";
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

export default function DevServiceDashboard({ module }) {
  const [chartsData, setChartsData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const moduleName = module
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId: Cookies.get("userId") },
      (response) => {
        console.log("Response received:", response); // Debug response

        if (!response) {
          console.error("Error getting workspace data.");
          return;
        }

        const moduleMappings = {
          dev: ["taskStats", "reporterStats", "developerStats"],
          service: ["agentStats", "employeeStats"],
        };

        const relevantStats = moduleMappings[module];
        if (!relevantStats) return;

        const charts = relevantStats.map((key) => {
          const stats = response[key];
          if (!stats) return null;

          const normalizedStats = Array.isArray(stats) ? stats : [stats];

          const labels = normalizedStats.map(
            (workspace) => workspace.workspaceName || "Unnamed Workspace"
          );

          const total = normalizedStats.map(
            (workspace) =>
              workspace.totalTasks ||
              workspace.totalBugs ||
              workspace.totalTickets ||
              0
          );

          const completed = normalizedStats.map(
            (workspace) =>
              workspace.completedTasks ||
              workspace.fixedBugs ||
              workspace.completedTickets ||
              0
          );

          const inProgress = normalizedStats.map(
            (workspace) =>
              workspace.inProgressTasks ||
              workspace.inProgressBugs ||
              workspace.inProgressTickets ||
              0
          );

          const pending = normalizedStats.map(
            (workspace) =>
              workspace.pendingTasks ||
              workspace.pendingBugs ||
              workspace.pendingTickets ||
              0
          );

          const hasTasks =
            total.some((count) => count > 0) ||
            completed.some((count) => count > 0) ||
            inProgress.some((count) => count > 0) ||
            pending.some((count) => count > 0);

          if (!hasTasks) return null;

          setHasData(true);

          return {
            key,
            barData: {
              labels,
              datasets: [
                {
                  label: "Total",
                  data: total,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Completed",
                  data: completed,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
                {
                  label: "In Progress",
                  data: inProgress,
                  backgroundColor: "rgba(255, 159, 64, 0.2)",
                  borderColor: "rgba(255, 159, 64, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Pending",
                  data: pending,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            },
            pieData: {
              labels: ["Completed", "Pending", "In Progress"],
              datasets: [
                {
                  label: "Task Distribution",
                  data: [
                    completed.reduce((sum, val) => sum + val, 0),
                    pending.reduce((sum, val) => sum + val, 0),
                    inProgress.reduce((sum, val) => sum + val, 0),
                  ],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                  ],
                  borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            lineData: {
              labels,
              datasets: [
                {
                  label: "Total",
                  data: total,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                },
                {
                  label: "Completed",
                  data: completed,
                  borderColor: "rgba(54, 162, 235, 1)",
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  fill: true,
                },
              ],
            },
          };
        });

        setChartsData(charts.filter(Boolean));
        if (charts.length > 0) setActiveTab(charts[0]?.key);
      }
    );
  }, [module]);

  const commonOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${moduleName} - Dashboard`,
      },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {moduleName} Dashboard
      </h1>
      {!hasData ? (
        <p className="text-lg text-gray-600 italic">
          No data available. Charts cannot be displayed.
        </p>
      ) : (
        <>
          <div className="flex justify-center mb-10 space-x-4">
            {chartsData.map(({ key }) => (
              <button
                key={key}
                className={`relative px-6 py-3 text-base font-medium rounded-lg border transition-all duration-200 ${
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

          {chartsData
            .filter(({ key }) => key === activeTab)
            .map(({ key, barData, pieData, lineData }) => (
              <div key={key} className="mb-16">
                <div className="h-[30rem] flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold mb-4">Summary</h3>
                  <Bar data={barData} options={commonOptions} />
                </div>
                <div className="grid grid-cols-2 gap-10 mt-24">
                  <div className="h-[27rem] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4">Trends</h3>
                    <Line data={lineData} options={commonOptions} />
                  </div>
                  <div className="h-[27rem] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-4">Distribution</h3>
                    <Pie data={pieData} options={commonOptions} />
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
