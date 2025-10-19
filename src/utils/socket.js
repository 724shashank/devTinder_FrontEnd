import { io } from "socket.io-client";
import { baseURL } from "./constants";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    if (baseURL === "http://localhost:3000") {
      // Local development
      socket = io(baseURL, {
        withCredentials: true, // send cookies
      });
    } else {
      // Production (e.g., deployed on Render + Vercel)
      socket = io("/", {
        path: "/api/socket.io",
        withCredentials: true,
      });
    }
  }

  return socket;
};
