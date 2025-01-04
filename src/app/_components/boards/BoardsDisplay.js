import BoardCard from "./BoardCard";

export default function BoardsDisplay() {
  const boards = [
    {
      id: 1,
      workspaceName: "My Workspace",
      boardName: "My Board",
    },
    {
      id: 2,
      workspaceName: "Acme Inc",
      boardName: "Project X",
    },
    {
      id: 3,
      workspaceName: "Acme Corp",
      boardName: "Project Y",
    },
    {
      id: 4,
      workspaceName: "My Workspace",
      boardName: "My Board",
    },
    {
      id: 5,
      workspaceName: "Acme Inc",
      boardName: "Project X",
    },
  ];

  return (
    <div className="mt-10">
      <h1 className="ml-32 text-xl font-medium">Boards</h1>
      <div className="mt-3 grid grid-cols-3 mx-32">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            boardName={board.boardName}
            workspaceName={board.workspaceName}
          />
        ))}
      </div>
    </div>
  );
}
