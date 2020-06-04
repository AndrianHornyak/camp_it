const express = require('express')
const router = express.Router()

const categoryCampController = require ('./controller.js')

const BASE_URL = "/category"

router.get(`${BASE_URL}`,categoryCampController.get_all)
.post(`${BASE_URL}`,categoryCampController.create)

module.exports = router