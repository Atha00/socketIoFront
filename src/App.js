import "./App.css";
import useChat from "./useChat";
import { useState } from "react";

function App() {
  const {
    messages,
    sendMessage,
    tellIfTyping,
    removeAlert,
    alertTyping
  } = useChat();
  // console.log(messages);
  const [newMessage, setNewMessage] = useState("");
  // const [alertTyping, setAlertTyping] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
    removeAlert();
  };

  return (
    <div className="App">
      <ol id="messages-list">
        {messages.map((message, index) => {
          console.log(message);
          return <li key={index}>{message}</li>;
        })}
      </ol>
      {alertTyping && <p className={"is-typing"}>{alertTyping}</p>}
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          autoComplete="off"
          value={newMessage}
          onChange={event => {
            if (event.target.value.length > 0) {
              tellIfTyping();
            } else if (event.target.value.length === 0) {
              removeAlert();
            }
            setNewMessage(event.target.value);
          }}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
