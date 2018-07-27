import express from "express"
import AuthController from "app/Controllers/AuthController"
import asyncHandler from "app/Router/utils/asyncHandler"

const authRouter = express.Router()

authRouter.post("/signin", asyncHandler(AuthController.signin))
authRouter.post("/signup", asyncHandler(AuthController.signup))

module.exports = authRouter
