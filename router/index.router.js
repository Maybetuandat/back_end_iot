const {
  controlLed,
  controlAirConditioner,
  controlFan,
  getHistoryDevice,
} = require("../controller/HomeController");
module.exports = (app) => {
  app.get("/api/device_controller/led", controlLed);
  app.get("/api/device_controller/air_conditioner", controlAirConditioner);
  app.get("/api/device_controller/fan", controlFan);
  app.get("/api/get_history_device", getHistoryDevice);
};
