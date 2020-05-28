const express = require('express')
const router = express.Router()

const AdminController = require ('./controller.js')
const BASE_URL = "/admin";

router.post(`${BASE_URL}/login`, AdminController.login)

module.exports = router

