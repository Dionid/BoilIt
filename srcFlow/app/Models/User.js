// @flow

export type UserModelType = {
  id?: number,
  login?: string,
  password?: string,
  active?: number,
  role_id?: number,
  ab_id?: number,
  json_data?: {},
}


const UserModelFieldsName = {
  id: "id",
  login: "login",
  password: "password",
  active: "active",
  role_id: "role_id",
  ab_id: "ab_id",
  json_data: "json_data",
}

export {
  UserModelFieldsName,
}
