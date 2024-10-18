import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";

const ChatRoom = () => {
  const [name, setName] = useState("");
  const { handleLogin } = useChat();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      handleLogin(name);
      navigate("/question");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Join the Game
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-500 transition duration-200"
          >
            Play Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
