const statusLedRequest = "home/led/request";
const statusFanRequest = "home/fan/request";
const { client } = require("../config/connectMqtt");
const statusAirConditionerRequest = "home/air_conditioner/request";
const controlLed = async (req, res) => {
  const parameter = req.query.parameter;
  //  console.log(parameter);
  const data = {};
  if (parameter == "1") {
    client.publish(statusLedRequest, "1");
    data.status = 400;
    data.data = "led is on";
  } else {
    client.publish(statusLedRequest, "0");
    data.status = 500;
    data.data = "led is off";
  }
  res.status(data.status).json(data);
};
const controlAirConditioner = async (req, res) => {
  const parameter = req.query.parameter;
  // console.log(parameter);
  const data = {};
  if (parameter == "1") {
    client.publish(statusAirConditionerRequest, "1");
    data.status = 400;
    data.data = "Air Conditioner  is on";
  } else {
    client.publish(statusAirConditionerRequest, "0");
    data.status = 500;
    data.data = "Air Conditioner  is off";
  }
  res.status(data.status).json(data);
};
const controlFan = async (req, res) => {
  const parameter = req.query.parameter;
  // console.log(parameter);
  const data = {};
  if (parameter == "1") {
    client.publish(statusFanRequest, "1");
    data.status = 400;
    data.data = "Fan is on";
  } else {
    client.publish(statusFanRequest, "0");
    data.status = 500;
    data.data = "Fan is off";
  }
  res.status(data.status).json(data);
};
const getHistoryDevice = async (req, res) => {
  
  //value
  //typeSearch
  //typeSort
  //sort
 // page
   if(req.query.typeSearch =="")
   {
    
   }

};
module.exports = {
  controlLed,
  controlAirConditioner,
  controlFan,
  getHistoryDevice,
};
