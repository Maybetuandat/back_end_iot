const statusLedRequest = "home/led/request";
const statusFanRequest = "home/fan/request";
const { client } = require("../config/connectMqtt");
const statusAirConditionerRequest = "home/air_conditioner/request";
const pagination = require("../helper/pagination");
const {
  getHistoryDeviceByTime,
  getHistoryDeviceByDevice,
  getHistoryDeviceByStatus,
  getAllHistoryDevice,
  getCountAllHistoryDevice,
  getCountHistoryDeviceByTime,
  getCountHistoryDeviceByDevice,
  getCountHistoryDeviceByStatus,
} = require("../service/history_device.service");
const {
  getCountAllHistoryDataSensor,
  getAllHistoryDataSensor,
  getCountHistoryDataSensorByTime,
  getHistoryDataSensorByTime,
  getCountHistoryDataSensorByLight,
  getHistoryDataSensorByLight,
  getCountHistoryDataSensorByHumidity,
  getHistoryDataSensorByHumidity,
  getCountHistoryDataSensorByTemperature,
  getHistoryDataSensorByTemperature,
  getDataSensorForChart,
} = require("../service/data_sensor.service");
const controlDevice = async (req, res) => {
  const parameter = req.query.parameter;
  const id = req.query.id;
  const data = {};
  if (id == "1") {
    if (parameter == "1") {
      client.publish(statusLedRequest, "1");
      data.status = 200;
      data.data = "led is on";
    } else {
      client.publish(statusLedRequest, "0");
      data.status = 200;
      data.data = "led is off";
    }
  }
  if (id == "2") {
    if (parameter == "1") {
      client.publish(statusFanRequest, "1");
      data.status = 200;
      data.data = "Fan is on";
    } else {
      client.publish(statusFanRequest, "0");
      data.status = 200;
      data.data = "Fan is off";
    }
  }
  if (id == "3") {
    if (parameter == "1") {
      client.publish(statusAirConditionerRequest, "1");
      data.status = 200;
      data.data = "Air Conditioner  is on";
    } else {
      client.publish(statusAirConditionerRequest, "0");
      data.status = 200;
      data.data = "Air Conditioner  is off";
    }
  }
  //  console.log(parameter);

  res.status(data.status).json(data);
};
const getHistoryDevice = async (req, res) => {
  //value
  //typeSearch --
  //typeSort
  //sort
  // page
  //pageSize
  const query = req.query;
  console.log(query);
  const objectPagination = {};
  const data = { status: null, data: null, meta: null };
  if (req.query.typeSearch == "Time") {
    // giá trị tìm kiếm không có gì thì get cả

    //lay

    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDevice()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getAllHistoryDevice(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (await getCountHistoryDeviceByTime(req.query.value))
        .data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getHistoryDeviceByTime(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  if (req.query.typeSearch == "Device") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDevice()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );

      const dataResponse = await getAllHistoryDevice(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (await getCountHistoryDeviceByDevice(req.query.value))
        .data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );

      const dataResponse = await getHistoryDeviceByDevice(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  if (req.query.typeSearch == "Status") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDevice()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getAllHistoryDevice(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (await getCountHistoryDeviceByStatus(req.query.value))
        .data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getHistoryDeviceByStatus(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  const { status, ...responseData } = data;
  res.status(data.status).json(responseData);
  console.log(responseData);
};
const getHistoryDataSensor = async (req, res) => {
  //value
  //typeSearch --
  //typeSort
  //sort
  // page
  //pageSize
  const query = req.query;
  console.log(query);
  const objectPagination = {};
  const data = { status: null, data: null, meta: null };
  if (req.query.typeSearch == "Time") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDataSensor()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getAllHistoryDataSensor(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (
        await getCountHistoryDataSensorByTime(req.query.value)
      ).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getHistoryDataSensorByTime(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  if (req.query.typeSearch == "Light") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDataSensor()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );

      const dataResponse = await getAllHistoryDataSensor(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (
        await getCountHistoryDataSensorByLight(req.query.value)
      ).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );

      const dataResponse = await getHistoryDataSensorByLight(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  if (req.query.typeSearch == "Humidity") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDataSensor()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getAllHistoryDataSensor(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (
        await getCountHistoryDataSensorByHumidity(req.query.value)
      ).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getHistoryDataSensorByHumidity(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  if (req.query.typeSearch == "Temperature") {
    if (req.query.value == "") {
      const total_data = (await getCountAllHistoryDataSensor()).data;
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getAllHistoryDataSensor(
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    } else {
      const total_data = (
        await getCountHistoryDataSensorByTemperature(req.query.value)
      ).data;
      console.log("total_data is ", total_data);
      const meta = pagination(
        objectPagination,
        parseInt(req.query.page),
        parseInt(req.query.pageSize),
        total_data
      );
      const dataResponse = await getHistoryDataSensorByTemperature(
        req.query.value,
        req.query.typeSort,
        req.query.sort,
        meta
      );
      data.status = dataResponse.status;
      data.data = dataResponse.data;
      data.meta = meta;
    }
  }
  const { status, ...responseData } = data;
  res.status(status).json(responseData);
  console.log(responseData);
};
const getHistoryDataSensorForChart = async (req, res) => {
  const key = req.query.key;
  const data = await getDataSensorForChart(key);
  const { status, ...responseData } = data;
  res.status(data.status).json(responseData.data);
  console.log(responseData.data);
};
module.exports = {
  controlDevice,
  getHistoryDevice,
  getHistoryDataSensor,
  getHistoryDataSensorForChart,
};
