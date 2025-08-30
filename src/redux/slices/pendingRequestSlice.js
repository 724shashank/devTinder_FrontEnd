import { createSlice } from "@reduxjs/toolkit";
const pendingRequestSlice = createSlice({
  name: "pendingRequest",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },

    removeRequest: (state, action) => {
      const updatedData = state.filter((req) => req._id != action.payload);
      return updatedData;
    },
  },
});

export default pendingRequestSlice.reducer;
export const { addRequests, removeRequest } = pendingRequestSlice.actions;
