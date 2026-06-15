import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  // const roomId = "room1";

  // -----------client side -----------------
  const joinRoom = () => {
    if (!username.trim()) return;
    socket.emit("join_chat", {
      roomId,
      username,
      roomId,
    });
    setJoined(true);
  };

  const leaveRoom = () => {
    socket.emit("leave_chat", roomId);
  };

  const sendMessage = () => {
    socket.emit("send_message", {
      roomId,
      text: message,
      username,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <>
      <h2>Chat App</h2>

      <input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Enter room id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button onClick={joinRoom} disabled={!username || !roomId}>
        Join Room
      </button>

      <button onClick={leaveRoom} disabled={!joined}>
        Leave Room
      </button>

      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <br></br>

     {messages.map((msg, index) => {
  const isOwnMessage = msg.username === username;

  return (
    <div
      key={index}
      className={`chat-message ${isOwnMessage ? "own" : "other"}`}
    >
      <div className="chat-bubble">
        <span className="chat-user">{msg.username}</span>
        <span className="chat-text">{msg.text}</span>
      </div>
    </div>
  );
})}
    </>
  );
}

export default App;
