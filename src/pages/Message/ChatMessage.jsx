import React from "react";

const ChatMessage = () => {
  return (
    <div
      className={`p-1 ${
        true ? "rounded-md" : "px-5 rounded-full"
      } bg-[#191c29] `}
    >
      <p className={`${true ? "py-2" : "py-1"}`}>message</p>
    </div>
  );
};

export default ChatMessage;
