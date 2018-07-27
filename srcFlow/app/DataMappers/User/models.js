import { UserModelFieldsName } from "../../Models/User"
import { UserTableFieldsName } from "./mainDB"

const UserModelDBFieldsName = {
  [UserModelFieldsName.id]: UserTableFieldsName.sysusers_id,
  [UserModelFieldsName.login]: UserTableFieldsName.sysusers_login,
  [UserModelFieldsName.password]: UserTableFieldsName.sysusers_pass_hash,
  [UserModelFieldsName.active]: UserTableFieldsName.sysusers_active,
  [UserModelFieldsName.role_id]: UserTableFieldsName.sysusers_role_id,
  [UserModelFieldsName.ab_id]: UserTableFieldsName.sysusers_ab_id,
  [UserModelFieldsName.json_data]: UserTableFieldsName.sysusers_json_data,
}

export {
  UserModelDBFieldsName,
}
