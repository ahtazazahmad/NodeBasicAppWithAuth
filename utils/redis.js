const session = require('express-session');
const connectRedis = require('connect-redis');
const redis = require('redis');
const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
});



const RedisStore = connectRedis(session);
redisClient.on('connect', () => {
    console.log('Redis client connected');
})
redisClient.on('error', (err) => {
    console.log('Something went wrong ' + err);
})
module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'mySecret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false, // if true: only transmit cookie over https, in prod, always activate this
    httpOnly: true, // if true: prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 30, // session max age in milliseconds
    // explicitly set cookie to lax
    // to make sure that all cookies accept it
    // you should never use none anyway
    sameSite: 'lax',
  },
});


// 1 configure our redis
