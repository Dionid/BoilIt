// @flow

import * as inversify from "inversify"
import "reflect-metadata"
import IOC_TYPES from "../types"
import container from "../container"

const Env = require("ignite/env").default

inversify.decorate(inversify.injectable(), Env)
container.bind(IOC_TYPES.Env).to(Env).inSingletonScope()
