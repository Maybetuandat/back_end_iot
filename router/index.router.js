const {
  controlDevice,
  getHistoryDevice,
  getHistoryDataSensor,
  getHistoryDataSensorForChart,
} = require("../controller/HomeController");
module.exports = (app) => {
  app.get("/api/device_controller", controlDevice);
  app.get("/api/get_history_device", getHistoryDevice);
  app.get("/api/get_history_data_sensor", getHistoryDataSensor);
  app.get(
    "/api/get_history_data_sensor_for_chart",
    getHistoryDataSensorForChart
  );
};
