const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const UserController = require ('./userController')

const BASE_URL = "/user";

router.post(`${BASE_URL}/signup`, UserController.signup)
.post(`${BASE_URL}/login`, UserController.login)
.get(`${BASE_URL}/:userId`, UserController.get)
.patch(`${BASE_URL}/:userId`,CheckAuth,UserController.patch)
.delete(`${BASE_URL}/:userId`,CheckAuth, UserController.delete)

module.exports = router