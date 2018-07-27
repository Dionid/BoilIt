// @flow

import DB from "database/index"

type WhereData = {}
type ArgsData = string[]

type WhereAndArgsObj = {
  where?: WhereData,
  args?: ArgsData,
}

type transformedData = {
  argsN?: {}[],
  whereN?: WhereData,
}

class DataMapper {
  db: Knex$Knex<Knex$PostgresConfig>

  get tableName() {
    throw new Error("No table name!")
  }

  get modelFields(): {} {
    throw new Error("No model fields!")
  }

  // get transformedSelectAllData(): string[] {
  //   return this.modelFields
  // }

  constructor(_db: DB) {
    this.db = _db.db
  }

  transformParamsByModel({ where, args = [] }: WhereAndArgsObj): transformedData {
    let whereN = {}
    if (where) {
      whereN = Object.keys(where).reduce((sum, cur) => ({
        ...sum,
        [this.modelFields[cur]]: where[cur],
      }), {})
    }
    let argsN
    if (args) {
      argsN = args.map(key => ({ [key]: this.modelFields[key] }))
    }
    return { whereN, argsN }
  }

  transformDataByModel(data: {}): {} {
    return Object.keys(data).reduce((sum, cur) => ({
      ...sum,
      [this.modelFields[cur]]: data[cur],
    }), {})
  }

  get table() {
    return this.db(this.tableName)
  }

  async find({ args = [] }: { args: string[] } = {}): Promise<Array<any>> {
    return await this.table.select(...args)
  }

  async findOne(params: WhereAndArgsObj): Promise<any> {
    const { whereN, argsN }: transformedData = this.transformParamsByModel(params)
    return await this.table
      .where(whereN || {})
      .select((argsN && argsN.length && argsN) || this.modelFields)
      .first()
  }

  async insert(data: {}): any {
    return await this.table.insert(this.transformDataByModel(data))
  }
}

export default DataMapper
