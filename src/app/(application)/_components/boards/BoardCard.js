"use client";

import { ArrowRight, Star, BarChartHorizontal } from "lucide-react";
import Image from "next/image";
import DeleteBoard from "./DeleteBoard";
import { useRouter } from "next/navigation";
import TooltipButton from "../UI/TooltipButton";
import useFavoriteStatus from "../../hooks/useFavoriteStatus";

export default function BoardCard({ module, workspaceId, workspaceName, boardId, boardName }) {
  const { isFavorite, toggleFavorite } = useFavoriteStatus(boardId, module);
  const router = useRouter();

  const handleBoardClick = () => {
    router.push(`/${module}/boards/${boardId}?workspaceId=${workspaceId}`);
  };

  return (
    <div
      className="max-w-xs border border-gray-300 rounded-md p-4 mb-10 hover:shadow-lg transition duration-200 relative cursor-pointer"
      onClick={handleBoardClick}
    >
      <Image className="rounded-md" src="/board.webp" alt="board" height={500} width={500} priority />

      <div className="flex flex-col space-y-2 mt-2 ml-2">
        <h1 className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChartHorizontal className="text-gray-600" />
            <span>{boardName}</span>
          </div>
          <TooltipButton
            onClick={toggleFavorite}
            tooltipText={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            isActive={isFavorite}
            activeClass="text-yellow-500"
          >
            <Star fill={isFavorite ? "yellow" : "none"} className={isFavorite ? "text-yellow-500" : "text-gray-600"} />
          </TooltipButton>
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span>Workspace</span> <ArrowRight /> <span>{workspaceName}</span>
          </div>
          <TooltipButton onClick={(e) => e.stopPropagation()} tooltipText="Delete Board">
            <DeleteBoard workspaceId={workspaceId} boardId={boardId} />
          </TooltipButton>
        </div>
      </div>
    </div>
  );
}
