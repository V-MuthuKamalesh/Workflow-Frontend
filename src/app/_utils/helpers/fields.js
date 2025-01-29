const moduleFields = {
  "work-management": ["itemName", "assignedToId", "status", "dueDate"],
  crm: {
    Lead: ["leadName", "status", "company", "title", "email", "lastInteraction"],
  },
  dev: {
    Bug: ["bugName", "reporter", "developer", "priority", "status"],
    Sprint: ["sprintName", "sprintGoals", "startDate", "endDate"],
    Task: ["taskName", "person", "priority", "status"],
  },
  service: {
    Ticket: ["ticketName", "description", "employee", "agent", "priority", "status", "requestType"],
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

export const priorityOptions = {
  dev: {
    Bug: ["Critical", "High", "Medium", "Low"],
    Task: ["Critical", "High", "Medium", "Low", "Best Effort"],
  },
  service: {
    Ticket: ["Critical", "High", "Medium", "Low"],
  },
};

export const requestTypeOptions = {
  service: {
    Ticket: ["Issue", "Question", "Request"],
  },
};

export const statusOptionsMap = {
  dev: {
    Bug: ["Awaiting Review", "Ready for Dev", "Fixing", "Fixed", "Missing Info", "Pending Deploy", "Known Bug", "Duplicated"],
    Task: ["Ready to start", "In Progress", "Waiting for review", "Pending Deploy", "Done", "Stuck"],
  },
  "work-management": ["Ready to start", "In Progress", "Waiting for review", "Pending Deploy", "Done", "Stuck"],
  crm: {
    Lead: ["New Lead", "Attempted to contact", "Contacted", "Qualified", "Unqualified"],
  },
  service: {
    Ticket: ["New", "Awaiting customer", "New reply", "Resolved"],
  },
};
