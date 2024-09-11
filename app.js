const express = require("express");
const { connection } = require("./config/connectDb");
const { connectMqtt, client } = require("./config/connectMqtt");
const app = express();
const port = 9999;
connection();
connectMqtt();
const statusLight = "home/light";
const statusFan = "home/fan";
const statusAirConditioner = "home/air_conditioner";

const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// // phải code lại tại cần sử dụng socket io để gửi dữ liệu từ server về client
// let sensorData = null;
// client.on("message", (topic, message) => {
//   if (topic === "home/sensor") {
//     sensorData = message.toString();
//     console.log(`Dữ liệu nhận được từ topic ${topic}: ${sensorData}`);
//   }
// });
// app.get("/api/get_data_sensor", (req, res) => {
//   if (sensorData) {
//     res.json({
//       status: "success",
//       data: sensorData,
//     });
//   } else {
//     res.json({
//       status: "error",
//       message: "Chưa có dữ liệu sensor",
//     });
//   }
// });

//
app.post("/api/send_status", (req, res) => {
  const { status, topic, message } = req.body;
  if (status) {
    client.publish(topic, message);
    // res.json({
    //   status: "success",
    //   message: "Gửi dữ liệu thành công",
    // });
    console.log(`Gửi dữ liệu thành công tới topic ${topic}: ${message}`);
  } else {
    // res.json({
    //   status: "error",
    //   message: "Chưa có dữ liệu sensor",
    // });
    return;
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
