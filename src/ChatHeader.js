import React from "react";
import "./ChatHeader.css";

const ChatHeader = () => {
  return (
    <div className="card-header msg_head">
      <div className="d-flex bd-highlight">
        <div className="img_logo">
          <img
            src="https://imgs.search.brave.com/IJvzVUU4gVyCA6ua0LXC3HFpHURoykICDagzRDALySI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzdmLzJh/LzgxLzdmMmE4MTdl/YTBkMzBhZTQ3Mjc1/ZDc2NDc2NDkyOTk0/LmpwZw"
            className="rounded-circle user_img"
            alt="User"
          />
          <span className="online_icon"></span>
        </div>
        <div className="brand_info">
          <span className="brand_title">Mercedes Chatbot</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

