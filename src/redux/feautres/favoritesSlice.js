const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  workspaces: [],
  boards: [],
};

const favoritesSlice = createSlice({
  initialState,
  name: "favorites",
  reducers: {},
});

export const {} = favoritesSlice.actions;

export default userDetailsSlice.reducer;
