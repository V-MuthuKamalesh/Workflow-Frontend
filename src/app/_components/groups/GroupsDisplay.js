"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import { fetchBoardData, setBoardData } from "@/redux/feautres/boardSlice.js";
import { io } from "socket.io-client";
import { fetchBoardsByWorkspaceId } from "@/redux/feautres/workspaceSlice";
import Cookies from "js-cookie";

export default function GroupsDisplay({ module, boardId }) {
  const {
    data: boardData,
    loading,
    error,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const boardType = boardData.type;

  useEffect(() => {
    dispatch(fetchBoardsByWorkspaceId(Cookies.get("workspaceId")));
    dispatch(fetchBoardData(boardId));
  }, [boardId, dispatch]);

  const handleAddGroup = () => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    const newItemTemplate = {
      "work-management": () => ({
        itemName: "item",
        assignedToId: [],
        status: "",
        dueDate: new Date(),
      }),
      crm: {
        Lead: () => ({
          leadName: "New Lead",
          status: "",
          company: "",
          title: "",
          email: "",
          phone: "",
          lastInteraction: "",
        }),
      },
      dev: {
        Bug: () => ({
          bugName: "New Bug",
          reporter: [],
          developer: [],
          priority: "",
          status: "",
        }),
        Sprint: () => ({
          sprintName: "New Sprint",
          sprintGoals: "",
          startDate: new Date(),
          endDate: new Date(),
        }),
      },
      service: {
        Ticket: () => ({
          ticketName: "New Ticket",
          description: "",
          employee: [],
          agent: [],
          priority: "",
          status: "",
          requestType: "",
        }),
      },
    };

    const newItem =
      typeof newItemTemplate[module] === "function"
        ? newItemTemplate[module]()
        : newItemTemplate[module]?.[boardType]?.() || {};

    socket.emit(
      "createItem",
      { item: newItem, type: boardType },
      (response) => {
        if (!response) {
          console.error("Error creating item.");
          return;
        }

        console.log(response);

        const newGroup = {
          groupName: `New Group ${boardData.groups.length + 1}`,
        };

        socket.emit(
          "addGroupToBoard",
          { boardId, group: newGroup, itemId: response.itemId },
          (response) => {
            if (!response) {
              console.error("Error adding group to board.");
              return;
            }

            console.log(response);

            dispatch(setBoardData(response));
          }
        );
      }
    );
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
          <Group
            key={group.groupId}
            module={module}
            boardType={boardType}
            boardId={boardId}
            group={group}
          />
        ))}
      </div>

      <AddGroupButton onAddGroup={handleAddGroup} />
    </div>
  );
}
