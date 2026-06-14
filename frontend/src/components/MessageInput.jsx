import { useState } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <div className="input-area">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
