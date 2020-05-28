const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const UserController = require ('./userController')

router.post('/user/signup', UserController.signup)
.post('/user/login', UserController.login)
.get('/user/:userId', UserController.get)
.patch('/user/:userId', CheckAuth, UserController.patch)
.delete('/user/:userId', CheckAuth, UserController.delete)


module.exports = router