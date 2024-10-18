import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";

const QRCodePage = () => {
  const { name, connected } = useChat();
  const navigate = useNavigate();
  const qrValue = "http://192.168.179.233:5173/chat";

  useEffect(() => {
    console.log("Connected:", connected);
    console.log("Current name:", name);

    if (name && connected) {
      console.log("Navigating to result with name:", name);
      navigate("/result");
    }
  }, [name, connected, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Scan the QR code to join the chat
        </h3>
        <div className="flex justify-center mb-4">
          <QRCode value={qrValue} size={200} />
        </div>
        <p className="text-gray-600 mb-4">Use the link below:</p>
        <a
          href={qrValue}
          className="text-blue-500 underline"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = qrValue;
          }}
        >
          {qrValue}
        </a>
        <p className="text-gray-600 mt-2">
          If this link does not work on mobile, just open it in another tab.
        </p>
        <p className="text-gray-600 mt-2">
          You have to enter your laptop's IP address.
        </p>
        <p className="text-gray-600 mt-2">
          Share this link with your friends to connect and chat!
        </p>
      </div>
    </div>
  );
};

export default QRCodePage;
