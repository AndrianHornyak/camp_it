const express = require('express');
const router = express.Router()
const userRoute = require('../api/users/userRouter')
const adminRoute = require('../api/admin/adminRouter')
const orderRoute = require('../api/orders/orderRouter')
const ownerRoute = require('../api/owners/ownerRouter')
const campRoute = require('../api/camps/campRouter')
const commentRoute = require('../api/comments/commentRouter')
const telegramRoute = require('../api/telegram/telegramRouter')

router.use(orderRoute)
.use(ownerRoute)
.use(campRoute)
.use(userRoute)
.use(adminRoute)
.use(commentRoute)
.use(telegramRoute)



module.exports = router