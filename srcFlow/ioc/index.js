// @flow

import DB from "database"
import Config from "config/index"
import Logger from "logger"
import ErrorHandler from "errorHandler"
import UsersDM from "app/DataMappers/User/index"
import container, { ContainerI } from "./container"
import IOC_TYPES from "./types"
import Env from "../ignite/env"

class IoC {
  container: ContainerI

  constructor(containerA: ContainerI) {
    this.container = containerA
  }

  getEnv(): Env {
    return this.container.get(IOC_TYPES.Env)
  }

  getMDB(): DB {
    return this.container.get(IOC_TYPES.MDB)
  }

  getConfig(): Config {
    return this.container.get(IOC_TYPES.Config)
  }

  getUsersDM(): UsersDM {
    return this.container.get(IOC_TYPES.UsersDM)
  }

  getLogger(): Logger {
    return this.container.get(IOC_TYPES.Logger)
  }

  getErrorHandler(): ErrorHandler {
    return this.container.get(IOC_TYPES.ErrorHandler)
  }
}

export default new IoC(container)
export {
  IOC_TYPES,
}
