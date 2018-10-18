# BoilIt

## What to do with it?

1. Clone the repository `git@github.com: Dionid / BoilIt.git`
1. Setup configurations in `config` and` database`
1. Code

## Launch

You need to run 2 commands:

```bash
npm run babel:watch
```
Run js transpiling in the `src` folder

```bash
npm run start
```
Will start the server

## Migrations

** Note: ** migrations can be performed and rolled back only when the `src` folder is compiled

To create run

```
npm run knex:make __migration_name__
```

Make migrations

```
npm run knex:migrate
```

Rolling back migrations

```
npm run knex:rollback
```

## Architecture

This section describes how and why the standard implementation of `Model`
replaced by more flexible `MDS`

## MDS

**Model.** **DataMapper.** **System.**

## Model

Entities that are used by the server in the process of work (not tied to a database or the like). It consists of a description of the type of fields and the names of the fields of your objects.

Пример:

```js
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
```

## Data Mapper
#### Knows about: Model, System

Singleton-service that is responsible for obtaining Model data from various external sources (any databases and the like).

** Features **

* Uses `Systems` to modify the` Model` data.
* Contains connections to all external storage required.
* Serializes from `Model` and in` Model`.
* There are 2 types:
   * For a specific Model
   * As a service for combining data from different Models
   
**Пример**

```js
import { UserModelFieldsName } from "app/Models/User"

export type UserDBDataType = {
  sysusers_id?: number,
  sysusers_login?: string,
  sysusers_pass_hash?: string,
  sysusers_active?: number,
  sysusers_role_id?: number,
  sysusers_ab_id?: number,
  sysusers_json_data?: {},
}

const UserDBFieldsName = {
  sysusers_id: "sysusers_id",
  sysusers_login: "sysusers_login",
  sysusers_pass_hash: "sysusers_pass_hash",
  sysusers_active: "sysusers_active",
  sysusers_role_id: "sysusers_role_id",
  sysusers_ab_id: "sysusers_ab_id",
  sysusers_json_data: "sysusers_json_data",
}

const UserTableName = "system_users"

const UserModelDBFieldsName = {
  [UserModelFieldsName.id]: UserDBFieldsName.sysusers_id,
  [UserModelFieldsName.login]: UserDBFieldsName.sysusers_login,
  [UserModelFieldsName.password]: UserDBFieldsName.sysusers_pass_hash,
  [UserModelFieldsName.active]: UserDBFieldsName.sysusers_active,
  [UserModelFieldsName.role_id]: UserDBFieldsName.sysusers_role_id,
  [UserModelFieldsName.ab_id]: UserDBFieldsName.sysusers_ab_id,
  [UserModelFieldsName.json_data]: UserDBFieldsName.sysusers_json_data,
}

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
      [UserDBFieldsName.sysusers_login]: login,
      [UserDBFieldsName.sysusers_pass_hash]: hash,
      [UserDBFieldsName.sysusers_active]: 1,
      [UserDBFieldsName.sysusers_role_id]: 1,
      [UserDBFieldsName.sysusers_ab_id]: 1,
    }))
  }
}

export default UsersDM
```

## System
#### Knows about: Model, Data Mapper

Stateless singleton service responsible for changes inside the Model and Model [].

```js
import * as bcrypt from "bcrypt"
import to from "app/Helpers/to"

class UsersSystem {
  static async comparePassword(password: string, userPassword: string): Promise<[?Error, ?boolean]> {
    return await to(bcrypt.compare(password, userPassword))
  }

  static async hashPassword(password: string): Promise<[?Error, ?string]> {
    return await to(bcrypt.hash(password, 10))
  }
}

export {
  UsersSystem,
}
```
