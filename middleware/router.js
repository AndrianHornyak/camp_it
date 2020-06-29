const express = require('express');
const router = express.Router()


const userRoute = require('../api/users/router.js')
const adminRoute = require('../api/admin/router.js')
const orderRoute = require('../api/orders/router.js')
const ownerRoute = require('../api/owners/router.js')
const campRoute = require('../api/camps/router.js')
const commentRoute = require('../api/comments/router.js')
const telegramRoute = require('../api/telegram/router.js')
const categoryCampRoute = require('../api/camps/categoryCamp/router.js')

//Routes
router.use(orderRoute)
.use(ownerRoute)
.use(campRoute)
.use(userRoute)
.use(adminRoute)
.use(commentRoute)
.use(telegramRoute)
.use(categoryCampRoute)



module.exports = router