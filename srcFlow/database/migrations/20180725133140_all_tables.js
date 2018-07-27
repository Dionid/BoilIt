
import { UserTableName, UserTableFieldsName } from "app/DataMappers/User/mainDB"

exports.up = async (knex) => {
  await knex.schema.createTable(UserTableName, (table) => {
    table.increments(UserTableFieldsName.sysusers_id)
    table.string(UserTableFieldsName.sysusers_login, 64).notNullable().unique()
    table.string(UserTableFieldsName.sysusers_pass_hash, 254).notNullable()
    table.integer(UserTableFieldsName.sysusers_active).notNullable()
    table.integer(UserTableFieldsName.sysusers_role_id).unsigned().notNullable()
    table.integer(UserTableFieldsName.sysusers_ab_id).unsigned().notNullable()
    table.json(UserTableFieldsName.sysusers_json_data)
    table.timestamps()
  })
  // Add all other main tables...
}

exports.down = async (knex) => {
  await knex.schema.dropTable(UserTableName)
  // Drop all other main tables...
}
