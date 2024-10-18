import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");
  const [score, setScore] = useState(0);
  const stompClientRef = useRef(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    { question: "What is the boiling point of water?", answer: "100°C" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    { question: "What is the square root of 64?", answer: "8" },
  ];

  useEffect(() => {
    const socket = new SockJS("http://localhost:9090/server1");
    stompClientRef.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);
        console.log("Connected to WebSocket");

        stompClientRef.current.subscribe("/topic/return-to", (response) => {
          const receivedMessage = JSON.parse(response.body);
          setMessages((prevMessages) => [receivedMessage, ...prevMessages]);

          if (receivedMessage.name) {
            setName(receivedMessage.name);
          }
          if (receivedMessage.answer) {
            setAnswerStatus(receivedMessage.answer);
          }
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log("Disconnected from WebSocket");
      },
    });
    stompClientRef.current.activate();

    return () => {
      stompClientRef.current.deactivate();
    };
  }, []);

  const handleLogin = (name) => {
    setName(name);
    localStorage.setItem("name", name);
    stompClientRef.current.publish({
      destination: "/app/message",
      body: JSON.stringify({
        name,
        content: "has joined",
        answer: answerStatus,
      }),
    });
  };

  const handleSubmitAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    setShowAnswer(true);
    setAnswerStatus(isCorrect ? "Correct" : "Wrong");

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
    stompClientRef.current.publish({
      destination: "/app/message",
      body: JSON.stringify({
        name,
        question: questions[currentQuestionIndex].question,
        userAnswer,
        correctAnswer,
        answer: isCorrect ? "Correct" : "Wrong",
      }),
    });
  };

  const moveToNextQuestion = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setAnswerStatus("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const setFinalScore = () => {
    setScore(correctAnswers);
  };

  return (
    <ChatContext.Provider
      value={{
        name,
        messages,
        connected,
        handleLogin,
        questions,
        currentQuestionIndex,
        userAnswer,
        setUserAnswer,
        showAnswer,
        handleSubmitAnswer,
        moveToNextQuestion,
        answerStatus,
        score,
        setFinalScore,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
