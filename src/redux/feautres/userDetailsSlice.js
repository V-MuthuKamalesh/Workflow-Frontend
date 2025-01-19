const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  workspaces: [],
};

const userDetailsSlice = createSlice({
  initialState,
  name: "userDetails",
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.workspaceId !== action.payload
      );
    },
  },
});

export const { setWorkspaces, addWorkspace, deleteWorkspace } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
