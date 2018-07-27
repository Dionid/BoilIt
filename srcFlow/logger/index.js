// @flow
import winston from "winston"
import Config from "../config/index"

console.log("Logger started")

class Logger {
  l: winston

  constructor(config: Config) {
    this.l = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File(config.get("logger").file),
        new winston.transports.Console(config.get("logger").console),
      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  get stream() {
    return {
      write: (message: string) => this.info(message),
    }
  }

  log(...args: any) {
    return this.l.log(...args)
  }

  info(...args: any) {
    return this.l.info(...args)
  }

  warn(...args: any) {
    return this.l.warn(...args)
  }

  error(...args: any) {
    return this.l.error(...args)
  }
}

export default Logger
