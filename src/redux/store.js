import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionReducer from "./slices/connnectionSlice"
import pendingReqReducer from "./slices/pendingRequestSlice"
import onlineUserReducer from "./slices/onlineUserSlice";

const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connection:connectionReducer,
    requests:pendingReqReducer,
    onlineUser: onlineUserReducer
  },
});

export default reduxStore;
