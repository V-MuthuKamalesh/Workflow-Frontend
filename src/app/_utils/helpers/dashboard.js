export function getModuleSpecificTexts(module) {
  const texts = {
    "work-management": {
      summary: "Items Summary",
      trends: "Items Trends",
      distribution: "Items Distribution",
    },
    crm: {
      summary: "Leads Summary",
      trends: "Leads Trends",
      distribution: "Leads Distribution",
    },
    default: {
      summary: "Task Summary",
      trends: "Task Trends",
      distribution: "Task Distribution",
    },
  };

  return texts[module] || texts.default;
}

export function mapDataForCharts(response, module) {
  const keyMappings = {
    "work-management": "itemStats",
    dev: "taskStats",
    crm: "leadStats",
    service: "agentStats",
  };
  const statsKey = keyMappings[module];
  const stats = response[statsKey] || [];
  const normalizedStats = Array.isArray(stats) ? stats : [stats];

  const labels = normalizedStats.map((workspace) => workspace.workspaceName);
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

  return {
    hasTasks,
    data: {
      bar: {
        labels,
        datasets: [
          {
            label: "Total",
            data: total,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Completed",
            data: completed,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "In Progress",
            data: inProgress,
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
          },
          {
            label: "Pending",
            data: pending,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      },
      pie: {
        labels: ["Completed", "Pending", "In Progress"],
        datasets: [
          {
            label: "Items Distribution",
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
          },
        ],
      },
      line: {
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
    },
  };
}
