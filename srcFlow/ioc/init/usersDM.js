// @flow

import * as inversify from "inversify"
import "reflect-metadata"
import UsersDM from "app/DataMappers/User/index"
import IOC_TYPES from "../types"
import container from "../container"

inversify.decorate(inversify.injectable(), UsersDM)
container.bind(IOC_TYPES.UsersDM).to(UsersDM).inSingletonScope()
