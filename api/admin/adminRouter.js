const express = require('express')
const router = express.Router()

const AdminController = require ('./adminController')

router.post('/admin/login', AdminController.login)

module.exports = router

