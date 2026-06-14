function Message({ sender, text }) {
  return (
    <div className={sender === "me" ? "message sent" : "message received"}>
      {text}
    </div>
  );
}

export default Message;
