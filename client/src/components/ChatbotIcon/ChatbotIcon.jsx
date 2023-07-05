import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatbotIcon.css";

const ChatbotIcon = () => {
  const navigate = useNavigate();
  return (
    <div className="chatbot-container">
      <button
        type="button"
        onClick={() => {
          navigate("/GPT");
        }}
        className="chatbot-btn"
      >
        Have Doubts? Click Me!
      </button>
    </div>
  );
};

export default ChatbotIcon;
