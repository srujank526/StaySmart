const express = require('express')
const houseController = require('../controllers/houseController')
const authController = require('../controllers/authController')

const houseRouter = express.Router();

houseRouter.get('/',houseController.getAllHouses).get('/:id',houseController.getHouseById)
    .post('/',authController.protect,houseController.addHouse).delete('/:id',authController.protect,houseController.deleteHouse)

module.exports = houseRouter