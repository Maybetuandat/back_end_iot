const db = require("../model/index");
const { Op } = require("sequelize");
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
const getHistoryDeviceByTime = async (
  value,
  typeSort,
  sort,
  page,
  pageSize
) => {
  const data = { data: null, status: null };
  const day = new Date(value);
  day.setHours(day.getHours() + 7);
  console.log(day);
  let find = {};
  const isDateOnly = value.length === 10;
  if (isDateOnly) {
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    console.log(day);
    console.log(nextDay);
    find = {
      Time: {
        [Op.between]: [day, nextDay],
      },
    };
  } else {
    find = {
      Time: {
        [Op.eq]: day,
      },
    };
  }
  var objectSearchByTime = {};
  try {
    objectSearchByTime = await db.HistoryDevice.findAll({
      where: find,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      raw: true,
    });
    if (objectSearchByTime.length > 0) {
      if (typeSort == "Time") {
        if (sort == "Increase") {
          objectSearchByTime.sort((a, b) => {
            return new Date(a.Time) - new Date(b.Time);
          });
        } else {
          objectSearchByTime.sort((a, b) => {
            return new Date(b.Time) - new Date(a.Time);
          });
        }
      }
      data.status = 200;
      data.data = objectSearchByTime;
    } else {
      data.status = 404;
    }
  } catch (error) {
    console.log("loi khi search du lieu", error);
    data.status = 500;
  }

  //console.log(data);
  return data;
};

const getHistoryDeviceByStatus = async () => {};
const getHistoryDeviceByDevice = async (
  value,
  typeSort,
  sort,
  page,
  pageSize
) => {
  const find = {};
  if (value) {
  }
};

const getAllHistoryDevice = async (typeSort, sort, page, pageSize) => {
  const data = { data: null, status: null };
  try {
    const objectSearch = await db.HistoryDevice.findAll({
      raw: true,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    if (objectSearch.length > 0) {
      if (typeSort == "Time") {
        if (sort == "Increase") {
          objectSearch.sort((a, b) => {
            return new Date(a.Time) - new Date(b.Time);
          });
        } else {
          objectSearch.sort((a, b) => {
            return new Date(b.Time) - new Date(a.Time);
          });
        }
      }

      data.status = 200;
      data.data = objectSearch;
    } else {
      data.status = 404;
    }
  } catch (error) {
    console.log("loi khi search du lieu", error);
    data.status = 500;
  }
  return data;
};
module.exports = {
  getHistoryDeviceByStatus,
  getHistoryDeviceByDevice,
  getHistoryDeviceByTime,
  saveHistoryDevice,
  getAllHistoryDevice,
};
