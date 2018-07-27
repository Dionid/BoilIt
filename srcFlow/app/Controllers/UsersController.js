// @flow

import IoC from "ioc"
import { UserModelFieldsName } from "app/Models/User"
import to from "../Helpers/to"

const UsersDM = IoC.getUsersDM()

type UsersControllerIndexRes = Array<{|
  login: string
|}>

class UsersController {
  static async index(req: express$Request, res: express$Response, next: express$NextFunction) {
    const [err, users]:[?Error, ?UsersControllerIndexRes] = await to(
      UsersDM.find({ args: [UserModelFieldsName.login] }),
    )

    if (err) {
      return next(err)
    }

    return res.send(users)
  }

  static async store(req: express$Request, res: express$Response) {
    return res.sendStatus(200)
  }

  static async show(req: express$Request, res: express$Response) {
    res.send("UsersShow")
  }

  static async update(req: express$Request, res: express$Response) {
    res.send("UsersUpdate")
  }

  static async destroy(req: express$Request, res: express$Response) {
    res.send("UsersDestroy")
  }
}

export default UsersController
