"use client";

import { ArrowRight, SquareChartGantt, Star } from "lucide-react";
import Image from "next/image";
import DeleteBoard from "./DeleteBoard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function BoardCard({
  module,
  workspaceName,
  boardName,
  boardId,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleBoardClick = () => {
    router.push(`/${module}/boards/${boardId}`);
  };

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("isBoardInFavourite", { boardId, type: module }, (response) => {
      if (!response) {
        console.error("Error checking if board is in favourite.");
        return;
      }

      setIsFavorite(response.isFavourite);
    });
  }, [boardId, module]);

  function toggleFavorite(event) {
    event.stopPropagation();

    setIsFavorite((prev) => !prev);

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      isFavorite ? "removeBoardFromFavourite" : "addBoardToFavourite",
      { boardId, type: module },
      (response) => {
        console.log(response);
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
          <button onClick={toggleFavorite} className="focus:outline-none">
            {isFavorite ? (
              <Star fill="yellow" className="text-yellow-500" />
            ) : (
              <Star />
            )}
          </button>
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span>Workspace</span> <ArrowRight /> <span>{workspaceName}</span>
          </div>
          <DeleteBoard boardId={boardId} />
        </div>
      </div>
    </div>
  );
}
