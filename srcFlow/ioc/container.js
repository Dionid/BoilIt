// @flow

import * as inversify from "inversify"
import "reflect-metadata"

export interface ContainerI {
  get(string):any,
  bind(string):any,
}

const container: ContainerI = new inversify.Container();

export default container
