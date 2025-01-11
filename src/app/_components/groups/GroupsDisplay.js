"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";

export default function GroupsDisplay({ boardId }) {
  const [boardData, setBoardData] = useState({ groups: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const socket = io("http://localhost:4000/", { transports: ["websocket"] });

  useEffect(() => {
    socket.emit("getBoardById", { boardId }, (response) => {
      setLoading(false);
      if (response.error) {
        setError(response.error);
      } else {
        setBoardData(response);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [boardId]);

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

  const handleAddGroup = () => {
    const newItem = {
      itemName: "item",
      assignedToId: [],
      status: "",
      dueDate: new Date(),
    };

    socket.emit("createItem", { item: newItem }, (response) => {
      console.log("createItem response:", response);
      if (!response) {
        console.error("No response from server.");
        return;
      }

      if (response.error) {
        console.error(response.error);
      } else {
        const newGroup = {
          groupName: `New Group ${boardData.groups.length + 1}`,
          items: [response.itemId],
        };

        socket.emit(
          "addGroupToBoard",
          { boardId, group: newGroup },
          (updatedBoard) => {
            console.log("addGroupToBoard response:", updatedBoard);
            if (!updatedBoard) {
              console.error("No response from server.");
              return;
            }

            if (updatedBoard.error) {
              console.error(updatedBoard.error);
            } else {
              setBoardData(updatedBoard);
            }
          }
        );
      }
    });
  };

  return (
    <div className="px-16 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">
          {boardData.workspaceName} - {boardData.boardName}
        </h1>
        <AddGroupButton handleAddGroup={handleAddGroup} />
      </div>

      <div className="space-y-14">
        {boardData.groups.map((group) => (
          <Group
            key={group.groupId}
            group={group}
            socket={socket}
            setBoardData={setBoardData}
          />
        ))}
      </div>
    </div>
  );
}
