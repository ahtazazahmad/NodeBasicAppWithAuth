//dotenv
var path = require('path');
const {ENV} = require('../utils/constant');
exports.PORT=process.env.PORT||3001;
process.env.NODE_ENV=ENV.PROD;

const host=process.env.NODE_ENV==ENV.PROD?'majestic-dango-461aa5.netlify.app':'localhost:3001';
// const host='localhost:3001';

exports.email={
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: '',
}
exports.db= {
    MONGO_URL:process.env.MONGO_URL,
    DATABASE_NAME:process.env.DATABASE_NAME,
   MONGO_Password_Prod:process.env.MONGO_Password_Prod
    }
exports.redis={
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
}

exports.session={
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}

exports.jwt={
    secret: process.env.JWT_SECRET,
    expiresIn: '1h'
}

exports.swagger={
        info: {
            title: 'Starter API',
            version: '1.0.0',
            description: 'Starter API Documentation',
            contact: {
                name: 'Applet'
            }
        },
        host:host,
        schemes: [ 'http','https'],
        titleForTab: 'Starter API',
        // securityDefinitions: {
        
           
        // },
        headerKeyAuth: {
            type: 'apiKey',
            in:'header'
        }

}


