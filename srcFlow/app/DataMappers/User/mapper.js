// @flow

import { UsersSystem } from "app/Systems/User"
import { UserTableName, UserTableFieldsName } from "./mainDB"
import DataMapper from "../index"
import to from "../../Helpers/to"
import { UserModelDBFieldsName } from "./models"

export default class UsersDM extends DataMapper {
  get tableName() {
    return UserTableName
  }

  get modelFields() {
    return UserModelDBFieldsName
  }

  async createNewStandardUser(
    { login, password }: { login: string, password: string },
  ): Promise<[?Error, any]> {
    if (!login || !password) {
      return [new Error("No pass or login"), null]
    }

    const [err, hash] = await UsersSystem.hashPassword(password)

    if (err) {
      return [err, null]
    }

    return to(this.insert({
      [UserTableFieldsName.sysusers_login]: login,
      [UserTableFieldsName.sysusers_pass_hash]: hash,
      [UserTableFieldsName.sysusers_active]: 1,
      [UserTableFieldsName.sysusers_role_id]: 1,
      [UserTableFieldsName.sysusers_ab_id]: 1,
    }))
  }
}
