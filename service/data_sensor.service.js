const db = require("../model/index");
const { Op } = require("sequelize");

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
module.exports = { saveDataSensor };
