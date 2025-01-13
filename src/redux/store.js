import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./feautres/boardSlice";
import workspaceReducer from "./feautres/workspaceSlice";

const store = configureStore({
  reducer: {
    board: boardReducer,
    workspace: workspaceReducer,
  },
});

export default store;
