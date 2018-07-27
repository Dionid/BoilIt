// @flow

import "pg"
import knex from "knex"
import Config from "../config/index"

export default class DB {
  db: Knex$Knex<Knex$PostgresConfig>

  constructor(config: Config, dbType: string) {
    const knexConfigs = config.get("database")[dbType]
    this.db = knex(knexConfigs)
  }
}
