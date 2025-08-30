import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"userFeed",
    initialState:null,
    reducers:{
        getFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            return null;
        },
        removeUserFromFeed:(state,action)=>{
            const updatedFeed = state.filter((user)=>user._id != action.payload);
            return updatedFeed;
        },
    }
})

export default feedSlice.reducer;
export const {getFeed,removeFeed,removeUserFromFeed} = feedSlice.actions;