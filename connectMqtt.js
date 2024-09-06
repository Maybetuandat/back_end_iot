require("dotenv").config();
const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT,
});
const topic = "home/sensor";
const connectMqtt = () => {
  //need connect to mqtt broker
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log("Subscribed to topic:", topic);
      }
    });

    //tạo các subcribe cho các topic
  });

  //call back

  // Handle connection errors
  client.on("error", (err) => {
    console.error("MQTT connection error:", err);
  });
};
module.exports = { connectMqtt, client };
