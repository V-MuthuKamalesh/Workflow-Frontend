"use client";

import { ArrowRight, SquareChartGantt, Star } from "lucide-react";
import Image from "next/image";
import DeleteBoard from "./DeleteBoard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { useDispatch } from "react-redux";
import { removeBoardFromFavorites } from "@/redux/feautres/favoritesSlice";
import Tooltip from "@mui/material/Tooltip";

export default function BoardCard({
  module,
  workspaceId,
  workspaceName,
  boardName,
  boardId,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBoardClick = () => {
    router.push(`/${module}/boards/${boardId}?workspaceId=${workspaceId}`);
  };

  useEffect(() => {
    socket.emit("isBoardInFavourite", { boardId, type: module }, (response) => {
      if (!response) {
        console.error("Error checking if board is in favourite.");
        return;
      }

      console.log(response);

      setIsFavorite(response.isFavourite);
    });
  }, [boardId, module]);

  function toggleFavorite(event) {
    event.stopPropagation();

    setIsFavorite((prev) => !prev);

    socket.emit(
      isFavorite ? "removeBoardFromFavourite" : "addBoardToFavourite",
      { boardId, type: module },
      (response) => {
        if (!response) {
          console.error("Error toggling favorite board.");
          return;
        }

        if (isFavorite) {
          console.log(boardId);
          dispatch(removeBoardFromFavorites(boardId));
        }
      }
    );
  }

  return (
    <div
      className="max-w-xs border border-gray-300 rounded-md p-4 mb-10 hover:shadow-xl transition duration-100 relative cursor-pointer"
      onClick={handleBoardClick}
    >
      <Image
        className="rounded-md"
        src={"/board.webp"}
        alt="board"
        height={500}
        width={500}
        priority
      />

      <div className="flex flex-col space-y-3 mt-2 ml-2">
        <h1 className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SquareChartGantt />
            <span>{boardName}</span>
          </div>
          <Tooltip
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <button onClick={toggleFavorite} className="focus:outline-none">
              {isFavorite ? (
                <Star fill="yellow" className="text-yellow-500" />
              ) : (
                <Star />
              )}
            </button>
          </Tooltip>
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span>Workspace</span> <ArrowRight /> <span>{workspaceName}</span>
          </div>
          <Tooltip title="Delete Board">
            <div>
              <DeleteBoard workspaceId={workspaceId} boardId={boardId} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
