const mongoose = require('mongoose')
const  logger  = require('./logger')
const config = require('../config/config');
const {ENV}=require('./constant')
const connectionUrlProd=`mongodb+srv://qriptos:${config.db.MONGO_Password_Prod}@qriptos.2gek0fa.mongodb.net/${config.db.DATABASE_NAME}?retryWrites=true&w=majority`;
const connectionUrlLocal = config.db.MONGO_URL + config.db.DATABASE_NAME
console.log(connectionUrlLocal)
process.env.NODE_ENV==ENV.PROD?connectionUrl=connectionUrlProd:connectionUrl=connectionUrlLocal;

const database = () => {
   mongoose
    .connect(`${connectionUrl}`,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      logger.info('db connection established')
    })
    .catch((error) => {
      console.log(error)
      logger.error(error.message)
    })
}
// mongoose.connection.on('connected', function () {  
//   logger.info('Mongoose default connection open to ');
// }); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  logger.info('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  logger.info('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    logger.info('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
module.exports = database 