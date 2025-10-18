import { IoSend } from "react-icons/io5";
import { createSocketConnection } from "../utils/socket";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import axios from "axios";
import { baseURL } from "../utils/constants";
import SpeedDail from "./SpeedDail";
import Avatar from "./Avatar";
import {addOnLineUser,removeOnlineUser} from "../redux/slices/onlineUserSlice";

const Chat = () => {
  const [socket] = useState(() => createSocketConnection());
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);
  const user = useSelector((store) => store?.user);
  const { targetId } = useParams();
  const [online, setOnline] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((store) => store.onlineUser);

  const userId = user?._id;
  const sendMessage = () => {
    socket.emit("sendMessage", {
      userId,
      targetId,
      firstName: user?.firstName,
      text: newMessage,
    });
    setNewMessage("");
  };

  const fetchChat = async () => {
    const res = await axios.get(baseURL + `/chat/${targetId}`, {
      withCredentials: true,
    });

    

    const chatMessages = res?.data?.message?.map((ms) => ({
      userId: ms.senderID._id,
      senderName: ms.senderID.firstName,
      message: ms.text,
    }));

    setMessage((message) => [...message, ...chatMessages]);
  };

  useEffect(() => {
    fetchChat();

    if (!userId) {
      return;
    }

    socket.emit("joinChat", { firstname: user?.firstName, userId, targetId });

    socket.on("messageRecieved", ({ firstName, text, userId }) => {
      setMessage((message) => [
        ...message,
        { userId: userId, senderName: firstName, message: text },
      ]);
    });

    socket.on("usersInRoom", (currentlyOnline) => {
      console.log(currentlyOnline);
      dispatch(addOnLineUser(currentlyOnline));
    });

    socket.on("userOffline", ({ userId }) => {
      setOnline(false);
      console.log("offline", userId);
      dispatch(removeOnlineUser(userId));
    });

    return () => {
      socket.off("messageRecieved");
      socket.off("userOnline");
      socket.emit("breakSocket", { userId });
    };
  }, [userId, targetId, dispatch, socket, user?.firstName]);

  useEffect(() => {
    setOnline(status.includes(targetId));
  }, [status, targetId]);

  return (
    <>
      <div className="flex justify-center items-start min-h-screen">
        <div className="m-2 w-full sm:w-6/12 border rounded-2xl bg-box">
          <Avatar reciever={targetId} online={online} />

          <div className="rounded-l border-b p-5 h-[60vh] sm:h-[70vh] overflow-y-auto">
            {message.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.userId === userId ? "chat chat-end" : "chat chat-start"
                }
              >
                <div className="chat-header">
                  {msg.senderName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div
                  className={
                    msg.userId === userId
                      ? "chat-bubble bg-[#605DFF]"
                      : "chat-bubble bg-[#F43098]"
                  }
                >
                  {msg.message}
                </div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            ))}
          </div>

          {/* Input + buttons */}
          <div className="border-t">
            <div className="flex items-center gap-3 m-2 sm:m-3">
              {/* Input */}
              <input
                className="flex-1 h-12 border rounded-4xl px-4 sm:px-6 text-base sm:text-xl"
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />

              {/* Send button */}
              <button
                className="text-white text-3xl hover:text-[#F43098]"
                onClick={sendMessage}
              >
                <IoSend />
              </button>

              {/* SpeedDial */}
              <SpeedDail />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
