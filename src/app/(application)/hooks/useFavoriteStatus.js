"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import {
  addBoardToFavorites,
  removeBoardFromFavorites,
} from "@/redux/feautres/favoritesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useFavoriteStatus(boardId, module) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("isBoardInFavourite", { boardId, type: module }, (response) => {
      if (!response) {
        console.error("Error checking if board is in favourites.");
      }

      setIsFavorite(response.isFavourite);
    });
  }, [boardId, module]);

  const toggleFavorite = (event) => {
    event.stopPropagation();

    socket.emit(
      isFavorite ? "removeBoardFromFavourite" : "addBoardToFavourite",
      { boardId, type: module },
      (response) => {
        if (!response) {
          console.error("Error toggling favorite board.");
          return;
        }

        if (isFavorite) {
          dispatch(removeBoardFromFavorites(boardId));
        } else {
          dispatch(
            addBoardToFavorites({
              boardId,
              type: module,
            })
          );
        }

        setIsFavorite((prev) => !prev);
      }
    );
  };

  return { isFavorite, toggleFavorite };
}
