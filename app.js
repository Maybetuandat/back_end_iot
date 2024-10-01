const express = require("express");
const { connection } = require("./config/connectDb");
const { connectMqtt } = require("./config/connectMqtt");
const apiRouter = require("./router/index.router");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

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
function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2); // Lấy giá trị thập phân 2 chữ số
}

setInterval(() => {
  // Tạo ra các giá trị ngẫu nhiên cho temperature, humidity, và light level
  const temp = getRandomValue(20, 30); // Ví dụ khoảng 20 - 30 độ C
  const humidity = getRandomValue(40, 60); // Ví dụ khoảng 40% - 60%
  const light_level = getRandomValue(100, 1000); // Ví dụ khoảng 100 - 1000 lumen
  
  // Phát (emit) dữ liệu sensor qua socket với event "data_sensor"
  io.emit("data_sensor", `${temp} ${humidity} ${light_level}`);

  console.log(`Sent data: Temperature: ${temp}, Humidity: ${humidity}, Light Level: ${light_level}`);
}, 5000); // Gửi dữ liệu mỗi 5 giây


//connectMqtt(io);

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
server.listen( 9999, () => {
  console.log(
    `Socket server is running on port 9999 ${process.env.SERVER_HOST}`
  );
});


apiRouter(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

