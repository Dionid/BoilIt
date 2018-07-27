// @flow

import IoC from "ioc"
import moment from "moment"
import jwt from "jsonwebtoken"
import { Strategy, ExtractJwt } from "passport-jwt"
import validate from "validate.js"
import type { cExpress$Request, cExpress$Response } from "types/express"
import passport from "passport"
import to from "../Helpers/to"
import { UsersSystem } from "../Systems/User"
import { UserModelFieldsName } from "../Models/User"
import type { UserModelType } from "../Models/User"

const Env = IoC.getEnv()
const UsersDM = IoC.getUsersDM()

type AuthControllerStoreReq = {|
  login: string,
  password: string,
|}

type JWTPayload = {
  id: number,
  login: string,
}

class AuthController {
  static initialize() {
    passport.use("jwt", AuthController.getStrategy());
    return passport.initialize();
  }

  static getStrategy() {
    const params = {
      secretOrKey: Env.get("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    return new Strategy(params, async (payload: JWTPayload, done) => {
      const [userErr, user]:[?Error, ?UserModelType] = await to(
        UsersDM.findOne(
          {
            where: { [UserModelFieldsName.login]: payload.login },
            args: [UserModelFieldsName.id, UserModelFieldsName.login],
          },
        ),
      )

      if (userErr) {
        return done(userErr, false);
      }

      if (user === null) {
        return done(null, false, { message: "The user in the token was not found" });
      }

      if (user && user.id && user.login) {
        return done(null, { id: user.id, login: user.login });
      }

      throw new Error("something strange with user data")
    });
  }

  static authenticate(callback: any) {
    return passport.authenticate("jwt", { session: false }, callback)
  }

  static async signin(req: cExpress$Request<AuthControllerStoreReq>, res: cExpress$Response) {
    const validErr = validate(req.body, {
      login: {
        presence: true,
      },
      password: {
        presence: true,
      },
    })

    if (validErr) {
      return res.boom.notAcceptable("Not valid data", { details: validErr })
    }

    const { login, password }: AuthControllerStoreReq = req.body

    const [userErr, user]:[?Error, ?UserModelType] = await to(
      UsersDM.findOne(
        {
          where: { [UserModelFieldsName.login]: login },
        },
      ),
    )

    if (userErr) {
      return res.boom.badRequest("Server problems!")
    }

    if (!user) {
      return res.boom.badRequest("Incorrect login or password")
    }

    if (!user.password) {
      throw new Error("No password in user")
    }

    const [err, isUser] = await UsersSystem.comparePassword(password, user.password)

    if (err) {
      return res.boom.badRequest("Server problems!")
    }

    if (!isUser) {
      return res.boom.badRequest("Incorrect login or password")
    }

    return res.send(AuthController.genToken(user))
  }

  static genToken(user: UserModelType) {
    const expires = moment().utc().add(72, "h").unix();
    const token = jwt.sign({
      login: user.login,
      id: user.id,
    }, Env.get("JWT_SECRET"), { expiresIn: expires - moment().unix() });

    return {
      token,
      expires,
    };
  }

  static async signup(req: cExpress$Request<AuthControllerStoreReq>, res: cExpress$Response) {
    const validErr = validate(req.body, {
      login: {
        presence: true,
        length: {
          minimum: 6,
          message: "must be at least 6 characters",
        },
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: "must be at least 6 characters",
        },
      },
    })

    if (validErr) {
      return res.boom.notAcceptable("Not valid data", { details: validErr })
    }

    const { login, password }: AuthControllerStoreReq = req.body

    const [userErr, user]: [?Error, ?UserModelType] = await to(
      UsersDM.findOne({
        where: { [UserModelFieldsName.login]: login },
        args: [UserModelFieldsName.login],
      }),
    )

    if (userErr) {
      return res.boom.badRequest("Something happend sorry")
    }

    if (user) {
      return res.boom.notAcceptable("Username is taken!")
    }

    const [err] = await UsersDM.createNewStandardUser(
      { login, password },
    )

    if (err) {
      return res.boom.boomify(err)
    }

    return res.sendStatus(200)
  }
}

export default AuthController
