const express = require('express')
const router = express.Router()

const AdminController = require ('./adminController')
const BASE_URL = "/admin";

router.post(`${BASE_URL}/login`, AdminController.login)

module.exports = router

