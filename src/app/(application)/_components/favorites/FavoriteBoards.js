import BoardCard from "../boards/BoardCard";

export function FavoriteBoards({ module, boards }) {
  if (!boards || boards.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-600">
          Favorite Boards
        </h3>
        <p className="text-sm text-gray-500">
          You have no favorite boards. You can add them using the board card.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-600">Favorite Boards</h3>
      <ul className="mt-3 grid grid-cols-4 gap-4">
        {boards.map(
          ({ boardId, boardName, type, workspaceId, workspaceName }) => (
            <BoardCard
              key={boardId}
              module={module}
              boardId={boardId}
              boardName={boardName}
              boardType={type}
              workspaceId={workspaceId}
              workspaceName={workspaceName}
            />
          )
        )}
      </ul>
    </div>
  );
}
