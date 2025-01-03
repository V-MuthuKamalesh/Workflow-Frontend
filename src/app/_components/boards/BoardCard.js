import { SquareChartGantt, Star } from "lucide-react";
import Image from "next/image";

export default function BoardCard({ workspaceName, boardName }) {
  return (
    <div className="max-w-sm border border-gray-300 rounded-md p-4 mb-10 hover:shadow-lg transition duration-100">
      <Image
        className="rounded-md"
        src={"/board.webp"}
        alt="board"
        height={500}
        width={500}
      />
      <div className="flex flex-col space-y-1 mt-2 ml-2">
        <h1 className="text-lg font-medium flex items-center justify-between">
          <div className="flex item-center space-x-2">
            <SquareChartGantt />
            <span>{boardName}</span>
          </div>
          <Star />
        </h1>
        <p>
          Workspace {"->"} {workspaceName}
        </p>
      </div>
    </div>
  );
}
