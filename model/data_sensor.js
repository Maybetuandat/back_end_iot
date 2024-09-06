const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Đảm bảo đường dẫn đúng với cấu hình Sequelize của bạn

// Định nghĩa model SensorData
const SensorData = sequelize.define(
  "SensorData",
  {
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "data_sensor", // Tên bảng trong MySQL
    timestamps: false, // Nếu không muốn Sequelize tự thêm cột createdAt/updatedAt
  }
);

module.exports = SensorData;
