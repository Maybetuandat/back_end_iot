const db = require("../model/index");

const saveDataSensor = async (data) => {
  var response = { status: null };
  try {
    let now = new Date();
    now.setHours(now.getHours() + 7); // Cộng thêm 7 giờ để điều chỉnh múi giờ

    await db.DataSensor.create({
      Temperature: data.temperature,
      Humidity: data.humidity,
      Light: data.light_level,
      Time: now,
    });
    response.status = 200;
  } catch (err) {
    console.log("Lỗi khi insert dữ liệu data sensor", err);
    response.status = 500;
  }
  return response;
};

const saveHistoryDevice = async (name, status) => {
  var response = { status: null };
  var statusDevice = status == "1" ? "ON" : "OFF";
  try {
    let now = new Date();
    now.setHours(now.getHours() + 7); // Cộng thêm 7 giờ để điều chỉnh múi giờ

    await db.HistoryDevice.create({
      Device: name,
      Status: statusDevice,
      Time: now,
    });
    response.status = 200;
  } catch (err) {
    console.log("Lỗi khi insert dữ liệu data sensor", err);
    response.status = 500;
  }
  return response;
};
module.exports = { saveDataSensor, saveHistoryDevice };
