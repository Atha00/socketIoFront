import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "chat message";
const NEW_CONNECTION = "connection";
const SOCKET_SERVER_URL = "https://socketchat-backend.herokuapp.com/";
// const SOCKET_SERVER_URL = "http://localhost:3001";

const useChat = name => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [alertTyping, setAlertTyping] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, { query: { name } });
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
      const incomingMessage = message;
      setMessages(messages => [...messages, incomingMessage]);
    });
    socketRef.current.on(NEW_CONNECTION, message => {
      const incomingMessage = message;
      setMessages(messages => [...messages, incomingMessage]);
    });
    socketRef.current.emit("incoming user");
    socketRef.current.on("added entry to userList", array => {
      setUsers(array);
    });
    socketRef.current.on("user leaving", (msg, array) => {
      const incomingMessage = msg;
      setMessages(messages => [...messages, incomingMessage]);
      setUsers(array);
    });
    socketRef.current.on("is typing", text => {
      setAlertTyping(text);
    });
    socketRef.current.on("clean alert typing", () => {
      setAlertTyping("");
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [name]);

  const sendMessage = messageBody => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, messageBody);
  };
  const tellIfTyping = () => {
    socketRef.current.emit("is typing", alertTyping);
  };
  const removeAlert = () => {
    socketRef.current.emit("clean alert typing", alertTyping);
  };
  const sendingPrivateMessage = id => {
    socketRef.current.emit("send PM", id);
  };
  return {
    messages,
    sendMessage,
    tellIfTyping,
    removeAlert,
    alertTyping,
    sendingPrivateMessage,
    users
  };
};

export default useChat;
