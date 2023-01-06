// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var Devlogger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger-output.json')
const bodyParser = require('body-parser')
const { logger } = require('./utils/logger')
const database  = require('./utils/database')
const Response = require('./utils/Response/response')
var app = express();
const actuator = require('express-actuator');
const helmet = require('helmet');
const { config } = require('dotenv');
const configuration =require('./config/config')
// app.use(helmet())
app.disable('x-powered-by')
const session = require('express-session');
const jwt = require('jsonwebtoken');

//connet to database
database()

app.use(session({
  secret: process.env.JWT_SECERT_KEY,
  resave: false,
  saveUninitialized: false
}));
// app.use(sessionMiddleware)
app.use(cors())

//for development show logs on console

if(process.env.NODE_ENV=='development'){
  
app.use(Devlogger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

app.use(cors({credentials: true,optionsSuccessStatus: 200, origin: '*'}));



//monitor express server
// const optionsForActuator = {
//   basePath: '/management', // It will set /management/info instead of /info
//   infoGitMode: 'simple', // the amount of git information you want to expose, 'simple' or 'full',
//   infoBuildOptions: null, // extra information you want to expose in the build object. Requires an object.
//   infoDateFormat: null, // by default, git.commit.time will show as is defined in git.properties. If infoDateFormat is defined, moment will format git.commit.time. See https://momentjs.com/docs/#/displaying/format/.
//   customEndpoints: [] // array of custom endpoints
// };

app.use(actuator());
//documention
var options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: configuration.swagger.titleForTab,
};
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile,options))


//routes
require('./api/index')(app);





// error handler
app.use(function(err, req, res, next) {
  res.send(Response.getBadRequest(err.message))
  next();
});

module.exports = app;
