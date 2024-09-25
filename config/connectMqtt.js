require("dotenv").config();
const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT,
});
const topic = "home/sensor/data";
const statusLedResponse = "home/led/response";
const statusFanResponse = "home/fan/response";
const statusAirConditionerResponse = "home/air_conditioner/response";
const statusDustReponse = "home/dust/response";
const homestatus = "home/sensor/data";
const { saveDataSensor } = require("../service/data_sensor.service");
const { saveHistoryDevice } = require("../service/history_device.service");
const connectMqtt = (io) => {
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

    client.subscribe(statusLedResponse, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log("Subscribed to topic:", statusLedResponse);
      }
    });

    client.subscribe(statusFanResponse, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log("Subscribed to topic:", statusFanResponse);
      }
    });

    client.subscribe(statusAirConditionerResponse, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log("Subscribed to topic:", statusAirConditionerResponse);
      }
    });
    client.subscribe(statusDustReponse, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log("Subscribed to topic:", statusDustReponse);
      }
    });

    //tạo các subcribe cho các topic
  });

  //call back

  // Handle connection errors
  client.on("error", (err) => {
    console.error("MQTT connection error:", err);
  });

  client.on("message", async (topic, message) => {
    if (topic === homestatus) {
      const sensorData = JSON.parse(message.toString());
      let temp = sensorData.temperature.toFixed(2);
      sensorData.temperature = temp;
      let humidity = sensorData.humidity;
      let light_level = sensorData.light_level;
      let winds = sensorData.winds;
      console.log(
        `Data nhận được từ sensor: ${temp} ${humidity} ${light_level} ${winds}`
      );
      // io.emit("data_sensor", `${temp} ${humidity} ${light_level} ${dust}`);
      io.emit("data_sensor", `${temp} ${humidity} ${light_level} ${winds}`);
      const statussaveDataSensor = await saveDataSensor(sensorData);
      console.log(statussaveDataSensor);
    }
    if (topic === statusLedResponse) {
      const data = message.toString();
      console.log(`led status: ${data}`);
      const statussaveHistoryDevice = await saveHistoryDevice("Led", data);
      console.log(statussaveHistoryDevice);
      io.emit("led_status", data);
    }
    if (topic === statusFanResponse) {
      const data = message.toString();
      console.log(`fan status: ${data}`);
      const statussaveHistoryDevice = await saveHistoryDevice("Fan", data);
      console.log(statussaveHistoryDevice);
      io.emit("fan_status", data);
    }
    if (topic === statusAirConditionerResponse) {
      const data = message.toString();
      console.log(`air_conditioner status: ${data}`);
      const statussaveHistoryDevice = await saveHistoryDevice(
        "Air Conditioner",
        data
      );
      console.log(statussaveHistoryDevice);
      io.emit("air_conditioner_status", data);
    }
    if (topic == statusDustReponse) {
      const data = message.toString();
      console.log(`dust status: ${data}`);
      const statussaveHistoryDevice = await saveHistoryDevice("Dust", data);
      console.log(statussaveHistoryDevice);
      io.emit("dust_status", data);
    }
  });
};
module.exports = { connectMqtt, client };
