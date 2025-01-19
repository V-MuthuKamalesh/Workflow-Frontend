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

export default function WorkManagementDashboard() {
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

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

        const labels = response.map((workspace) => workspace.workspaceName);
        const totalTasks = response.map((workspace) => workspace.totalTasks);
        const completedTasks = response.map(
          (workspace) => workspace.completedTasks
        );
        const pendingTasks = response.map(
          (workspace) => workspace.pendingTasks
        );
        const inProgressTasks = response.map(
          (workspace) => workspace.inProgressTasks
        );

        setBarChartData({
          labels,
          datasets: [
            {
              label: "Total Tasks",
              data: totalTasks,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Completed Tasks",
              data: completedTasks,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Pending Tasks",
              data: pendingTasks,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "In Progress Tasks",
              data: inProgressTasks,
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        });

        const totalTaskCounts = {
          Completed: completedTasks.reduce((sum, val) => sum + val, 0),
          Pending: pendingTasks.reduce((sum, val) => sum + val, 0),
          InProgress: inProgressTasks.reduce((sum, val) => sum + val, 0),
        };
        setPieChartData({
          labels: ["Completed", "Pending", "In Progress"],
          datasets: [
            {
              label: "Task Distribution",
              data: Object.values(totalTaskCounts),
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
              label: "Total Tasks",
              data: totalTasks,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
            {
              label: "Completed Tasks",
              data: completedTasks,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
          ],
        });
      }
    );
  }, []);

  const commonOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Work Management - Dashboard",
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="h-[30rem] mb-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Bar Chart - Task Status</h2>
        {barChartData ? (
          <Bar data={barChartData} options={commonOptions} />
        ) : (
          <p>Loading bar chart...</p>
        )}
      </div>

      <div className="h-[30rem] mb-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Line Chart - Task Trends</h2>
        {lineChartData ? (
          <Line data={lineChartData} options={commonOptions} />
        ) : (
          <p>Loading line chart...</p>
        )}
      </div>

      <div className="h-[27rem] mb-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">
          Pie Chart - Task Distribution
        </h2>
        {pieChartData ? (
          <Pie data={pieChartData} options={commonOptions} />
        ) : (
          <p>Loading pie chart...</p>
        )}
      </div>
    </div>
  );
}
