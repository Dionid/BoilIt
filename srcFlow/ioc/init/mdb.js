// @flow

import * as inversify from "inversify"
import "reflect-metadata"
import MDB from "database"
import IOC_TYPES from "../types"
import container from "../container"

inversify.decorate(inversify.injectable(), MDB)
inversify.decorate(inversify.inject(IOC_TYPES.Config), MDB, 0);
container.bind("__dbMainName").toConstantValue("main");
inversify.decorate(inversify.inject("__dbMainName"), MDB, 1);
container.bind(IOC_TYPES.MDB).to(MDB).inSingletonScope()
