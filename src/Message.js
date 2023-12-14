import React, { useState, useEffect, useCallback } from "react";
import "./Message.css";
import InputField from "./InputField";
import ChatMessage from "./ChatMessage";
import SocketIO from "socket.io-client";

const socket = SocketIO.io("http://localhost:8000");

const Message = () => {
  const [messages, setMessages] = useState([{text: "Hello! I'm your Mercedes assistant here to assist you in finding the perfect Mercedes car for your needs. Whether you're exploring models, checking availability, or seeking detailed information, feel free to say Hi to get started!"
    , isSent:false,userImage:"https://imgs.search.brave.com/IJvzVUU4gVyCA6ua0LXC3HFpHURoykICDagzRDALySI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdmLzJh/LzgxLzdmMmE4MTdl/YTBkMzBhZTQ3Mjc1/ZDc2NDc2NDkyOTk0/LmpwZw"},
  ]);

  console.log(messages);

  useEffect(() => {
    // Load conversation history from local storage
    const storedMessages = localStorage.getItem("chatHistory");

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save conversation history to local storage whenever it changes
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const onReceiveMessage = useCallback((message) => {
    const newMessage = {
      text: typeof message === 'string' ? message : message.answer,
      isSent: false,
      userImage:
        "https://imgs.search.brave.com/IJvzVUU4gVyCA6ua0LXC3HFpHURoykICDagzRDALySI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdmLzJh/LzgxLzdmMmE4MTdl/YTBkMzBhZTQ3Mjc1/ZDc2NDc2NDkyOTk0/LmpwZw",
      time: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  }, []);

  const onConnect = useCallback(() => {
    console.log("CONNECTED");
  }, [])

  useEffect(() => {
    socket.on("connect", onConnect);

    socket.on("message", onReceiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('message', onReceiveMessage)
    }
  }, [onConnect, onReceiveMessage]);

  const handleMessageSend = (text) => {
    if (text.trim() === "") return;

    const newMessage = {
      text,
      isSenderSide: true,
      userImage:
        "https://imgs.search.brave.com/nurcwwus2O-qQYwSVW_wPaZeMuk1gw4tTpDkdtjXCM0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNzE4/MjYxL3BleGVscy1w/aG90by03MTgyNjEu/anBlZz9hdXRvPWNv/bXByZXNzJmNzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw"
        ,
      time: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();

    // Emit a chatMessage event to the server
    socket.emit("message", text);
  };

  const scrollToBottom = () => {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  };

  return (
    <>
      <div className="card-body msg_card_body" id="chat-window">
        <ul className="messages">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              isSenderSide={message.isSenderSide}
              message={message.text}
              time={message.time}
              userImage={message.userImage}
            />
          ))}
        </ul>
      </div>
      <InputField onMessageSend={handleMessageSend} />
    </>
  );
};

export default Message;
