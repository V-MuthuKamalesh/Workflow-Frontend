const moduleFields = {
  "work-management": ["itemName", "assignedToId", "status", "dueDate"],
  crm: {
    Lead: [
      "leadName",
      "status",
      "company",
      "title",
      "email",
      "lastInteraction",
    ],
  },
  dev: {
    Bug: ["bugName", "reporter", "developer", "priority", "status"],
    Sprint: ["sprintName", "sprintGoals", "startDate", "endDate"],
    Task: ["taskName", "person", "priority", "status"],
  },
  service: {
    Ticket: [
      "ticketName",
      "description",
      "employee",
      "agent",
      "priority",
      "status",
      "requestType",
    ],
  },
};

export default function getFields(module, boardType) {
  if (module === "work-management") {
    return moduleFields["work-management"];
  }

  if (moduleFields[module] && moduleFields[module][boardType]) {
    return moduleFields[module][boardType];
  }

  return [];
}
