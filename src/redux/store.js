import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connnectionSlice"
import pendingReqReducer from "./slices/pendingRequestSlice"
const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connection:connectionReducer,
    requests:pendingReqReducer
  },
});

export default reduxStore;
