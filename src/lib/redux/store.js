import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./feautures/boardSlice.js";

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;
