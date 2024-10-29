const express = require('express')
const houseController = require('../controllers/houseController')

const houseRouter = express.Router();

houseRouter.get('/',houseController.getAllHouses).get('/:id',houseController.getHouseById)
    .post('/',houseController.addHouse).delete('/',houseController.deleteHouse)

module.exports = houseRouter