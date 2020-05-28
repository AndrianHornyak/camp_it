const express = require('express')
const router = express.Router()

const TelegramController = require('./telegramController')

router.get('/telegram/camp/:campId/verefication/:key', TelegramController.verefication)

module.exports = router