import BoardCard from "../boards/BoardCard";

export function FavoriteBoards({ module, boards }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-600">Favorite Boards</h3>
      {boards.length === 0 && (
        <p className="text-sm text-gray-500">
          You have no favorite boards. You can add them using board card.
        </p>
      )}
      <ul className="mt-3 grid grid-cols-4">
        {boards.map((board) => (
          <BoardCard
            key={board.boardId}
            module={module}
            boardId={board.boardId}
            boardName={board.boardName}
            workspaceId={board.workspaceId}
            workspaceName={board.workspaceName}
          />
        ))}
      </ul>
    </div>
  );
}
