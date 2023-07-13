//the logger is "stole" from wiki.js
const winston = require('winston')

module.exports = {
  loggers: {},
  init(uid) {
    const loggerFormats = [
      winston.format.label({ label: uid }),
      winston.format.timestamp()
    ]

    loggerFormats.push(winston.format.colorize())
    loggerFormats.push(winston.format.printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`))
    const logger = winston.createLogger({
      format: winston.format.combine(...loggerFormats)
    })

    // Init Console (default)

    logger.add(new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    }))

    return logger
  }
}
