// @flow

import Config from "config/index"
import Logger from "logger"

console.log("ErrorHandler started")

class ErrorHandler {
  logger: Logger

  constructor(config: Config, logger: Logger) {
    this.logger = logger
  }

  handle(error: Error) {
    this.logger.error(error)
  }
}

export default ErrorHandler
