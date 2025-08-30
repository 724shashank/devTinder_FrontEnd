import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "userDetails",
  initialState: null,
  reducers: {
    addDetails: (state, action) => {
      return action.payload 
    },
     removeDetails: (state, action) => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { addDetails ,removeDetails} = userSlice.actions;
