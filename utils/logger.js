const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const {ENV} = require('../utils/constant');
const colorizer = format.colorize();

const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    silly: 9,
  },
  format: combine(
    format.timestamp(),
    format.simple(),
    format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - ${msg.level}: ${msg.message}`
      )
    )
  ),
  transports: [
    process.env.NODE_ENV==ENV.PROD?new transports.File({
      filename: 'logs/server.log',
      format:format.combine(
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}): new transports.Console({
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
});

module.exports = logger;
