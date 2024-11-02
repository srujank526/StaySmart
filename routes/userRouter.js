const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const UserRouter = express.Router()

UserRouter.post('/login', authController.login)
UserRouter.post('/signup', authController.signup)

UserRouter.get('/',authController.protect,authController.restrictTo(['admin']),userController.getAllUsers)
            .get('/:id',userController.getUserById)
            .post('/',userController.createUser)

module.exports = UserRouter