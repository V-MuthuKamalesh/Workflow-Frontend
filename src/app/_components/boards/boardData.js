export const boardInfo = {
  boardId: 1,
  workspaceName: "My Workspace",
  boardName: "My Board",
  groups: [
    {
      groupId: 101,
      groupName: "UI/UX Tasks",
      entries: [
        {
          item: "Design Mockups",
          person: "Alice Johnson",
          status: "In Progress",
          date: "2025-01-02",
        },
        {
          item: "Wireframes",
          person: "Alice Johnson",
          status: "Completed",
          date: "2025-01-01",
        },
      ],
    },
    {
      groupId: 102,
      groupName: "Backend Tasks",
      entries: [
        {
          item: "Backend API",
          person: "Bob Smith",
          status: "Completed",
          date: "2025-01-01",
        },
        {
          item: "Database Setup",
          person: "Evan Wright",
          status: "Pending",
          date: "2025-01-05",
        },
      ],
    },
    {
      groupId: 103,
      groupName: "Testing & Deployment",
      entries: [
        {
          item: "User Testing",
          person: "Diana Prince",
          status: "Not Started",
          date: "2025-01-10",
        },
        {
          item: "Deployment",
          person: "Evan Wright",
          status: "In Progress",
          date: "2025-01-08",
        },
      ],
    },
  ],
};
