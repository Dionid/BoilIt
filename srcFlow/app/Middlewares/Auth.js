// @flow

import AuthController from "app/Controllers/AuthController"
import type { cExpress$Request, cExpress$Response, cExpress$NextFunction } from "types/express"

function AuthMiddleware(
  req: cExpress$Request<>,
  res: cExpress$Response,
  next: cExpress$NextFunction,
) {
  return AuthController.authenticate((err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.boom.unauthorized(
        info.name === "TokenExpiredError" ? "Your token has expired. Please generate a new one" : info.message,
      )
    }
    res.locals.user = user
    return next();
  })(req, res, next)
}

export default AuthMiddleware
