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
import { io } from "socket.io-client";
import Cookies from "js-cookie";

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

export default function Dashboard({ module }) {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [hasData, setHasData] = useState(false);

  const moduleName = module
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId: Cookies.get("userId") },
      (response) => {
        if (!response) {
          console.error("Error getting workspace data.");
          return;
        }

        console.log(response);

        // Dynamically determine the keys based on the module
        const keyMappings = {
          crm: {
            total: "totalLeads",
            completed: "completedLeads",
            inProgress: "inProgressLeads",
            pending: "pendingLeads",
          },
          service: {
            total: "totalTickets",
            completed: "completedTickets",
            inProgress: "inProgressTickets",
            pending: "pendingTickets",
          },
          dev: {
            total: "totalTasks",
            completed: "completedTasks",
            inProgress: "inProgressTasks",
            pending: "pendingTasks",
          },
          "work-management": {
            total: "totalTasks",
            completed: "completedTasks",
            inProgress: "inProgressTasks",
            pending: "pendingTasks",
          },
        };

        const keys = keyMappings[module];
        if (!keys) return;

        const labels = response.map((workspace) => workspace.workspaceName);
        const total = response.map((workspace) => workspace[keys.total]);
        const completed = response.map(
          (workspace) => workspace[keys.completed]
        );
        const inProgress = response.map(
          (workspace) => workspace[keys.inProgress]
        );
        const pending = response.map((workspace) => workspace[keys.pending]);

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

        const totalCounts = {
          Completed: completed.reduce((sum, val) => sum + val, 0),
          Pending: pending.reduce((sum, val) => sum + val, 0),
          InProgress: inProgress.reduce((sum, val) => sum + val, 0),
        };

        setPieChartData({
          labels: ["Completed", "Pending", "In Progress"],
          datasets: [
            {
              label: "Task Distribution",
              data: Object.values(totalCounts),
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
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {moduleName} Dashboard
      </h1>
      {!hasData ? (
        <p className="text-lg text-gray-600 italic">
          No data available. Charts cannot be displayed.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          <div className="h-[30rem] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
            <Bar data={barChartData} options={commonOptions} />
          </div>
          <div className="h-[30rem] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Line Chart</h2>
            <Line data={lineChartData} options={commonOptions} />
          </div>
          <div className="h-[27rem] flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
            <Pie data={pieChartData} options={commonOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
