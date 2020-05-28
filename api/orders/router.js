const express = require ('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const OrderController = require ('./controller.js')

const BASE_URL = "/order";
const BASE_URL_1 = "/orders";

router.post(`${BASE_URL}`, CheckAuth, OrderController.post)
.get(`${BASE_URL_1}`, CheckAuth, OrderController.get_all)
.get(`${BASE_URL}/:orderId`, CheckAuth, OrderController.get)
.patch(`${BASE_URL}/:orderId`, CheckAuth, OrderController.patch)
.delete(`${BASE_URL}/:orderId`, CheckAuth, OrderController.delete)

module.exports = router