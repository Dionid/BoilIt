import * as inversify from "inversify"
import "reflect-metadata"
import ErrorHandler from "errorHandler"
import IOC_TYPES from "../types"
import container from "../container"

inversify.decorate(inversify.injectable(), ErrorHandler)
inversify.decorate(inversify.inject(IOC_TYPES.Config), ErrorHandler, 0)
inversify.decorate(inversify.inject(IOC_TYPES.Logger), ErrorHandler, 1)
container.bind(IOC_TYPES.ErrorHandler).to(ErrorHandler).inSingletonScope()
