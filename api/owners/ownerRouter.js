const express = require('express')
const router = express.Router()
const CheckAuth = require('../../middleware/check-auth.js')

const OnwerController = require ('./ownerController')

router.post('/owner/signup', OnwerController.signup)
.post('/owner/login', OnwerController.login)
.get('/owner/:ownerId', OnwerController.get)
.patch('/owner/:ownerId',CheckAuth,OnwerController.patch)
.delete('/owner/:ownerId',CheckAuth, OnwerController.delete)


module.exports = router