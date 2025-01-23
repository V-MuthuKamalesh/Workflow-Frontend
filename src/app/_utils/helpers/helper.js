export const greetBasedOnTime = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning,";
  } else if (currentHour < 17) {
    return "Good afternoon,";
  } else if (currentHour < 19) {
    return "Good evening,";
  } else {
    return "Good night,";
  }
};

export const convertFromCamelCasetoNormalText = (str) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const createNewItem = (module, boardType, initialValue = "") => {
  const newItemTemplate = {
    "work-management": () => ({
      itemName: initialValue || "New Item",
      assignedToId: [],
      status: "",
      dueDate: new Date().toISOString(),
    }),
    crm: {
      Lead: () => ({
        leadName: initialValue || "New Lead",
        status: "",
        company: "Company Name",
        title: "Title",
        email: "name@company.com",
        lastInteraction: new Date().toISOString(),
      }),
    },
    dev: {
      Bug: () => ({
        bugName: initialValue || "New Bug",
        reporter: [],
        developer: [],
        priority: "",
        status: "",
      }),
      Sprint: () => ({
        sprintName: initialValue || "New Sprint",
        sprintGoals: "Type your sprint goals here",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      }),
      Task: () => ({
        taskName: initialValue || "New Task",
        person: [],
        priority: "",
        status: "",
      }),
    },
    service: {
      Ticket: () => ({
        ticketName: initialValue || "New Ticket",
        description: "Ticket description",
        employee: [],
        agent: [],
        priority: "",
        status: "",
        requestType: "",
      }),
    },
  };

  const newItem =
    typeof newItemTemplate[module] === "function"
      ? newItemTemplate[module]()
      : newItemTemplate[module]?.[boardType]?.() || {};

  return newItem;
};

export const groupMembers = (members) => {
  return members.reduce(
    (acc, member) => {
      acc[member.role].push(member);
      return acc;
    },
    { admin: [], member: [] }
  );
};
