# BoilIt

## Запуск

Нужно запустить 2 команды:

```bash
npm run babel:watch
```
Запустит транспайлинг js в папку `src`

```bash
npm run start
```
Запустит сервер

## Миграции

**Примечание:** миграции можно проиводить и откатывать только, когда скомпилирована папка `src`

Для создания пишем

```
npm run knex:make __migration_name__
```

Производим миграции

```
npm run knex:migrate
```

Откатываем миграции

```
npm run knex:rollback
```

## Архитектура

В этом разделе описано как и почему стандартная реализация `Model`
заменена на более гибкое `MDS`

## MDS

Переводится как: **Model.** **DataMapper.** **System.**

## Model

Сущности, которые используются сервером в процессе работе (не завязанные на БД или подобном). Состоит из описания типа полей и названия полей ваших объектов.

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
#### Знает о: Model, System

Singleton-сервис, отвечающий за получение данных Model из разных внешних источников (любые БД и тому подобное).

Особенности

Использует Systems для видоизменения данных Model
Содержит в себе подключения ко всем требующимся внешним хранилищам
Сериализует из Model и в Model
Бывает 2 видов:
Для конкретной Model
Как сервис для объединения данных разных Models

Пример

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
#### Знает о: Model, Data Mapper

Stateless singleton-сервис, отвечающий за изменения внутри Model и Model [ ].

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
