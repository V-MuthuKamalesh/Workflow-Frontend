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
    const newGroup = {
      groupId: Date.now().toString(),
      groupName: `New Group ${boardData.groups.length + 1}`,
      items: [{ itemName: "", assignedToId: [], status: "", dueDate: "" }],
    };

    setBoardData((prev) => ({
      ...prev,
      groups: [...prev.groups, newGroup],
    }));
  };

  return (
    <div className="px-16 py-8">
      <h1 className="text-2xl font-bold mb-5">
        {boardData.workspaceName} - {boardData.boardName}
      </h1>
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
      <AddGroupButton handleAddGroup={handleAddGroup} />
    </div>
  );
}
