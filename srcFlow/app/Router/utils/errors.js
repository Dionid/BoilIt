import Boom from "boom"
import IoC from "ioc"

const ErrorHandler = IoC.getErrorHandler()

const errorsHandler = (app) => {
  app.use((error, req, res, next) => {
    // ToDo: add ENV dependency
    ErrorHandler.handle(error)
    const { message } = error
    const bError = Boom.boomify(error, { statusCode: 502, message })
    res.status(bError.output.statusCode).send(bError.output.payload);
  })
}


export default errorsHandler
