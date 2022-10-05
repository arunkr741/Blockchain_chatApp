
const app = require("express")();


const server = require("http").createServer(app);
const port = 5000
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const secretKey = 'Arun1046'

io.on("connection", (socket) => {

  io.emit('get_secretKey',secretKey)

  socket.on("chat_user2", (payload) => {
    io.emit("chat_user2", payload);
  });

  socket.on("chat_user1", (payload) => {
 
    io.emit("chat_user1", payload);
  });

});

server.listen(port,()=>{
  console.log("server listening at port 5000")
});

// normal assymmetirc encryption not related to this app

const EncryptRsa = require('encrypt-rsa').default;

const encryptRsa = new EncryptRsa();
const { privateKey, publicKey } = encryptRsa.createPrivateAndPublicKeys();

const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({ 
    text: 'Hello world',   
    publicKey,
  });

const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({
    text: encryptedText,
    privateKey,
  });



  // console.log(encryptedText,);
  // console.log(decryptedText);

