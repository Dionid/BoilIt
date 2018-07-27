

import * as inversify from "inversify"
import "reflect-metadata"
import DM from "app/DataMappers/index"
import IOC_TYPES from "../types"
// import container from "../container"

inversify.decorate(inversify.injectable(), DM)
inversify.decorate(inversify.inject(IOC_TYPES.MDB), DM, 0);
// container.bind(IOC_TYPES.DM).to(DM).inSingletonScope()
