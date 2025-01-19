"use client";

import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WorkManagementDashboard() {
  const data = {
    labels: [
      "Workspace A",
      "Workspace B",
      "Workspace C",
      "Workspace D",
      "Workspace E",
    ],
    datasets: [
      {
        label: "Total Tasks",
        data: [30, 40, 25, 50, 35],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Completed Tasks",
        data: [15, 25, 20, 35, 25],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Pending Tasks",
        data: [7, 10, 3, 8, 5],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "In Progress Tasks",
        data: [8, 5, 2, 7, 5],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Work Management - Task Status Overview",
      },
    },
  };

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "getDashboardDetails",
      { moduleId: Cookies.get("moduleId"), userId: Cookies.get("userId") },
      (response) => {
        console.log(response);

        if (!response) {
          console.error("Error getting workspace data.");
          return;
        }

        console.log(response);
      }
    );
  }, []);

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
