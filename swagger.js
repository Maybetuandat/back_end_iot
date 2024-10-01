const swaggerJSDoc = require("swagger-jsdoc");
const { serve } = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "My API Description",
  },
  servers: [
    {
      url: process.env.SERVER_HOST,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./router/index.router.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
