// @flow

export type UserDBDataType = {
  sysusers_id?: number,
  sysusers_login?: string,
  sysusers_pass_hash?: string,
  sysusers_active?: number,
  sysusers_role_id?: number,
  sysusers_ab_id?: number,
  sysusers_json_data?: {},
}

const UserTableFieldsName = {
  sysusers_id: "sysusers_id",
  sysusers_login: "sysusers_login",
  sysusers_pass_hash: "sysusers_pass_hash",
  sysusers_active: "sysusers_active",
  sysusers_role_id: "sysusers_role_id",
  sysusers_ab_id: "sysusers_ab_id",
  sysusers_json_data: "sysusers_json_data",
}

const UserTableName = "system_users"

export {
  UserTableName,
  UserTableFieldsName,
}
