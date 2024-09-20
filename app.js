const express = require("express");
const { connection } = require("./config/connectDb");
const { connectMqtt } = require("./config/connectMqtt");
const apiRouter = require("./router/index.router");
const app = express();
connection();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (msg) => {
    console.log("Message received from client: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
connectMqtt(io);
apiRouter(app);
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    `Socket server is running on port 9999 ${process.env.SERVER_HOST}`
  );
});
