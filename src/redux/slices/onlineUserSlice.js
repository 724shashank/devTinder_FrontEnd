import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
  name: "onlineUser",
  initialState: [],
  reducers: {
    addOnLineUser: (state, action) => {
      
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return state;  
    },

    removeOnlineUser: (state, action) => {
      if (!Array.isArray(state)) return []; // safety check
      return state.filter((id) => id !== action.payload);
    },
  },
});

export default onlineUserSlice.reducer;
export const { addOnLineUser, removeOnlineUser } = onlineUserSlice.actions;
