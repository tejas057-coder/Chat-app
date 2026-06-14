function Sidebar() {
  const users = ["John", "Alice", "Bob", "Charlie"];

  return (
    <div className="sidebar">
      <h2>Chats</h2>

      {users.map((user) => (
        <div key={user} className="chat-item">
          {user}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;



