import express from "express"
import UsersController from "app/Controllers/UsersController"
import asyncHandler from "app/Router/utils/asyncHandler"

const usersRouter = express.Router()

usersRouter.get("/", asyncHandler(UsersController.index))
usersRouter.post("/", asyncHandler(UsersController.store))
usersRouter.get("/:id", asyncHandler(UsersController.show))
usersRouter.put("/:id", asyncHandler(UsersController.update))
usersRouter.delete("/:id", asyncHandler(UsersController.destroy))

module.exports = usersRouter
