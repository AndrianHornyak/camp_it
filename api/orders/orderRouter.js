const express = require ('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const OrderController = require ('./orderController')

router.post('/order', CheckAuth, OrderController.post)
.get('/orders', CheckAuth, OrderController.get_all)
.get('/order/:orderId', CheckAuth, OrderController.get)
.patch('/order/:orderId', CheckAuth, OrderController.patch)
.delete('/order/:orderId', CheckAuth, OrderController.delete)

module.exports = router