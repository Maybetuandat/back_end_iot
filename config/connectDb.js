const { Sequelize } = require("sequelize");
require("dotenv").config();
// Tạo kết nối đến MySQL bằng Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, // Địa chỉ server MySQL, nếu là local thì dùng localhost
    dialect: "mysql", // Cơ sở dữ liệu sử dụng là MySQL
    logging: false, // Tắt logging của Sequelize nếu không muốn log SQL queries
  }
);
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully to database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { connection, sequelize };
