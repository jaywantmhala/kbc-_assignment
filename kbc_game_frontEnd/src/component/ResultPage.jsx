import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext";

const ResultPage = () => {
  const { name, answerStatus, score } = useChat();

  useEffect(() => {
    console.log("Answer Status:", answerStatus);
    console.log(name);
  }, [answerStatus, name]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        {answerStatus === "Correct" ? (
          <h1 className="text-2xl font-bold text-green-600">
            Congratulations, {name}! Your answer is correct!
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-green-600">
            Welcome, {name}!
          </h1>
        )}
      </div>
      {score > 0 ? <div>{score}</div> : null}
    </div>
  );
};

export default ResultPage;
