const winston = require('winston');
const { combine, timestamp, printf, label } = winston.format;

// Define a custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Set default logging level
  format: combine(
    label({ label: 'API Service' }),
    timestamp(),
    myFormat
  ),
  transports: [
    // Console transport (logs to console)
    new winston.transports.Console(),
    // File transport (logs all levels to combined.log)
    new winston.transports.File({ filename: 'log/combined.log' }),
    // File transport (logs only error level messages to error.log)
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  ],
   exitOnError: false,
});

module.exports = logger;
