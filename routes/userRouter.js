const express = require('express')
const userController = require('./../controllers/userController')
const UserRouter = express.Router()

UserRouter.get('/',userController.getAllUsers)
            .get('/:id',userController.getUserById)
            .post('/',userController.createUser)

module.exports = UserRouter