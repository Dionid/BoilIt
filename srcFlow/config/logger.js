// @flow
import Env from "../ignite/env"

const loggerConfig = (env: Env) => ({
  file: {
    level: "debug",
    filename: `${process.cwd()}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true,
  },
})

export default loggerConfig
