// @flow

import * as bcrypt from "bcrypt"
import to from "../Helpers/to"

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
