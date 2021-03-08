import React from "react";
/* import "./style.css"; */

import useChat from "./useChat";
import { useState } from "react";
import { Link } from "react-router-dom";

function PrivateRoom(props) {
  console.log(props);
  const { name } = props.match.params;

  const {
    messages,
    sendMessage,
    tellIfTyping,
    removeAlert,
    alertTyping,
    users
  } = useChat(name);

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
    removeAlert();
  };

  return (
    <div className="chat-room">
      <div>
        {users.map((elem, index) => {
          return (
            <Link to={"/private/" + name} target="_blank">
              <p key={index}>{elem.name}</p>
            </Link>
          );
        })}
      </div>
      <div>
        <ol id="messages-list">
          {messages.map((message, index) => {
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
    </div>
  );
}

export default PrivateRoom;
