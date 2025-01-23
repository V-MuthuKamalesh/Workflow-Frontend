import XLSX from "xlsx";

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

export const handleExportGroup = (group) => {
  const data = group.items.map((item) => {
    return {
      "Item Name": item.itemName,
      "Assigned To": item.assignedToId
        .map((assignee) => `${assignee.fullname} <${assignee.email}>`)
        .join(", "),
      Status: item.status,
      "Due Date": new Date(item.dueDate).toLocaleDateString(),
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, group.groupName);

  const fileName = `${group.groupName}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const handleExportBoard = (board) => {
  const data = board.groups.flatMap((group) => {
    return group.items.map((item) => {
      return {
        "Group Name": group.groupName,
        "Item Name": item.itemName,
        "Assigned To": item.assignedToId
          .map((assignee) => `${assignee.fullname} <${assignee.email}>`)
          .join(", "),
        Status: item.status,
        "Due Date": new Date(item.dueDate).toLocaleDateString(),
      };
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, board.boardName);

  const fileName = `${board.boardName}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
