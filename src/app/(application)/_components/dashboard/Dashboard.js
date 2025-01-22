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

export default function Dashboard({ module, userId, workspaceId }) {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [hasData, setHasData] = useState(false);

  const moduleName = module
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getModuleSpecificTexts = () => {
    if (module === "work-management") {
      return {
        summary: "Items Summary",
        trends: "Items Trends",
        distribution: "Items Distribution",
      };
    }
    if (module === "crm") {
      return {
        summary: "Leads Summary",
        trends: "Leads Trends",
        distribution: "Leads Distribution",
      };
    }
    return {
      summary: "Task Summary",
      trends: "Task Trends",
      distribution: "Task Distribution",
    };
  };

  const { summary, trends, distribution } = getModuleSpecificTexts();

  useEffect(() => {
    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId, workspaceId },
      (response) => {
        if (!response) {
          console.error("Error getting workspace data.");
          return;
        }

        console.log(response);

        const keyMappings = {
          "work-management": "itemStats",
          dev: "taskStats",
          crm: "leadStats",
          service: "agentStats",
        };

        const statsKey = keyMappings[module];
        if (!statsKey || !response[statsKey]) return;

        const stats = response[statsKey];

        const normalizedStats = Array.isArray(stats) ? stats : [stats];
        const labels = normalizedStats.map(
          (workspace) => workspace.workspaceName
        );
        const total = normalizedStats.map(
          (workspace) =>
            workspace.totalTasks ||
            workspace.totalLeads ||
            workspace.totalTickets ||
            0
        );
        const completed = normalizedStats.map(
          (workspace) =>
            workspace.completedTasks ||
            workspace.completedLeads ||
            workspace.completedTickets ||
            0
        );
        const inProgress = normalizedStats.map(
          (workspace) =>
            workspace.inProgressTasks ||
            workspace.inProgressLeads ||
            workspace.inProgressTickets ||
            0
        );
        const pending = normalizedStats.map(
          (workspace) =>
            workspace.pendingTasks ||
            workspace.pendingLeads ||
            workspace.pendingTickets ||
            0
        );

        const hasTasks =
          total.some((count) => count > 0) ||
          completed.some((count) => count > 0) ||
          inProgress.some((count) => count > 0) ||
          pending.some((count) => count > 0);

        setHasData(hasTasks);

        if (!hasTasks) return;

        setBarChartData({
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
        });

        setPieChartData({
          labels: ["Completed", "Pending", "In Progress"],
          datasets: [
            {
              label: `${distribution}`,
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
        });

        setLineChartData({
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
        });
      }
    );
  }, [module, distribution]);

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
    <div className="min-h-20 p-6 pb-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-3 text-gray-800">
        {moduleName} Dashboard
      </h1>
      {!hasData ? (
        <p className="text-lg text-gray-600 italic">
          No data available. Charts cannot be displayed.
        </p>
      ) : (
        <div className="mt-14">
          <div className="h-[30rem] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">{summary}</h2>
            <Bar data={barChartData} options={commonOptions} />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-20">
            <div className="h-[27rem] flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold mb-4">{trends}</h2>
              <Line data={lineChartData} options={commonOptions} />
            </div>
            <div className="h-[27rem] flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold mb-4">{distribution}</h2>
              <Pie data={pieChartData} options={commonOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
