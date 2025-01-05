import { boardInfo } from "@/app/_components/boards/boardData";
import { createSlice } from "@reduxjs/toolkit";

const initialState = boardInfo;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardData: (state, action) => {
      return action.payload;
    },
    editTask: (state, action) => {
      const { groupId, entryIndex, field, value } = action.payload;

      const group = state.groups.find((group) => group.groupId === groupId);

      if (group) {
        group.entries[entryIndex][field] = value;
      }
    },
    addTask: (state, action) => {
      const { groupId, task } = action.payload;

      const group = state.groups.find((g) => g.groupId === groupId);

      if (group) {
        group.entries.push(task);
      }
    },
    addGroup: (state) => {
      const defaultEntryStructure = state.groups[0]?.entries[0] || {
        item: "",
        person: "",
        status: "",
        date: "",
      };

      const newGroup = {
        groupId: Date.now(),
        groupName: `New Group ${state.groups.length + 1}`,
        entries: [
          Object.keys(defaultEntryStructure).reduce((entry, field) => {
            entry[field] = "";
            return entry;
          }, {}),
        ],
      };

      state.groups.push(newGroup);
    },
  },
});

export const { setBoardData, editTask, addTask, addGroup } = boardSlice.actions;
export default boardSlice.reducer;
