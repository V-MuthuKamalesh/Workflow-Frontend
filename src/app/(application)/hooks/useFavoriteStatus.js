"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { addBoardToFavorites, removeBoardFromFavorites } from "@/redux/feautres/favoritesSlice";

export default function useFavoriteStatus(boardId, module) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const fetchFavoriteStatus = useCallback(() => {
    if (!boardId || !module) return;

    socket.emit("isBoardInFavourite", { boardId, type: module }, (response) => {
      if (response) {
        setIsFavorite(response.isFavourite);
      } else {
        console.error("Error checking if board is in favourites.");
      }
    });
  }, [boardId, module]);

  useEffect(() => {
    fetchFavoriteStatus();
  }, [fetchFavoriteStatus]);

  const toggleFavorite = useCallback(
    (event) => {
      event?.stopPropagation();
      const action = isFavorite ? "removeBoardFromFavourite" : "addBoardToFavourite";

      socket.emit(action, { boardId, type: module }, (response) => {
        if (!response) {
          console.error("Error toggling favorite board.");
          return;
        }

        dispatch(isFavorite ? removeBoardFromFavorites(boardId) : addBoardToFavorites({ boardId, type: module }));
        setIsFavorite((prev) => !prev);
      });
    },
    [isFavorite, boardId, module, dispatch]
  );

  return { isFavorite, toggleFavorite };
}
