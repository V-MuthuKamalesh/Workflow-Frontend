import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./feautres/boardSlice";
import workspaceReducer from "./feautres/workspaceSlice";
import favoritesReducer from "./feautres/favoritesSlice";
import userDetailsReducer from "./feautres/userDetailsSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    workspace: workspaceReducer,
    favorites: favoritesReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
