"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import { fetchBoardData, setBoardData } from "@/redux/feautres/boardSlice.js";
import { io } from "socket.io-client";

export default function GroupsDisplay({ boardId }) {
  const {
    data: boardData,
    loading,
    error,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardData(boardId));
  }, [boardId, dispatch]);

  const handleAddGroup = () => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    const newItem = {
      itemName: "item",
      assignedToId: [],
      status: "",
      dueDate: new Date(),
    };

    socket.emit("createItem", { item: newItem }, (response) => {
      if (!response) {
        console.error("Error creating item.");
        return;
      }

      const newItemId = response.itemId;
      const newGroup = {
        groupName: `New Group ${boardData.groups.length + 1}`,
        items: [newItemId],
      };

      socket.emit(
        "addGroupToBoard",
        { boardId, group: newGroup },
        (response) => {
          if (!response) {
            console.error("Error adding group to board.");
            return;
          }

          dispatch(setBoardData(response));
        }
      );
    });
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
    <div className="px-16 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">
          {boardData.workspaceName} - {boardData.boardName}
        </h1>
      </div>

      <div className="space-y-14">
        {boardData.groups.map((group) => (
          <Group key={group.groupId} boardId={boardId} group={group} />
        ))}
      </div>

      <AddGroupButton onAddGroup={handleAddGroup} />
    </div>
  );
}
