import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatRoom from "./component/ChatRoom";
import QRCodePage from "./component/QRCodePage";
import ResultPage from "./component/ResultPage";
import { ChatProvider } from "./context/ChatContext";
import QuestionPage from "./component/QuestionPAge";

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QRCodePage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/question" element={<QuestionPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
