import React  from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat_styles.css";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';

const socket = io.connect("http://localhost:5000");

function Chat_user2() {
    
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [secretKey,setSecretKey] = useState(null)

    useEffect(() => {
        console.log("connection made");
        socket.on("get_secretKey", (payload) => {
            // console.log("get_secretKey", payload);
            setSecretKey(prev => payload)
        });
          
    }, []);
    
    const sendChat = (e) => {
        e.preventDefault();
        if (!secretKey || !message){
            return
        }
        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
        socket.emit("chat_user2",  ciphertext );  
        setMessage("");
    };

    useEffect(() => {
        socket.on("chat_user1", (payload) => {
            // Decrypt
            console.log(secretKey)
            if(!secretKey){
                return
            }
            const bytes  = CryptoJS.AES.decrypt(payload, secretKey);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            setChat([...chat, originalText]);
           
            console.log("chat payload", payload);
        });
    }, [secretKey,chat]);
  
    return (
      <div >
        <h2 className="user_title">User 2</h2>
        <div className="chat_body">
            {chat.map((payload, index) => {
            return <p className="message" key={index}>{payload} </p>;
            })}
        </div>
        <div className="bottm_cont">
            <form onSubmit={sendChat}>
            <input
                value={message}
                type="text"
                placeholder="send Text"
                name="chat"
                className="input"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="sendBtn" type="submit">send</button>
            </form>
        </div>
      </div>    
    );
  }
  
  export default Chat_user2;
  