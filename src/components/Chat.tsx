import React, { useEffect, useState } from "react";

interface Message {
  sender: string;
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    
    const ws = new WebSocket("ws://localhost:8000/ws");
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message_history") {
        
        setMessages(data.data);
      } else if (data.type === "new_message") {
        
        setMessages((prev) => [...prev, data.data]);
      }
    };

    return () => ws.close(); 
  }, []);

  const sendMessage = () => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      newMessage.trim() &&
      username.trim()
    ) {
      const messageToSend: Message = {
        sender: username,
        content: newMessage,
      };
      socket.send(JSON.stringify(messageToSend));
      setNewMessage("");
    } else {
      console.error("WebSocket não está conectado.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800 text-white">
      <div className="flex-shrink-0 bg-gray-900 p-4">
        <h1 className="text-2xl font-bold">Simple Real-Time Chat</h1>
      </div>

      
      {!username ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Digite seu nome"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 rounded text-white focus:outline-none"
            />
            <button
              onClick={() => usernameInput.trim() && setUsername(usernameInput)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
            >
              Entrar no Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Área de input */}
          <div className="flex-shrink-0 p-4 bg-gray-900">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 bg-gray-700 rounded text-white focus:outline-none"
                placeholder="Digite uma mensagem..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
