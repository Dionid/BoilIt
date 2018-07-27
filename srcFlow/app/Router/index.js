import express from "express"
import morgan from "morgan"
import compression from "compression"
import bodyParser from "body-parser"
import AuthController from "app/Controllers/AuthController"
import AuthMiddleware from "app/Middlewares/Auth"
import IoC from "ioc"
import errorsHandler from "./utils/errors"
import boom from "./utils/boom"
import users from "./routes/v1/users"
import auth from "./routes/v1/auth"

const Logger = IoC.getLogger()

const init = (app) => {
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan("combined", { stream: Logger.stream }))
  app.use(boom())

  // Custom routes
  const appRouter = express.Router()
  appRouter.use(AuthController.initialize())
  appRouter.use(AuthMiddleware)
  appRouter.use("/users", users)

  // Main src routes
  const indexRouter = express.Router()
  indexRouter.use("/app", appRouter)
  indexRouter.use("/auth", auth)

  // Versifying
  app.use("/v1", indexRouter)

  app.get("/", (req, res) => {
    res.send("ssdsd")
  })

  app.get("*", (req, res) => res.boom.notFound())

  errorsHandler(app)
}

module.exports = init
