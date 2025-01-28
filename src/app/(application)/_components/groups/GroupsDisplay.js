"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import {
  fetchBoardData,
  updateBoardName,
} from "@/redux/feautres/boardSlice.js";
import { fetchBoardsByWorkspaceId } from "@/redux/feautres/workspaceSlice";
import useCheckUserRole from "../../hooks/useCheckUserRole";
import Cookies from "js-cookie";
import GoBackButton from "../UI/GoBackButton";
import { Download } from "lucide-react";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { handleExportBoard } from "@/app/_utils/helpers/helper";
import { CustomTooltip } from "../UI/CustomTooltip";

const saveBoardName = (boardId, boardName, dispatch) => {
  socket.emit(
    "updateBoardInWorkspace",
    { boardId, updateData: { boardName } },
    (response) => {
      if (response) {
        dispatch(updateBoardName(response.boardName));
      } else {
        console.error("Error updating board name.");
      }
    }
  );
};

export default function GroupsDisplay({ module, workspaceId, boardId }) {
  const dispatch = useDispatch();
  const {
    data: boardData,
    loading,
    error,
  } = useSelector((state) => state.board);
  const [editingBoardName, setEditingBoardName] = useState(false);
  const [boardName, setBoardName] = useState(boardData.boardName);
  const { type: boardType } = boardData;
  const { isAdmin } = useCheckUserRole(Cookies.get("userId"), workspaceId);

  useEffect(() => {
    dispatch(fetchBoardsByWorkspaceId(workspaceId));
    dispatch(fetchBoardData(boardId));
  }, [workspaceId, boardId, dispatch]);

  useEffect(() => {
    if (boardData.boardName) {
      setBoardName(boardData.boardName);
    }
  }, [boardData.boardName]);

  const handleBoardNameChange = (event) => setBoardName(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveBoardName(boardId, boardName, dispatch);
      setEditingBoardName(false);
    }
  };

  const handleBlur = () => {
    saveBoardName(boardId, boardName, dispatch);
    setEditingBoardName(false);
  };

  if (loading) {
    return (
      <div className="text-gray-500 ml-32 text-lg italic pt-7 flex items-center justify-center">
        Loading Groups...
      </div>
    );
  }

  if (error) {
    return <div className="ml-32 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 px-16 py-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <GoBackButton />

        <div className="flex items-center space-x-4">
          {editingBoardName && isAdmin ? (
            <input
              type="text"
              value={boardName}
              onChange={handleBoardNameChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="text-center px-2 bg-transparent text-3xl font-extrabold text-indigo-600 focus:outline-none focus:ring focus:ring-indigo-400 focus:rounded-md"
              autoFocus
            />
          ) : (
            <div className="relative group">
              <h1
                onClick={() => isAdmin && setEditingBoardName(true)}
                className={`text-3xl font-extrabold ${
                  isAdmin
                    ? "text-indigo-600 cursor-pointer border border-transparent rounded-md hover:border-gray-400"
                    : "text-gray-400"
                } px-2 py-1 transition`}
              >
                {boardName}
              </h1>
              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {isAdmin
                  ? "Click to edit the board name"
                  : "Only admins can edit the board name"}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <CustomTooltip text="Download the board .xlsx">
            <button
              onClick={() => handleExportBoard(boardData)}
              className="p-2 rounded-md bg-gray-500 text-white"
            >
              <Download className="w-5 h-5" />
            </button>
          </CustomTooltip>
          <AddGroupButton module={module} isAdmin={isAdmin} />
        </div>
      </div>

      <div className="space-y-8">
        {boardData.groups.map((group) => (
          <div
            key={group.groupId}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
          >
            <Group
              module={module}
              boardType={boardType}
              boardId={boardId}
              group={group}
              isAdmin={isAdmin}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
