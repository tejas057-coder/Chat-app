import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const messages = [
    {
      sender: "me",
      text: "Hello",
    },
    {
      sender: "other",
      text: "Hi",
    },
  ];

  return (
    <div className="chat-window">
      <div className="chat-header">John</div>

      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;
