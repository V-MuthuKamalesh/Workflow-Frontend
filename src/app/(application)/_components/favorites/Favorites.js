"use client";

import { FavoriteWorkspaces } from "./FavoriteWorkspaces";
import { FavoriteBoards } from "./FavoriteBoards";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { useDispatch, useSelector } from "react-redux";
import { setBoards, setWorkspaces } from "@/redux/feautres/favoritesSlice";

export default function FavoriteWorkspacesAndBoards({ module }) {
  const { workspaces, boards } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  console.log(boards);

  useEffect(() => {
    socket.emit(
      "getFavourite",
      { userId: Cookies.get("userId"), type: module },
      (response) => {
        if (!response) {
          console.error("Error getting favorite data.");
          return;
        }

        dispatch(setWorkspaces(response.workspaces));
        dispatch(setBoards(response.boards));
      }
    );
  }, [module, dispatch]);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <FavoriteWorkspaces module={module} workspaces={workspaces} />
      <FavoriteBoards module={module} boards={boards} />
    </div>
  );
}
