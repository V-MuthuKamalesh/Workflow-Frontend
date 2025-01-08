import BoardCard from "../boards/BoardCard";

export function FavoriteBoards({ boards }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-600">Favorite Boards</h3>
      <ul className="mt-3 grid grid-cols-4">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            boardName={board.boardName}
            workspaceName={board.workspaceName}
          />
        ))}
      </ul>
    </div>
  );
}
