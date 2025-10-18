import { io } from "socket.io-client";
import { baseURL } from "./constants";

let socket;

export const createSocketConnection = () => {
  if(!socket){
    socket = io(baseURL, {
    withCredentials: true, // send cookies
  });
  }
   return socket ;
};
