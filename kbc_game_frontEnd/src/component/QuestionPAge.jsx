import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswer,
    setUserAnswer,
    showAnswer,
    handleSubmitAnswer,
    moveToNextQuestion,
    name,
    answerStatus,
    setFinalScore,
    score,
  } = useChat();

  const navigate = useNavigate();

  useEffect(() => {
    if (showAnswer && currentQuestionIndex === questions.length - 1) {
      setFinalScore();
    }
  }, [
    showAnswer,
    currentQuestionIndex,
    navigate,
    questions.length,
    setFinalScore,
  ]);

  const handleAnswerSubmit = () => {
    handleSubmitAnswer();
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        moveToNextQuestion();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 p-5">
      {score === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          {/* Display the question */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {questions[currentQuestionIndex].question}
          </h1>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={showAnswer}
          />

          <button
            onClick={handleAnswerSubmit}
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mb-4 ${
              showAnswer ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={showAnswer}
          >
            Submit Answer
          </button>

          {showAnswer && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                Correct Answer:{" "}
                <strong className="text-green-600">
                  {questions[currentQuestionIndex].answer}
                </strong>
              </p>
            </div>
          )}

          {answerStatus === "Wrong" && (
            <div className="text-center mt-4 p-4 bg-red-100 rounded-lg">
              <h1 className="text-red-600 font-semibold">
                Sorry, {name}! Your answer is wrong!
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            You have completed the test!
          </h1>
          <h1 className="text-xl font-semibold">Your Score is {score}</h1>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
