// @flow

import databaseConfig from "./database"
import loggerConfig from "./logger"
import Env from "../ignite/env"

export default class Config {
  configs: {
    database: {},
    logger: {},
  }

  constructor(env: Env) {
    this.configs = {
      database: databaseConfig(env),
      logger: loggerConfig(env),
    }
  }

  get(name: string, def: any): any {
    return name.split(".").reduce((r, item) => r[item], this.configs) || def
  }
}
