import * as inversify from "inversify"
import "reflect-metadata"
import Logger from "logger"
import IOC_TYPES from "../types"
import container from "../container"

inversify.decorate(inversify.injectable(), Logger)
inversify.decorate(inversify.inject(IOC_TYPES.Config), Logger, 0);
container.bind(IOC_TYPES.Logger).to(Logger).inSingletonScope()
