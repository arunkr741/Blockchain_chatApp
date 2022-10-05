import "./App.css";
import { useState, useEffect }  from "react";
import React  from "react";
import io from "socket.io-client";
import Chat_user1 from "./Chat_container/Chat_user1";
import Chat_user2 from "./Chat_container/chat_user2";



function App() {

  return (
    <div className="App">
      <h1>E2EE Chat app</h1>
      <div className="HIW" >How it works: </div>
      <div className="text">It's a Symmetric, End-to-End Encrypted chat app built with CryptoJS and Socket.io</div>
      <div className="chat_cont">
          <div className="user_chat">
            <Chat_user1 key={1}/>
          </div>
          <div className="user_chat">
            <Chat_user2 key={2}/>
          </div>
      </div>
    </div>
  );
}

export default App;
