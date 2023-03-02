import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "../../components/leftSide/logoSearch";
import { useSelector } from "react-redux";
import "./chat.css";
import { userChatsApi } from "../../redux/api/ChatRequest";
import Converations from "../../components/chats/coversation";
import NavIcons from "../../components/rightSide/navIcons";
import ChatBox from "../../components/chats/chatbox";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  //Get the chat in chat section...
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await userChatsApi(user?._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [user]);

  //Connect to socket io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Get message from socket server...
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  //Online checking...

  const checkOnlineUser = (chat) => {
    const chatMember = chat?.members?.find((member) => member !== user?._id);
    const online = onlineUsers?.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      <div className="chat-left">
        <LogoSearch />
        <div className="chatContainer">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats?.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Converations
                  data={chat}
                  currentUserId={user?._id}
                  online={checkOnlineUser(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chat-right">
        <div className="chat-nav">
          <NavIcons />
        </div>

        <ChatBox
          chat={currentChat}
          currentUserId={user?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
