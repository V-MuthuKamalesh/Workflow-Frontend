import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const { io } = require("socket.io-client");

const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export const fetchBoardData = createAsyncThunk(
  "board/fetchBoardData",
  async (boardId, { rejectWithValue }) => {
    return new Promise((resolve) => {
      socket.emit("getBoardById", { boardId }, (response) => {
        if (response.error) {
          return rejectWithValue(response.error);
        }

        console.log(response);

        resolve(response);
      });
    });
  }
);

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    data: { groups: [] },
    loading: true,
    error: false,
  },
  reducers: {
    setBoardData: (state, action) => {
      state.data = action.payload;
    },
    addGroup: (state, action) => {
      state.data.groups.push(action.payload.newGroup);
    },
    updateGroup: (state, action) => {
      const groupIndex = state.data.groups.findIndex((group) => {
        return group.groupId === action.payload.groupId;
      });

      if (groupIndex !== -1) {
        state.data.groups[groupIndex] = {
          ...state.data.groups[groupIndex],
          ...action.payload.updateData,
        };
      }
    },
    addItemToGroup: (state, action) => {
      const group = state.data.groups.find((group) => {
        return group.groupId === action.payload.groupId;
      });

      if (group) {
        group.items.push(action.payload.item);
      }
    },
    updateTaskField: (state, action) => {
      const { taskId, field, value } = action.payload;

      for (const group of state.data.groups) {
        const task = group.items.find((item) => {
          return item.itemId === taskId;
        });

        if (task) {
          task[field] = value;
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setBoardData,
  addGroup,
  updateGroup,
  addItemToGroup,
  updateTaskField,
} = boardSlice.actions;

export default boardSlice.reducer;
