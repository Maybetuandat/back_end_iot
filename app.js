const express = require("express");
const { connection } = require("./config/connectDb");
const { connectMqtt, client } = require("./config/connectMqtt");
const { Json } = require("sequelize/lib/utils");
const app = express();
const port = 9999;
connection();
connectMqtt();

// const char* statusLight = "home/light";
// const char*  statusFan =  "home/fan";
// const char* statusAirConditioner =  "home/air_conditioner";  đẩy từ server về hivemq -> gửi về esp32

let sensorData = null;

// Lắng nghe tin nhắn từ MQTT
client.on("message", (topic, message) => {
  if (topic === "home/sensor") {
    sensorData = message.toString();
    console.log(`Dữ liệu nhận được từ topic ${topic}: ${sensorData}`);
  }
});
app.get("/api/get_data_sensor", (req, res) => {
  if (sensorData) {
    res.json({
      status: "success",
      data: sensorData,
    });
  } else {
    res.json({
      status: "error",
      message: "Chưa có dữ liệu sensor",
    });
  }
});

app.get("/api/pub_device_status", (req, res) => {
  const topiclight = "home/light";

  const topicfan = "home/fan";
  const topicAirConditioner = "home/air_conditioner";

  const message = JSON.stringify({});
});
//sử dụng để nhận các topic từ server gửi về

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
