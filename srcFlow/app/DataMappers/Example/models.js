import { ExampleModelFieldsName } from "app/Models/Example"
import { ExampleTableFieldsName } from "./mainDB"

const ExampleModelDBFieldsName = {
  [ExampleModelFieldsName.id]: ExampleTableFieldsName.example_id,
}

export {
  ExampleModelDBFieldsName,
}
