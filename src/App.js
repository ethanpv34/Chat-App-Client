import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://chat-app-ethan-backend.herokuapp.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const leaveRoom = () => {
    setShowChat(false);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 className="chat-app-title">Chat App</h3>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} leaveRoom={leaveRoom}/>
      )}
    </div>
  );
}

export default App;