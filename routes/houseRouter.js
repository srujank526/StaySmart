const express = require('express')
const houseController = require('../controllers/houseController')
const authController = require('../controllers/authController')

const houseRouter = express.Router();

houseRouter.get('/',authController.protect,houseController.getAllHouses).get('/:id',houseController.getHouseById)
    .post('/',houseController.addHouse).delete('/',houseController.deleteHouse)

module.exports = houseRouter