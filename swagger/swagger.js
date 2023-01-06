const swaggerAutogen = require('swagger-autogen')();
const config=require('../config/config');
const doc=config.swagger;

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./api/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);