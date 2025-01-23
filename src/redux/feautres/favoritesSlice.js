const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  workspaces: [],
  boards: [],
};

const favoritesSlice = createSlice({
  initialState,
  name: "favorites",
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoardToFavorites: (state, action) => {
      state.boards.push(action.payload);
    },
    removeBoardFromFavorites: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.boardId !== action.payload
      );
    },
  },
});

export const {
  setBoards,
  setWorkspaces,
  addBoardToFavorites,
  removeBoardFromFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
