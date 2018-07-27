// @flow

import * as inversify from "inversify"
import "reflect-metadata"

import Config from "config"
import IOC_TYPES from "../types"
import container from "../container"

inversify.decorate(inversify.injectable(), Config)
inversify.decorate(inversify.inject(IOC_TYPES.Env), Config, 0);
container.bind(IOC_TYPES.Config).to(Config).inSingletonScope()
