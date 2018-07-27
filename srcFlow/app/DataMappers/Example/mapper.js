// @flow

import DataMapper from "../index"
import to from "../../Helpers/to"
import { ExampleTableName } from "./mainDB"
import { ExampleModelDBFieldsName } from "./models"

export default class ExampleDM extends DataMapper {
  get tableName() {
    return ExampleTableName
  }

  get modelFields() {
    return ExampleModelDBFieldsName
  }
}

