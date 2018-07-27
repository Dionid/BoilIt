// @flow

export type cExpress$Request<T = any> = {
  body: T
} & express$Request

export type cExpress$Response = express$Response & {
  boom: any,
}

export type cExpress$NextFunction = express$NextFunction
