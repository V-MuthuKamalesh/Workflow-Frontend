import { ArrowRight, SquareChartGantt, Star } from "lucide-react";
import Image from "next/image";
import DeleteBoard from "./DeleteBoard";

export default function BoardCard({ workspaceName, boardName, boardId }) {
  return (
    <div className="max-w-xs border border-gray-300 rounded-md p-4 mb-10 hover:shadow-xl transition duration-100 relative">
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
          <Star />
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
