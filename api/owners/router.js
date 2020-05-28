const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const OnwerController = require ('./controller.js')
const BASE_URL = "/owner";

router.post(`${BASE_URL}/signup`, OnwerController.signup)
.post(`${BASE_URL}/login`, OnwerController.login)
.get(`${BASE_URL}/:ownerId`, OnwerController.get)
.patch(`${BASE_URL}/:ownerId`,CheckAuth,OnwerController.patch)
.delete(`${BASE_URL}/:ownerId`,CheckAuth, OnwerController.delete)


module.exports = router