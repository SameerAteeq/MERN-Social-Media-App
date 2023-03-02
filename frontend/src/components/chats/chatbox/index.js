import React, { useEffect, useRef, useState } from "react";
import { AddMessage, getMessages } from "../../../redux/api/MessageRequest";
import { getUser } from "../../../redux/api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./index.css";

const ChatBox = ({ chat, currentUserId, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const serverPubic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //fetch data for chat header...
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  //Fetch data for Messagess....
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat?._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  //Send Message to database
  const handleSend = async (e) => {
    if (newMessage === "") {
      return;
    }
    e.preventDefault();

    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat?._id,
    };
    const receiverId = chat?.members?.find((id) => id !== currentUserId);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    //send message to database...
    try {
      const { data } = await AddMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  //Recieve message from parent component
  useEffect(() => {
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  //Scroll to last Message...

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="chatbox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? serverPubic + userData?.profilePicture
                      : serverPubic + "defaultProfile.png"
                  }
                  alt="profile img..."
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div className="names" style={{ fontSize: "0.8rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                  <span>{userData?.username}</span>
                </div>
              </div>
            </div>
            <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
          </div>
          <div className="chat-body">
            {messages?.map((message) => (
              <>
                <div
                  ref={scroll}
                  className={
                    message?.senderId === currentUserId
                      ? "message own"
                      : "message"
                  }
                >
                  <span>{message?.text}</span>
                  <span>{format(message?.createdAt)}</span>
                </div>
              </>
            ))}
          </div>

          <div className="chat-sender">
            <div>+</div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              onKeyPress={handleKey}
            />
            <button className="send-button btn" onClick={handleSend}>
              Send
            </button>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
