import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    updateBoardName: (state, action) => {
      state.data.boardName = action.payload;
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
    removeItemFromGroup: (state, action) => {
      const group = state.data.groups.find((group) => {
        return group.groupId === action.payload.groupId;
      });

      if (group) {
        const itemIndex = group.items.findIndex((item) => {
          return item.itemId === action.payload.itemId;
        });

        if (itemIndex !== -1) {
          group.items.splice(itemIndex, 1);
        }
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
  updateBoardName,
  addGroup,
  updateGroup,
  addItemToGroup,
  removeItemFromGroup,
  updateTaskField,
} = boardSlice.actions;

export default boardSlice.reducer;
